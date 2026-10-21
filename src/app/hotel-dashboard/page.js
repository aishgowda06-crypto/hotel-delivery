'use client';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

export default function HotelDashboardPage() {
  const [hotelName, setHotelName] = useState('Partner Hotel');
  const [restaurantId, setRestaurantId] = useState('');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [hotelStatus, setHotelStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Navigation & Sound settings state
  const [activeTab, setActiveTab] = useState('orders');
  const [notificationSound, setNotificationSound] = useState('bell');
  const [restaurantProfile, setRestaurantProfile] = useState({});
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  // Incoming order popup modal state
  const [incomingPopupOrder, setIncomingPopupOrder] = useState(null);

  // Audio looping reference so sound repeats continuously until an order is accepted or rejected
  const audioLoopRef = useRef(null);

  // Helper to strictly calculate food-only total price using original menu prices from catalog with fallback name matching
  const calculateFoodOnlyTotal = (order, currentMenu) => {
    if (order.items && Array.isArray(order.items) && order.items.length > 0) {
      return order.items.reduce((sum, item) => {
        const foodId = String(item.foodItem || item.id || '');
        const itemName = (item.name || item.englishName || '').trim().toLowerCase();
        
        const catalogItem = currentMenu.find(m => 
          String(m._id) === foodId || (itemName && m.name.trim().toLowerCase() === itemName)
        );
        
        const itemPrice = catalogItem ? catalogItem.price : (item.basePrice || item.price || 0);
        const itemQty = item.quantity || item.qty || 1;
        return sum + (itemPrice * itemQty);
      }, 0);
    }
    return order.foodTotal || order.subtotal || order.totalAmount || order.total || order.totalPrice || 0;
  };

  // Play continuous audio alert loop using Web Audio API with user-interaction unlock handler
  const startAudioLoop = (soundType) => {
    if (audioLoopRef.current) return; // Already playing

    try {
      const playTone = () => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();
        
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = soundType === 'siren' ? 'sawtooth' : soundType === 'chime' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(soundType === 'siren' ? 880 : 587.33, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
      };

      playTone();
      audioLoopRef.current = setInterval(playTone, 2000);
    } catch (e) {
      console.log('Audio playback prevented or unsupported', e);
    }
  };

  const stopAudioLoop = () => {
    if (audioLoopRef.current) {
      clearInterval(audioLoopRef.current);
      audioLoopRef.current = null;
    }
  };

  const playSingleAlert = (soundType) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = soundType === 'siren' ? 'sawtooth' : soundType === 'chime' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(soundType === 'siren' ? 880 : 587.33, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio playback prevented or unsupported', e);
    }
  };

  const fetchDashboardData = (targetHotel, isInitial = false) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
    const cleanTarget = targetHotel.trim().toLowerCase();

    Promise.all([
      fetch(`${API_URL}/api/orders`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/foods`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/foods/restaurants`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/brands`).then(res => res.json()).catch(() => [])
    ])
      .then(([orderData, foodData, restaurantData, brandData]) => {
        // 1. Extract restaurant and brand catalog items first to build formatted menu
        const restList = Array.isArray(restaurantData) ? restaurantData : (restaurantData.restaurants || restaurantData.data || restaurantData.result || []);
        const bList = Array.isArray(brandData) ? brandData : (brandData.brands || brandData.data || brandData.result || []);

        const currentRest = restList.find(r => {
          const rName = r.hotelName || r.hotel || r.restaurant || r.restaurantName || r.name || r.title || '';
          return rName.trim().toLowerCase() === cleanTarget;
        });

        const currentBrand = bList.find(b => {
          const bName = b.name || b.brandName || b.title || '';
          return bName.trim().toLowerCase() === cleanTarget;
        });

        let targetRestId = '';
        if (currentBrand) {
          targetRestId = currentBrand._id || currentBrand.id;
          setRestaurantId(targetRestId);
          const isOpenState = currentBrand.isManuallyOpen !== undefined ? currentBrand.isManuallyOpen : (currentBrand.isOpen !== undefined ? currentBrand.isOpen : true);
          setHotelStatus(isOpenState);
          setRestaurantProfile({ ...currentBrand, isBrandAccount: true });
        } else if (currentRest) {
          targetRestId = currentRest._id || currentRest.id;
          setRestaurantId(targetRestId);
          const isOpenState = currentRest.isManuallyOpen !== undefined ? currentRest.isManuallyOpen : (currentRest.isOpen !== undefined ? currentRest.isOpen : true);
          setHotelStatus(isOpenState);
          setRestaurantProfile({ ...currentRest, isBrandAccount: false });
        }

        const allFoods = Array.isArray(foodData) ? foodData : (foodData.foods || foodData.items || foodData.data || foodData.result || []);
        const embeddedMenu = currentRest?.menu || currentBrand?.menu || currentRest?.items || currentBrand?.items || [];
        
        // STRICT FILTER: Only match food items belonging explicitly to this hotel/brand name or restaurant ID
        const matchedFoods = allFoods.filter(f => {
          const fRest = f.restaurant || f.hotelName || f.hotel || f.hotelname || f.brand || f.restaurantName || '';
          const fHotelId = f.hotelId || f.restaurantId || '';
          const matchesName = fRest.trim().toLowerCase() === cleanTarget;
          const matchesId = targetRestId && (fHotelId === targetRestId);
          return matchesName || matchesId;
        });

        const combinedMenu = [...embeddedMenu, ...matchedFoods];
        
        // Deduplicate menu items by ID or name
        const uniqueMenuMap = new Map();
        combinedMenu.forEach(item => {
          const validId = item._id || item.id || item.englishName || item.name;
          if (validId && !uniqueMenuMap.has(validId)) {
            uniqueMenuMap.set(validId, item);
          }
        });

        const finalMenuList = Array.from(uniqueMenuMap.values());

        const formattedMenu = finalMenuList.map((item, idx) => {
          const exactName = item.englishName || item.itemName || item.dishName || item.foodName || item.title || item.name || item.dish || item.strName || `Dish #${idx + 1}`;
          const exactPrice = item.basePrice !== undefined ? Number(item.basePrice) : Number(item.price || item.cost || item.amount || item.rate || 150);
          const isAvail = item.isAvailable !== false && (item.available !== false);

          const validId = item._id || item.id;
          if (!validId) return null;

          return {
            _id: validId,
            name: exactName,
            price: exactPrice,
            isAvailable: isAvail
          };
        }).filter(Boolean);

        setMenuItems(formattedMenu);

        // 2. Filter orders for this specific hotel dashboard
        const allOrders = Array.isArray(orderData) ? orderData : (orderData.orders || orderData.data || orderData.result || []);
        const filteredOrders = allOrders.filter(o => {
          const rest = o.restaurant || o.hotelName || o.restaurantName || o.hotel || o.brand || '';
          return rest.trim().toLowerCase() === cleanTarget;
        });

        // Check if there are any pending/new incoming orders to trigger alarm loop & popup modal
        const pendingOrders = filteredOrders.filter(o => !o.status || o.status === 'Pending' || o.status === 'Hub');
        if (pendingOrders.length > 0) {
          const savedSound = localStorage.getItem('shopmatries_notification_sound') || 'bell';
          startAudioLoop(savedSound);
          if (!incomingPopupOrder) {
            setIncomingPopupOrder(pendingOrders[0]);
          }
        } else {
          stopAudioLoop();
          setIncomingPopupOrder(null);
        }

        setOrders(filteredOrders);
        if (isInitial) setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard data:', err);
        if (isInitial) {
          setError('Unable to sync hotel data from backend.');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    // Ultra-persistent session recovery ensuring correct restaurant/brand name retrieval
    let storedHotel = localStorage.getItem('shopmatries_hotel_name') || sessionStorage.getItem('shopmatries_hotel_name');
    if (!storedHotel || storedHotel === 'undefined' || storedHotel === 'null') {
      storedHotel = 'Partner Hotel';
    }
    localStorage.setItem('shopmatries_hotel_name', storedHotel);
    sessionStorage.setItem('shopmatries_hotel_name', storedHotel);

    const storedSound = localStorage.getItem('shopmatries_notification_sound') || 'bell';
    setHotelName(storedHotel);
    setNotificationSound(storedSound);

    // Initial fetch
    fetchDashboardData(storedHotel, true);

    // Register Firebase Push Notifications specifically scoped for Hotel Dashboard Admin
    async function registerFCMToken() {
      try {
        if (!('Notification' in window)) return;
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const firebaseConfig = {
            apiKey: "AIzaSyDxBOa3ciYVdVmfYwyEIF2Rlg3b5QRcNkw",
            authDomain: "buybrigg-notifications.firebaseapp.com",
            projectId: "buybrigg-notifications",
            storageBucket: "buybrigg-notifications.firebasestorage.app",
            messagingSenderId: "790613462958",
            appId: "1:790613462958:web:0f8f70123c41935cbb823f",
            measurementId: "G-Y1HMZ2JV4C"
          };

          const app = initializeApp(firebaseConfig);
          const messaging = getMessaging(app);

          let swRegistration = null;
          if ('serviceWorker' in navigator) {
            try {
              swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
              swRegistration = await navigator.serviceWorker.ready;
            } catch (swErr) {
              console.warn('Service worker registration error:', swErr);
            }
          }

          const token = await getToken(messaging, { 
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "",
            serviceWorkerRegistration: swRegistration 
          });

          if (token) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
            await fetch(`${API_URL}/api/save-admin-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token, hotelName: storedHotel, role: 'hotel' })
            });
          }
        }
      } catch (err) {
        console.log('FCM Token registration skipped or failed:', err);
      }
    }
    registerFCMToken();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    // Socket.io real-time listener for hotel orders with accurate item summaries
    const socket = io(API_URL);
    socket.on('new-order', (newOrder) => {
      const rest = newOrder.restaurant || newOrder.hotelName || newOrder.restaurantName || newOrder.hotel || newOrder.brand || '';
      if (rest.trim().toLowerCase() === storedHotel.trim().toLowerCase()) {
        setOrders(prev => [newOrder, ...prev]);
        setIncomingPopupOrder(newOrder); 
        const savedSound = localStorage.getItem('shopmatries_notification_sound') || 'bell';
        startAudioLoop(savedSound);

        // Native Web Notification showing exact Order ID, food item names, and quantities
        if ('Notification' in window && Notification.permission === 'granted') {
          const orderIdShort = (newOrder._id || newOrder.id || 'NEW').slice(-6);
          const itemSummary = newOrder.items?.map(i => `${i.quantity || i.qty || 1}x ${i.englishName || i.itemName || i.dishName || i.name || 'Food Item'}`).join(', ') || 'New Food Item';
          const foodTotal = calculateFoodOnlyTotal(newOrder, menuItems);
          
          newNotificationHandler(`🔔 New Order #${orderIdShort} (${storedHotel})`, {
            body: `Items: ${itemSummary}\nFood Total: ₹${foodTotal}`,
            icon: '/icon.png'
          });
        }
      }
    });

    function newNotificationHandler(title, options) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, options);
        });
      } else {
        new Notification(title, options);
      }
    }

    const pollInterval = setInterval(() => {
      fetchDashboardData(storedHotel, false);
    }, 5000);

    return () => {
      socket.disconnect();
      clearInterval(pollInterval);
      stopAudioLoop();
    };
  }, []);

  const toggleHotelStatus = async () => {
    const newStatus = !hotelStatus;
    setHotelStatus(newStatus);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
      
      const isBrandAccount = restaurantProfile.isBrandAccount === true || 
                             localStorage.getItem('shopmatries_is_brand') === 'true' ||
                             restaurantProfile.type === 'brand';

      if (restaurantId) {
        const endpoint = isBrandAccount 
          ? `${API_URL}/api/brands/${restaurantId}/hours` 
          : `${API_URL}/api/restaurants/${restaurantId}/hours`;

        await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isManuallyOpen: newStatus, isOpen: newStatus, autoMode: false })
        });
      }
    } catch (err) {
      console.error('Failed to update hotel open status:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
      await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      stopAudioLoop();
      setIncomingPopupOrder(null); 

      setOrders(prev => prev.map(o => (o._id === orderId || o.id === orderId) ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Failed to update order status:', err);
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

  const handleSoundChange = (e) => {
    const soundChoice = e.target.value;
    setNotificationSound(soundChoice);
    localStorage.setItem('shopmatries_notification_sound', soundChoice);
    playSingleAlert(soundChoice);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xs font-bold text-slate-500 animate-pulse">Loading {hotelName} Dashboard...</p>
      </div>
    );
  }

  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(menuSearchQuery.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + calculateFoodOnlyTotal(order, menuItems);
  }, 0);

  return (
    <div 
      onClick={() => {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          const tempCtx = new AudioContextClass();
          if (tempCtx.state === 'suspended') tempCtx.resume();
        }
      }}
      className="max-w-md mx-auto space-y-4 pb-10 relative"
    >
      
      {/* INCOMING ORDER POPUP ALERT MODAL WITH ORIGINAL MENU PRICES */}
      {incomingPopupOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white border-2 border-orange-500 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black animate-bounce shadow-inner">
              🔔
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                New Order Received!
              </span>
              <h3 className="text-base font-black text-slate-950 mt-1">
                Order #{(incomingPopupOrder._id || incomingPopupOrder.id || '').slice(-6)}
              </h3>
              <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                Customer: {incomingPopupOrder.customerName || 'Guest'} ({incomingPopupOrder.phone || 'No Phone'})
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Placed At: {incomingPopupOrder.createdAt ? new Date(incomingPopupOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Just now'}
              </p>
            </div>

            <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-3 text-left space-y-1.5 max-h-40 overflow-y-auto">
              <p className="text-[10px] font-black uppercase text-orange-800 border-b border-orange-200 pb-1">Ordered Items & Original Menu Prices</p>
              {incomingPopupOrder.items?.map((item, idx) => {
                const foodId = String(item.foodItem || item.id || '');
                const itemName = (item.name || item.englishName || '').trim().toLowerCase();
                const catalogItem = menuItems.find(m => 
                  String(m._id) === foodId || (itemName && m.name.trim().toLowerCase() === itemName)
                );
                const itemPrice = catalogItem ? catalogItem.price : (item.basePrice || item.price || 0);
                const itemQty = item.quantity || item.qty || 1;
                return (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-800 font-bold">
                    <span>{itemQty}x {item.englishName || item.itemName || item.dishName || item.name || 'Food Item'}</span>
                    <span className="font-mono text-orange-600">₹{itemPrice} each (Total: ₹{itemPrice * itemQty})</span>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-orange-200 flex justify-between items-center text-xs font-black">
                <span className="text-slate-900">Food Total:</span>
                <span className="text-orange-600 font-mono">₹{calculateFoodOnlyTotal(incomingPopupOrder, menuItems)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => updateOrderStatus(incomingPopupOrder._id || incomingPopupOrder.id, 'Preparing')}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition cursor-pointer active:scale-95"
              >
                ✅ Accept & Prepare
              </button>
              <button
                onClick={() => updateOrderStatus(incomingPopupOrder._id || incomingPopupOrder.id, 'Rejected')}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition cursor-pointer active:scale-95"
              >
                ❌ Reject Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Status Banner */}
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

      {/* Tab Navigation Bar */}
      <div className="flex bg-orange-50/80 p-1 rounded-2xl border border-orange-100">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'orders' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          📦 Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('control')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'control' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          ⚙️ Control
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'menu' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          🍱 Menu ({menuItems.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'profile' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          👤 Profile
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black uppercase text-slate-700">📦 Live Incoming Orders ({orders.length})</h3>
            {orders.length > 0 && (
              <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 font-mono">
                Food Revenue: ₹{totalRevenue}
              </span>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="bg-white border border-orange-100 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
              No active customer orders for {hotelName} right now.
            </div>
          ) : (
            orders.map((order, idx) => {
              const currentProgress = order.progress !== undefined ? order.progress : 0;
              const currentStatusText = order.status || (currentProgress === 100 ? 'Delivered' : currentProgress === 70 ? 'Near Area' : currentProgress === 35 ? 'Picked' : 'Hub');
              const assignedRider = order.acceptedBy || order.riderName || order.deliveryPartner || null;
              const orderId = order._id || order.id || `order-${idx}`;
              const orderTimeStr = order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'Just now';
              const foodOnlyTotal = calculateFoodOnlyTotal(order, menuItems);

              return (
                <div key={orderId} className="bg-white border border-orange-100 rounded-2xl p-3.5 space-y-3 shadow-xs">
                  <div className="flex justify-between items-center text-xs font-black">
                    <div>
                      <span className="text-slate-900">Order #{orderId.slice(-6)}</span>
                      <p className="text-[10px] text-slate-400 font-mono font-normal">Placed at: {orderTimeStr}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase block font-bold">Food Total</span>
                      <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md font-mono text-xs">₹{foodOnlyTotal}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => updateOrderStatus(orderId, 'Preparing')}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 rounded-xl text-[10px] font-black shadow-sm transition cursor-pointer"
                    >
                      ✅ Accept & Prepare
                    </button>
                    <button
                      onClick={() => updateOrderStatus(orderId, 'Rejected')}
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-1.5 rounded-xl text-[10px] font-black shadow-sm transition cursor-pointer"
                    >
                      ❌ Reject
                    </button>
                  </div>

                  <div className="bg-orange-50/70 border border-orange-200 p-2.5 rounded-xl space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-black">
                      <span className="text-slate-700 uppercase">Live Delivery: <span className="text-orange-600">{currentStatusText}</span></span>
                      <span className="text-orange-600 font-mono">{currentProgress}%</span>
                    </div>
                    <div className="w-full bg-orange-200/50 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-500" 
                        style={{ width: `${currentProgress}%` }}
                      ></div>
                    </div>
                    {assignedRider && (
                      <p className="text-[10px] font-bold text-emerald-700 pt-0.5">🛵 Rider Assigned: {assignedRider}</p>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-orange-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Ordered Items & Original Menu Prices:</p>
                    {order.items?.map((item, i) => {
                      const foodId = String(item.foodItem || item.id || '');
                      const itemName = (item.name || item.englishName || '').trim().toLowerCase();
                      const catalogItem = menuItems.find(m => 
                        String(m._id) === foodId || (itemName && m.name.trim().toLowerCase() === itemName)
                      );
                      const itemPrice = catalogItem ? catalogItem.price : (item.basePrice || item.price || 0);
                      const itemQty = item.quantity || item.qty || 1;
                      return (
                        <div key={i} className="flex justify-between font-bold">
                          <span>{itemQty}x {item.englishName || item.itemName || item.dishName || item.name || 'Food Item'}</span>
                          <span className="text-slate-900 font-mono">₹{itemPrice} each (₹{itemPrice * itemQty})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: HOTEL CONTROL */}
      {activeTab === 'control' && (
        <div className="space-y-4">
          <div className="bg-white border border-orange-100 p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-700">⚙️ Store Operational Control</h3>
            <div className="flex justify-between items-center pt-2 border-t border-orange-50">
              <div>
                <p className="text-xs font-bold text-slate-800">Instant Manual Override</p>
                <p className="text-[10px] text-slate-500">Force open or close store for incoming orders</p>
              </div>
              <button
                onClick={toggleHotelStatus}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${hotelStatus ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
              >
                {hotelStatus ? '🟢 Open' : '🔴 Closed'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MENU ITEMS */}
      {activeTab === 'menu' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black uppercase text-slate-700">🍱 Menu Item Availability Controls</h3>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search food items by name..."
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              className="w-full bg-white border border-orange-200 text-xs font-bold text-slate-800 p-3 rounded-2xl shadow-xs focus:outline-none focus:border-orange-500"
            />
            {menuSearchQuery && (
              <button
                onClick={() => setMenuSearchQuery('')}
                className="absolute right-3 top-3 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {filteredMenuItems.length === 0 ? (
            <div className="bg-white border border-orange-100 rounded-2xl p-6 text-center text-slate-400 text-xs font-medium">
              {menuItems.length === 0 ? `No food items found in catalog for ${hotelName}.` : 'No matching food items found.'}
            </div>
          ) : (
            filteredMenuItems.map((item) => (
              <div key={item._id} className="bg-white border border-orange-100 rounded-2xl p-3 flex justify-between items-center shadow-xs">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-900">{item.name}</h4>
                  <p className="text-[10px] text-slate-500">Menu Price: ₹{item.price}</p>
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
      )}

      {/* TAB 4: PROFILE & SOUND SETTINGS */}
      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="bg-white border border-orange-100 p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-700">👤 Hotel Partner Profile</h3>
            <div className="space-y-2 text-xs text-slate-700 pt-1">
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">Hotel Name:</span>
                <span className="font-black text-slate-900">{hotelName}</span>
              </div>
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">Restaurant ID:</span>
                <span className="font-mono text-[10px] text-slate-800">{restaurantId || 'Synced'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">City / Location:</span>
                <span className="font-black text-slate-900">{restaurantProfile.city || 'Shivamogga'}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-slate-500">Account Status:</span>
                <span className="text-emerald-600 font-black">Active Partner</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-orange-100 p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-700">🔔 Incoming Order Alert Sound Settings</h3>
            <p className="text-[10px] text-slate-500">Choose the notification chime played when a customer places a new order.</p>
            <div className="flex items-center space-x-3 pt-1">
              <select
                value={notificationSound}
                onChange={handleSoundChange}
                className="flex-1 bg-orange-50 border border-orange-200 text-xs font-bold text-slate-800 p-2.5 rounded-xl focus:outline-none"
              >
                <option value="bell">🔔 Classic Bell</option>
                <option value="chime">🎶 Digital Chime</option>
                <option value="siren">🚨 Loud Alert</option>
              </select>
              <button
                onClick={() => playSingleAlert(notificationSound)}
                className="bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-sm cursor-pointer hover:bg-orange-700"
              >
                Test Sound
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}