'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roleType, setRoleType] = useState(null); // 'hotel' or 'delivery'

  useEffect(() => {
    const hotelAuth = localStorage.getItem('shopmatries_is_hotel_owner');
    const deliveryAuth = localStorage.getItem('shopmatries_is_delivery_partner');

    if (hotelAuth === 'true') {
      setIsLoggedIn(true);
      setRoleType('hotel');
    } else if (deliveryAuth === 'true') {
      setIsLoggedIn(true);
      setRoleType('delivery');
    } else {
      setIsLoggedIn(false);
      setRoleType(null);
    }
  }, [pathname]);

  // Hide header and navigation on the main login/auth root page ('/')
  const isAuthPage = pathname === '/';
  const showNav = isLoggedIn && !isAuthPage;

  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <title>Buy Brigg Hub</title>
      </head>
      
      {/* Outer theatrical background wrapper */}
      <body className="bg-slate-950 text-slate-900 h-dvh w-screen m-0 p-0 flex justify-center items-center antialiased overflow-hidden selection:bg-orange-500 selection:text-white">
        
        {/* Responsive App Frame Container */}
        <div className="w-full h-full sm:h-[92vh] sm:max-h-[880px] sm:w-[410px] sm:rounded-[40px] bg-white shadow-2xl relative flex flex-col justify-between border-0 sm:border-[8px] border-slate-900 overflow-hidden">
          
          {/* Top Compact Brand Header (Shown only when logged in & past auth) */}
          {showNav && (
            <header className="shrink-0 bg-white border-b border-orange-100 px-4 py-3 flex justify-between items-center z-30 shadow-sm">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-md shadow-orange-500/25">⚡</span>
                <h1 className="text-xs font-black tracking-tight text-slate-900">
                  Buy Brigg <span className="text-orange-600">{roleType === 'hotel' ? 'Hotel Hub' : 'Delivery Hub'}</span>
                </h1>
              </div>
              <button 
                onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-200 transition cursor-pointer"
              >
                Logout 🚪
              </button>
            </header>
          )}

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto relative bg-slate-50/50 p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </main>

          {/* Stationary Bottom Navigation Bar (Contextual based on role) */}
          {showNav && roleType === 'hotel' && (
            <nav className="shrink-0 bg-white/95 backdrop-blur-md border-t border-orange-100 flex justify-around items-center py-2 px-1 z-35 shadow-lg">
              <Link 
                href="/hotel-dashboard" 
                className={`flex flex-col items-center py-1 px-4 rounded-xl transition ${pathname === '/hotel-dashboard' ? 'text-orange-600 font-bold scale-105' : 'text-slate-400 font-medium hover:text-slate-600'}`}
              >
                <span className="text-sm">📦</span>
                <span className="text-[9px]">Home</span>
              </Link>
            </nav>
          )}

          {showNav && roleType === 'delivery' && (
            <nav className="shrink-0 bg-white/95 backdrop-blur-md border-t border-orange-100 flex justify-around items-center py-2 px-1 z-35 shadow-lg">
              <Link 
                href="/delivery-dashboard" 
                className={`flex flex-col items-center py-1 px-4 rounded-xl transition ${pathname === '/delivery-dashboard' ? 'text-orange-600 font-bold scale-105' : 'text-slate-400 font-medium hover:text-slate-600'}`}
              >
                <span className="text-sm">🛵</span>
                <span className="text-[9px]">Live Dispatches</span>
              </Link>
            </nav>
          )}

        </div>
      </body>
    </html>
  );
}