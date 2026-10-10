'use client';
import { useState, useEffect } from 'react';

export default function HotelDashboardPage() {
  const [hotelName, setHotelName] = useState('Partner Hotel');
  const [restaurantId, setRestaurantId] = useState('');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hotelStatus, setHotelStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedHotel = localStorage.getItem('shopmatries_hotel_name') || 'Partner Hotel';
    setHotelName(storedHotel);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    Promise.all([
      fetch(`${API_URL}/api/orders`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/foods`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/foods/restaurants`).then(res => res.json()).catch(() => [])
    ])
      .then(([orderData, foodData, restaurantData]) => {
        const cleanTarget = storedHotel.trim().toLowerCase();

        // 1. Filter orders for this hotel
        const allOrders = Array.isArray(orderData) ? orderData : (orderData.orders || orderData.data || orderData.result || []);
        const filteredOrders = allOrders.filter(o => {
          const rest = o.restaurant || o.hotelName || o.restaurantName || o.hotel || o.brand || '';
          return rest.trim().toLowerCase() === cleanTarget;
        });
        setOrders(filteredOrders);

        // 2. Extract restaurant and catalog items
        const restList = Array.isArray(restaurantData) ? restaurantData : (restaurantData.restaurants || restaurantData.data || restaurantData.result || []);
        const currentRest = restList.find(r => {
          const rName = r.hotelName || r.hotel || r.restaurant || r.restaurantName || r.name || r.title || '';
          return rName.trim().toLowerCase() === cleanTarget;
        });

        if (currentRest) {
          setRestaurantId(currentRest._id || currentRest.id);
          setHotelStatus(currentRest.isManuallyOpen !== undefined ? currentRest.isManuallyOpen : (currentRest.isOpen !== undefined ? currentRest.isOpen : true));
        }

        const allFoods = Array.isArray(foodData) ? foodData : (foodData.foods || foodData.items || foodData.data || foodData.result || []);
        const embeddedMenu = currentRest?.menu || currentRest?.items || currentRest?.foodItems || currentRest?.dishes || [];
        
        const matchedFoods = allFoods.filter(f => {
          const fRest = f.restaurant || f.hotelName || f.hotel || f.hotelname || f.brand || f.restaurantName || '';
          return fRest.trim().toLowerCase() === cleanTarget;
        });

        const combinedMenu = [...embeddedMenu, ...matchedFoods];
        const finalMenuList = combinedMenu.length > 0 ? combinedMenu : allFoods;

        const formattedMenu = finalMenuList.map((item, idx) => {
          // Explicitly checking englishName first, followed by all other variations
          const exactName = item.englishName || item.itemName || item.dishName || item.foodName || item.title || item.name || item.dish || item.strName || `Dish #${idx + 1}`;
          const exactPrice = item.price || item.cost || item.amount || item.rate || 150;
          const isAvail = item.isAvailable !== undefined ? item.isAvailable : (item.available !== undefined ? item.available : true);

          return {
            _id: item._id || item.id || `item-${idx}`,
            name: exactName,
            price: exactPrice,
            isAvailable: isAvail
          };
        });

        setMenuItems(formattedMenu);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard data:', err);
        setError('Unable to sync hotel data from backend.');
        setLoading(false);
      });
  }, []);

  const toggleHotelStatus = async () => {
    const newStatus = !hotelStatus;
    setHotelStatus(newStatus);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
      if (restaurantId) {
        await fetch(`${API_URL}/api/restaurants/${restaurantId}/hours`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isManuallyOpen: newStatus, autoMode: false })
        });
      }
    } catch (err) {
      console.error('Failed to update hotel open status:', err);
    }
  };

  const toggleItemAvailability = async (itemId) => {
    setMenuItems(prev => prev.map(item => {
      if (item._id === itemId) {
        const updatedAvailability = !item.isAvailable;
        
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
        fetch(`${API_URL}/api/foods/${itemId}/availability`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isAvailable: updatedAvailability })
        }).catch(() => {});

        return { ...item, isAvailable: updatedAvailability };
      }
      return item;
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xs font-bold text-slate-500 animate-pulse">Loading {hotelName} Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-4 pb-10">
      
      {/* Hotel Status Banner */}
      <div className="bg-white border border-orange-100 p-4 rounded-3xl shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider">Hotel Control Hub</span>
            <h2 className="text-base font-black text-slate-900">{hotelName}</h2>
          </div>
          <button
            onClick={toggleHotelStatus}
            className={`px-3 py-1.5 rounded-xl text-xs font-black shadow-sm transition cursor-pointer ${hotelStatus ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
          >
            {hotelStatus ? '🟢 Hotel Open' : '🔴 Hotel Closed'}
          </button>
        </div>
      </div>

      {error && <div className="bg-orange-50 text-orange-700 text-xs font-bold p-3 rounded-xl border border-orange-200 text-center">{error}</div>}

      {/* Incoming Orders Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-black uppercase text-slate-700 px-1">📦 Incoming Orders ({orders.length})</h3>
        {orders.length === 0 ? (
          <div className="bg-white border border-orange-100 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
            No active customer orders for {hotelName} right now.
          </div>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="bg-white border border-orange-100 rounded-2xl p-3.5 space-y-2 shadow-xs">
              <div className="flex justify-between items-center text-xs font-black">
                <span className="text-slate-900">Order #{order._id ? order._id.slice(-6) : (idx + 1)}</span>
                <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">₹{order.totalAmount || order.total || 0}</span>
              </div>
              <div className="text-[11px] text-slate-600 space-y-0.5">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.quantity || 1}x {item.englishName || item.itemName || item.dishName || item.foodName || item.title || item.name || item.dish || 'Food Item'}</span>
                    <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Menu Item Availability Controls */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-black uppercase text-slate-700 px-1">🍱 Menu Item Availability Controls</h3>
        {menuItems.length === 0 ? (
          <div className="bg-white border border-orange-100 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
            No food items found in catalog for {hotelName}.
          </div>
        ) : (
          menuItems.map((item) => (
            <div key={item._id} className="bg-white border border-orange-100 rounded-2xl p-3 flex justify-between items-center shadow-xs">
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-slate-900">{item.name}</h4>
                <p className="text-[10px] text-slate-500">₹{item.price}</p>
              </div>
              <button
                onClick={() => toggleItemAvailability(item._id)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition cursor-pointer ${item.isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
              >
                {item.isAvailable ? '🟢 Serving' : '🔴 Closed'}
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}