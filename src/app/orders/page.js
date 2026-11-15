'use client';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export default function DeliveryLiveOrders() {
  const [isDeliveryLoggedIn, setIsDeliveryLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [orders, setOrders] = useState([]);
  
  const [activeTab, setActiveTab] = useState('live');
  const [deliveryPartnerName, setDeliveryPartnerName] = useState('Delivery Partner');
  const [deliveryPartnerPhone, setDeliveryPartnerPhone] = useState('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);

  const invoiceRef = useRef(null);

  useEffect(() => {
    const deliveryAuth = localStorage.getItem('shopmatries_is_delivery_partner');
    const token = localStorage.getItem('shopmatries_token');
    const savedName = localStorage.getItem('shopmatries_username') || localStorage.getItem('shopmatries_phone') || 'Delivery Partner';
    const savedPhone = localStorage.getItem('shopmatries_phone') || '9876543210';
    
    setDeliveryPartnerName(savedName);
    setDeliveryPartnerPhone(savedPhone);

    if (deliveryAuth === 'true' || token) {
      setIsDeliveryLoggedIn(true);
    } else {
      setIsDeliveryLoggedIn(false);
    }
    setIsCheckingAuth(false);

    // Register Firebase Push Notifications for Delivery Partner Device
    async function registerFCMToken() {
      try {
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
              console.log('✅ Service Worker active with scope:', swRegistration.scope);
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
              body: JSON.stringify({ token, role: 'delivery' })
            });
            console.log('✅ Delivery Partner FCM Token Registered Successfully:', token);
          }

          // Handle active foreground push notifications
          onMessage(messaging, (payload) => {
            console.log('Foreground message received in active delivery tab:', payload);
            if ('Notification' in window && Notification.permission === 'granted') {
              const notificationTitle = payload.notification?.title || '⚡ New Order Dispatch';
              const notificationOptions = {
                body: payload.notification?.body || 'You have a new delivery order!',
                icon: '/icon.png',
                tag: 'delivery-dispatch'
              };

              if (swRegistration && swRegistration.showNotification) {
                swRegistration.showNotification(notificationTitle, notificationOptions);
              } else {
                new Notification(notificationTitle, notificationOptions);
              }
            }
          });
        }
      } catch (err) {
        console.log('FCM Token registration skipped or failed:', err);
      }
    }
    registerFCMToken();
  }, []);

  const fetchOrders = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    fetch(`${API_URL}/api/orders`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch orders from backend:', err);
        setOrders([]);
      });
  };

  useEffect(() => {
    if (!isDeliveryLoggedIn) return;

    fetchOrders();

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
      secure: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000
    });

    socket.on('connect', () => {
      console.log('⚡ Delivery Live Orders socket connected:', socket.id);
      fetchOrders();
    });

    socket.on('orderStatusUpdated', () => {
      fetchOrders();
    });

    socket.on('newOrder', (newOrderData) => {
      // Instant UI update optimization: Append or refetch immediately
      if (newOrderData && (newOrderData._id || newOrderData.id)) {
        setOrders(prev => {
          const exists = prev.some(o => (o._id || o.id) === (newOrderData._id || newOrderData.id));
          if (exists) {
            return prev.map(o => (o._id || o.id) === (newOrderData._id || newOrderData.id) ? newOrderData : o);
          }
          return [newOrderData, ...prev];
        });
      }
      fetchOrders();
    });

    socket.on('cateringOrderReceived', () => {
      fetchOrders();
    });

    return () => {
      socket.disconnect();
    };
  }, [isDeliveryLoggedIn]);

  const getAcceptedPartner = (ord) => {
    return ord.acceptedBy || ord.riderName || ord.deliveryPartner || ord.assignedTo || ord.rider || null;
  };

  const handleAcceptByPartner = (orderId, currentAcceptedBy) => {
    const deliveryPartnerName = localStorage.getItem('shopmatries_username') || localStorage.getItem('shopmatries_phone') || 'Delivery Partner';
    
    if (currentAcceptedBy && currentAcceptedBy !== deliveryPartnerName) {
      alert(`⚠️ This order has already been accepted by another delivery partner (${currentAcceptedBy}). First-come, first-served rule applies!`);
      return;
    }

    setOrders(prev => prev.map(o => ((o._id === orderId || o.id === orderId) ? { ...o, acceptedBy: deliveryPartnerName, status: 'Accepted' } : o)));

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ acceptedBy: deliveryPartnerName, status: 'Accepted' })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success === false) {
          alert('⚠️ Failed to lock order on server. Please try again.');
          fetchOrders();
        } else {
          fetchOrders();
        }
      })
      .catch((err) => {
        console.error('Failed to accept order:', err);
        fetchOrders();
      });
  };

  const handleCheckpointUpdate = (orderId, newStatus, newProgress, acceptedBy) => {
    if (!acceptedBy) {
      alert('⚠️ A delivery partner must accept this order first before updating delivery checkpoints!');
      return;
    }

    setOrders(prev => prev.map(o => ((o._id === orderId || o.id === orderId) ? { ...o, status: newStatus, progress: newProgress } : o)));

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';

    fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, progress: newProgress })
    })
      .then(() => fetchOrders())
      .catch((err) => {
        console.error('Failed to update checkpoint:', err);
        fetchOrders();
      });
  };

  const handleOpenGoogleMaps = (addressString) => {
    if (!addressString) return;
    const gpsMatch = addressString.match(/\[GPS:\s*([0-9.-]+),\s*([0-9.-]+)\]/);
    let mapsUrl = '';
    
    if (gpsMatch) {
      const lat = gpsMatch[1];
      const lng = gpsMatch[2];
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`;
    }
    
    window.open(mapsUrl, '_blank');
  };

  const formatOrderDateTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return timestamp;
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePrintThermalInvoice = () => {
    const printWindow = window.open('', '_blank', 'width=350,height=600');
    if (!printWindow) return;

    const ord = selectedOrderForInvoice;
    if (!ord) return;

    const orderId = ord._id || ord.id || 'N/A';
    const customerName = ord.customerName || ord.name || 'Valued Customer';
    const hotelName = ord.hotelName || ord.restaurant || ord.brand || (ord.items && ord.items[0]?.hotelName) || 'Partner Hotel';
    const orderTime = formatOrderDateTime(ord.createdAt || ord.time);
    const deliveryFee = ord.deliveryFee || 30;
    const totalPrice = ord.totalPrice || ord.estimatedPrice || 0;

    let itemsHtml = '';
    if (ord.items && Array.isArray(ord.items)) {
      ord.items.forEach(item => {
        const itemName = item.name || item.englishName || 'Item';
        const itemQty = item.quantity || item.qty || 1;
        const itemPrice = (item.price || 0) * itemQty;
        itemsHtml += `
          <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
            <span>${itemQty}x ${itemName}</span>
            <span>Rs.${itemPrice}</span>
          </div>
        `;
      });
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Thermal Invoice - ${orderId}</title>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              width: 58mm;
              margin: 0;
              padding: 5px;
              color: #000;
              background: #fff;
              font-size: 11px;
              line-height: 1.2;
            }
            .text-center { text-align: center; }
            .bold { font-weight: bold; }
            .divider { border-top: 1px dashed #000; margin: 6px 0; }
            .flex-between { display: flex; justify-content: space-between; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          <div class="text-center bold" style="font-size: 14px;">BUYBRIGG</div>
          <div class="text-center" style="font-size: 10px;">ORDER INVOICE</div>
          <div class="divider"></div>
          <div><span class="bold">Order ID:</span> #${orderId.slice(-6)}</div>
          <div><span class="bold">Date:</span> ${orderTime}</div>
          <div><span class="bold">Customer:</span> ${customerName}</div>
          <div><span class="bold">Hotel:</span> ${hotelName}</div>
          <div class="divider"></div>
          <div class="bold">ITEMS:</div>
          ${itemsHtml}
          <div style="display:flex; justify-content:space-between; margin-top: 4px;">
            <span>Delivery Fee</span>
            <span>Rs.${deliveryFee}</span>
          </div>
          <div class="divider"></div>
          <div class="flex-between bold" style="font-size: 13px;">
            <span>TOTAL:</span>
            <span>Rs.${totalPrice}</span>
          </div>
          <div class="divider"></div>
          <div class="text-center" style="font-size: 10px; margin-top: 8px;">
            Thank you for ordering with BuyBrigg!
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xs font-bold text-slate-500 animate-pulse">Verifying delivery session...</p>
      </div>
    );
  }

  if (!isDeliveryLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white border border-orange-200 p-6 rounded-3xl text-center space-y-4 shadow-xl">
        <p className="text-3xl">🛵</p>
        <div className="space-y-1">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Delivery Partner Login Required</h2>
          <p className="text-xs text-slate-500">Please sign in as a delivery partner to view open orders and manage dispatches.</p>
        </div>
        <a
          href="/"
          className="inline-block w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-xs py-3 rounded-xl shadow-md transition cursor-pointer"
        >
          Go to Partner Login ⚡
        </a>
      </div>
    );
  }

  const myAcceptedOrders = orders.filter(ord => {
    const partner = getAcceptedPartner(ord);
    return partner && partner.trim().toLowerCase() === deliveryPartnerName.trim().toLowerCase() && ord.status !== 'Delivered';
  });

  const myDeliveredOrders = orders.filter(ord => {
    const partner = getAcceptedPartner(ord);
    return partner && partner.trim().toLowerCase() === deliveryPartnerName.trim().toLowerCase() && ord.status === 'Delivered';
  });

  return (
    <div className="space-y-4 pb-20">
      
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
          <span>⚡ Live 1-Tap Checkpoint Dispatcher</span>
        </h2>
      </div>

      <div className="flex bg-orange-50/80 p-1 rounded-2xl border border-orange-100">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'live' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          🛵 Live Orders ({orders.filter(o => o.status !== 'Rejected' && o.status !== 'Delivered').length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 px-2 rounded-xl text-[10px] font-black uppercase transition cursor-pointer ${activeTab === 'profile' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-600 hover:text-orange-600'}`}
        >
          👤 Partner Profile
        </button>
      </div>

      {activeTab === 'live' && (
        <div className="space-y-4">
          {orders.filter(o => o.status !== 'Delivered').length === 0 ? (
            <div className="bg-white border border-orange-100 p-8 rounded-3xl text-center space-y-2 shadow-sm">
              <p className="text-2xl">🎉</p>
              <p className="text-xs font-bold text-slate-700">No active customer orders found right now.</p>
            </div>
          ) : (
            orders.filter(o => o.status !== 'Delivered').map((ord, idx) => {
              const orderId = ord._id || ord.id;
              const displayTime = formatOrderDateTime(ord.createdAt || ord.time);
              
              const assignedPartner = getAcceptedPartner(ord);
              const isAlreadyAccepted = Boolean(assignedPartner);
              const isRejectedByHotel = ord.status === 'Rejected';

              const orderHotelName = ord.hotelName || ord.restaurant || ord.brand || (ord.items && ord.items[0]?.hotelName) || (ord.items && ord.items[0]?.restaurant) || (ord.items && ord.items[0]?.brand) || 'Partner Hotel';

              const rawAddress = ord.address || ord.deliveryAddress || ord.location || 'Exact address not provided';
              const cleanAddressEnglish = rawAddress.replace(/\[GPS:[^\]]+\]/g, '').trim();

              return (
                <div key={orderId || idx} className="bg-white border border-orange-100 p-4 rounded-3xl shadow-sm space-y-3 relative">
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-xs font-black font-mono text-orange-600">#{orderId ? orderId.slice(-6) : (idx + 1)}</span>
                        <span className="bg-orange-100 text-orange-800 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                          🏨 {orderHotelName}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">📅 {displayTime}</span>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 mr-1">TOTAL</span>
                        <span className="text-sm font-black text-orange-600 font-mono">₹{ord.totalPrice || ord.estimatedPrice || 0}</span>
                      </div>
                      <button
                        onClick={() => setSelectedOrderForInvoice(ord)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-[10px] font-bold px-2 py-1.5 rounded-xl transition cursor-pointer"
                        title="View Thermal Bill"
                      >
                        🖨️ Bill
                      </button>
                    </div>
                  </div>

                  {isRejectedByHotel && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-bold text-center">
                      ❌ Order Rejected by Hotel Partner. Delivery dispatch cancelled.
                    </div>
                  )}

                  {!isRejectedByHotel && (
                    <>
                      <div className={`p-2.5 rounded-xl border text-xs flex justify-between items-center ${isAlreadyAccepted ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                        <div>
                          <p className="font-extrabold text-[11px]">
                            {isAlreadyAccepted ? `✅ Accepted by: ${assignedPartner}` : '⚡ Open Order (First-Come, First-Served)'}
                          </p>
                          <p className="text-[9px] opacity-80">
                            {isAlreadyAccepted ? 'Locked exclusively for assigned delivery partner.' : 'Tap accept to lock this order exclusively for delivery.'}
                          </p>
                        </div>
                        {!isAlreadyAccepted ? (
                          <button
                            onClick={() => handleAcceptByPartner(orderId, assignedPartner)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-lg shadow transition cursor-pointer active:scale-95 shrink-0"
                          >
                            Accept Order 🎯
                          </button>
                        ) : (
                          <span className="bg-emerald-200 text-emerald-900 text-[9px] font-black px-2 py-1 rounded-md uppercase">
                            Claimed 🔒
                          </span>
                        )}
                      </div>

                      <div className="text-xs space-y-2 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-900">👤 {ord.customerName || ord.name || 'Valued Customer'}</span>
                          <a href={`tel:${ord.phone || ord.mobile}`} className="text-[10px] text-orange-700 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                            📞 {ord.phone || ord.mobile || 'Not provided'}
                          </a>
                        </div>

                        <div className="space-y-1 pt-1 border-t border-orange-200/50">
                          <p className="text-[11px] font-semibold text-slate-800">
                            📍 <span className="font-normal text-slate-600">{cleanAddressEnglish || 'Location address not specified'}</span>
                          </p>
                          {ord.area && (
                            <p className="text-[10px] font-medium text-slate-500">
                              🏙️ Locality / Area: <strong className="text-slate-700">{ord.area}</strong>
                            </p>
                          )}
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleOpenGoogleMaps(rawAddress)}
                            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-[10px] font-extrabold px-2.5 py-1.5 rounded-lg shadow-sm transition flex items-center space-x-1 shrink-0 active:scale-95 cursor-pointer"
                          >
                            <span>🗺️ Track Live Map</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">1-Tap Dispatch Checkpoints:</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button 
                            onClick={() => handleCheckpointUpdate(orderId, 'Hub', 0, assignedPartner)}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition cursor-pointer active:scale-95 ${ord.progress === 0 ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-orange-50/30 text-slate-700 border-orange-100 hover:bg-orange-50'}`}
                          >
                            1. Hub (0%)
                          </button>
                          <button 
                            onClick={() => handleCheckpointUpdate(orderId, 'Picked', 35, assignedPartner)}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition cursor-pointer active:scale-95 ${ord.progress === 35 ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-orange-50/30 text-slate-700 border-orange-100 hover:bg-orange-50'}`}
                          >
                            2. Picked (35%)
                          </button>
                          <button 
                            onClick={() => handleCheckpointUpdate(orderId, 'Near Area', 70, assignedPartner)}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition cursor-pointer active:scale-95 ${ord.progress === 70 ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-orange-50/30 text-slate-700 border-orange-100 hover:bg-orange-50'}`}
                          >
                            3. Near Area (70%)
                          </button>
                          <button 
                            onClick={() => handleCheckpointUpdate(orderId, 'Delivered', 100, assignedPartner)}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold border transition cursor-pointer active:scale-95 ${ord.progress === 100 ? 'bg-orange-500 text-white border-orange-500 shadow-sm' : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'}`}
                          >
                            4. Delivered (100%)
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-1.5 pt-2 border-t border-orange-100">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Order Items Breakdown</p>
                    </div>
                    
                    <div className="space-y-1">
                      {ord.items?.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs bg-orange-50/30 p-2 rounded-lg border border-orange-100">
                          <span className="text-slate-800 font-medium">{item.name || item.englishName || 'Item'} <span className="text-slate-400 text-[10px]">({item.quantity || item.qty} qty)</span></span>
                          <span className="font-mono font-bold text-orange-600">₹{(item.price || 0) * (item.quantity || item.qty || 1)}</span>
                        </div>
                      ))}

                      <div className="flex justify-between items-center text-xs bg-orange-50/60 p-2 rounded-lg border border-orange-200">
                        <span className="text-orange-900 font-bold">🛵 Delivery Fee</span>
                        <span className="font-mono font-bold text-orange-700">₹{ord.deliveryFee || 30}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 text-[11px] border-t border-orange-100">
                    <span className="text-slate-500 font-medium">Payment: <strong className="text-slate-900">{ord.paymentMode || 'Online'}</strong> ({ord.paymentStatus || 'Paid'})</span>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="space-y-4">
          <div className="bg-white border border-orange-100 p-4 rounded-3xl space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-700">👤 Delivery Partner Profile</h3>
            <div className="space-y-2 text-xs text-slate-700 pt-1">
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">Partner Name:</span>
                <span className="font-black text-slate-900">{deliveryPartnerName}</span>
              </div>
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">Registered Phone:</span>
                <span className="font-mono text-slate-800">{deliveryPartnerPhone}</span>
              </div>
              <div className="flex justify-between border-b border-orange-50 pb-2">
                <span className="font-bold text-slate-500">Total Accepted Orders:</span>
                <span className="font-black text-orange-600">{myAcceptedOrders.length + myDeliveredOrders.length}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="font-bold text-slate-500">Successfully Delivered:</span>
                <span className="text-emerald-600 font-black">{myDeliveredOrders.length} Orders</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thermal Receipt Preview Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer"
            >
              ✕
            </button>

            {/* Thermal Black & White Preview Area */}
            <div ref={invoiceRef} className="bg-white text-black font-mono p-4 border border-black rounded-xl space-y-3 text-xs">
              <div className="text-center font-bold text-sm tracking-widest border-b border-black pb-2">
                BUYBRIGG
                <div className="text-[10px] font-normal">INVOICE RECEIPT</div>
              </div>

              <div className="space-y-1 text-[11px] border-b border-black pb-2">
                <div><span className="font-bold">ID:</span> #{selectedOrderForInvoice._id ? selectedOrderForInvoice._id.slice(-6) : 'N/A'}</div>
                <div><span className="font-bold">Time:</span> {formatOrderDateTime(selectedOrderForInvoice.createdAt || selectedOrderForInvoice.time)}</div>
                <div><span className="font-bold">Customer:</span> {selectedOrderForInvoice.customerName || selectedOrderForInvoice.name || 'Valued Customer'}</div>
                <div><span className="font-bold">Hotel:</span> {selectedOrderForInvoice.hotelName || selectedOrderForInvoice.restaurant || selectedOrderForInvoice.brand || 'Partner Hotel'}</div>
              </div>

              <div className="space-y-1.5 border-b border-black pb-2">
                <div className="font-bold uppercase text-[10px]">Items:</div>
                {selectedOrderForInvoice.items?.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px]">
                    <span>{item.quantity || item.qty || 1}x {item.name || item.englishName || 'Item'}</span>
                    <span>₹{(item.price || 0) * (item.quantity || item.qty || 1)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-[11px] pt-1">
                  <span>Delivery Fee</span>
                  <span>₹{selectedOrderForInvoice.deliveryFee || 30}</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-sm pt-1">
                <span>TOTAL:</span>
                <span>₹{selectedOrderForInvoice.totalPrice || selectedOrderForInvoice.estimatedPrice || 0}</span>
              </div>

              <div className="text-center text-[10px] pt-2 border-t border-black">
                *** THANK YOU! ***
              </div>
            </div>

            {/* Action Buttons: Thermal Print & Close */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handlePrintThermalInvoice}
                className="flex-1 bg-black hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🖨️</span> Print Thermal Receipt
              </button>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}