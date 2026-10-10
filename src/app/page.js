'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UniversalPartnerHub() {
  const router = useRouter();
  const [partnerType, setPartnerType] = useState('hotel'); // 'hotel' or 'delivery'
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Sign In, false = Register
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Hotel & Brand specific states
  const [hotelSelectionType, setHotelSelectionType] = useState('restaurant'); // 'restaurant' or 'brand'
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  // Delivery specific states
  const [deliveryName, setDeliveryName] = useState('');

  // Backend Data Lists
  const [backendRestaurants, setBackendRestaurants] = useState([]);
  const [backendBrands, setBackendBrands] = useState([]);
  const [loadingBackend, setLoadingBackend] = useState(true);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch live restaurants from /api/foods/restaurants and brands from /api/brands
  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    Promise.all([
      fetch(`${API_URL}/api/foods/restaurants`).then(res => res.json()).catch(() => []),
      fetch(`${API_URL}/api/brands`).then(res => res.json()).catch(() => [])
    ])
      .then(([restaurantData, brandData]) => {
        // Parse Hotels / Restaurants
        const rList = Array.isArray(restaurantData) ? restaurantData : (restaurantData.restaurants || restaurantData.data || []);
        const rNames = rList.map((h) => typeof h === 'string' ? h : (h.hotelName || h.name || h.brand)).filter(Boolean);
        setBackendRestaurants(rNames);
        if (rNames.length > 0) setSelectedHotel(rNames[0]);

        // Parse Brands
        const bList = Array.isArray(brandData) ? brandData : (brandData.brands || brandData.data || []);
        const bNames = bList.map((b) => typeof b === 'string' ? b : (b.name || b.brand || b.title)).filter(Boolean);
        setBackendBrands(bNames);
        if (bNames.length > 0) setSelectedBrand(bNames[0]);

        setLoadingBackend(false);
      })
      .catch(() => setLoadingBackend(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (phone.length !== 10 || isNaN(Number(phone))) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
    
    // Target the newly separated hotel and delivery route endpoints
    const rolePrefix = partnerType === 'hotel' ? 'hotel' : 'delivery';
    const actionPath = isLoginMode ? 'login' : 'register';
    const endpoint = `${API_URL}/api/auth/${rolePrefix}/${actionPath}`;

    let payload = { phone, password };

    if (partnerType === 'hotel') {
      const activeHotel = hotelSelectionType === 'restaurant' ? selectedHotel : selectedBrand;
      if (!activeHotel) {
        setError('Please select a hotel or brand from the list.');
        setLoading(false);
        return;
      }
      payload = isLoginMode 
        ? { phone, password } 
        : { 
            phone, 
            password, 
            hotelName: hotelSelectionType === 'restaurant' ? selectedHotel : 'Partner Hotel', 
            restaurant: hotelSelectionType === 'restaurant' ? selectedHotel : 'Partner Hotel',
            brand: hotelSelectionType === 'brand' ? selectedBrand : 'General'
          };
    } else {
      if (!isLoginMode && !deliveryName.trim()) {
        setError('Please enter your full name.');
        setLoading(false);
        return;
      }
      payload = isLoginMode 
        ? { phone, password } 
        : { phone, password, name: deliveryName.trim() || 'Delivery Rider' };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && (data.success || data.token)) {
        localStorage.setItem('shopmatries_token', data.token || 'partner_session');
        localStorage.setItem('shopmatries_phone', phone);

        if (partnerType === 'hotel') {
          localStorage.setItem('shopmatries_is_hotel_owner', 'true');
          const finalHotelName = data.hotelName || data.restaurant || selectedHotel || selectedBrand || 'Partner Hotel';
          localStorage.setItem('shopmatries_hotel_name', finalHotelName);
          router.push('/hotel-dashboard');
        } else {
          localStorage.setItem('shopmatries_is_delivery_partner', 'true');
          if (data.name || deliveryName) {
            localStorage.setItem('shopmatries_username', data.name || deliveryName);
          }
          router.push('/orders');
        }
      } else {
        setError(data.error || data.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch {
      setError('Unable to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-4 space-y-4">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-2xl">⚡</span>
        <h1 className="text-lg font-black text-slate-950">Shop Matries Partner Hub</h1>
        <p className="text-[11px] text-slate-500">Universal portal for hotel owners & delivery riders</p>
      </div>

      {/* Partner Role Switcher */}
      <div className="grid grid-cols-2 gap-1.5 bg-orange-100/50 p-1 rounded-2xl border border-orange-200">
        <button
          type="button"
          onClick={() => { setPartnerType('hotel'); setError(''); }}
          className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${partnerType === 'hotel' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          🏨 Hotel Partner
        </button>
        <button
          type="button"
          onClick={() => { setPartnerType('delivery'); setError(''); }}
          className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${partnerType === 'delivery' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
        >
          🛵 Delivery Partner
        </button>
      </div>

      {/* Auth Mode Switcher (Sign In vs Register) */}
      <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => { setIsLoginMode(true); setError(''); }}
          className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${isLoginMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
        >
          🔑 Sign In
        </button>
        <button
          type="button"
          onClick={() => { setIsLoginMode(false); setError(''); }}
          className={`py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${!isLoginMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
        >
          🚀 Register
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-orange-100 rounded-[26px] p-4 shadow-sm space-y-3">
        
        {/* HOTEL PARTNER: Choose Hotel or Brand Dropdown */}
        {partnerType === 'hotel' && (
          <>
            <div className="grid grid-cols-2 gap-1 bg-orange-50 p-1 rounded-xl border border-orange-100">
              <button
                type="button"
                onClick={() => setHotelSelectionType('restaurant')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition ${hotelSelectionType === 'restaurant' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`}
              >
                🏨 Hotels
              </button>
              <button
                type="button"
                onClick={() => setHotelSelectionType('brand')}
                className={`py-1.5 text-[10px] font-bold rounded-lg transition ${hotelSelectionType === 'brand' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`}
              >
                🏷️ Brands
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-600 uppercase">
                {hotelSelectionType === 'restaurant' ? 'Select Hotel / Restaurant' : 'Select Brand'}
              </label>
              <select
                value={hotelSelectionType === 'restaurant' ? selectedHotel : selectedBrand}
                onChange={(e) => {
                  if (hotelSelectionType === 'restaurant') setSelectedHotel(e.target.value);
                  else setSelectedBrand(e.target.value);
                }}
                className="w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500"
                required
              >
                {loadingBackend ? (
                  <option value="">Loading from backend...</option>
                ) : hotelSelectionType === 'restaurant' ? (
                  backendRestaurants.length === 0 ? (
                    <option value="">No hotels found</option>
                  ) : (
                    backendRestaurants.map((r, i) => <option key={i} value={r}>🏨 {r}</option>)
                  )
                ) : (
                  backendBrands.length === 0 ? (
                    <option value="">No brands found</option>
                  ) : (
                    backendBrands.map((b, i) => <option key={i} value={b}>🏷️ {b}</option>)
                  )
                )}
              </select>
            </div>
          </>
        )}

        {/* DELIVERY PARTNER: Full Name Field on Register */}
        {partnerType === 'delivery' && !isLoginMode && (
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-600 uppercase">Your Full Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Kumar"
              value={deliveryName}
              onChange={(e) => setDeliveryName(e.target.value)}
              className="w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500"
              required
            />
          </div>
        )}

        {/* COMMON INPUTS: Phone & Password */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-600 uppercase">10-Digit Mobile Number</label>
          <input
            type="tel"
            maxLength={10}
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-mono font-bold focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-600 uppercase">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-semibold focus:outline-none focus:border-orange-500"
            required
          />
        </div>

        {error && <div className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-2 rounded-xl text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black py-3 rounded-xl shadow-lg cursor-pointer transition mt-2"
        >
          {loading ? 'Processing...' : (isLoginMode ? `Sign In as ${partnerType === 'hotel' ? 'Hotel Partner' : 'Delivery Rider'} ⚡` : `Register ${partnerType === 'hotel' ? 'Hotel Account' : 'Delivery Account'} 🚀`)}
        </button>
      </form>

    </div>
  );
}