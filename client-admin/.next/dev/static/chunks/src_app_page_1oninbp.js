(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UniversalPartnerHub
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function UniversalPartnerHub() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [partnerType, setPartnerType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('hotel'); // 'hotel' or 'delivery'
    const [isLoginMode, setIsLoginMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // true = Sign In, false = Register
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Hotel & Brand specific states
    const [hotelSelectionType, setHotelSelectionType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('restaurant'); // 'restaurant' or 'brand'
    const [selectedHotel, setSelectedHotel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hotelSearchQuery, setHotelSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Delivery specific states
    const [deliveryName, setDeliveryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Backend Data Lists
    const [backendRestaurants, setBackendRestaurants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendBrands, setBackendBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingBackend, setLoadingBackend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Auto-redirect if already logged in (Fixes logout issue when clearing recents)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UniversalPartnerHub.useEffect": ()=>{
            const token = localStorage.getItem('shopmatries_token');
            const isHotelOwner = localStorage.getItem('shopmatries_is_hotel_owner');
            const isDeliveryPartner = localStorage.getItem('shopmatries_is_delivery_partner');
            if (token) {
                if (isHotelOwner === 'true') {
                    router.push('/hotel-dashboard');
                } else if (isDeliveryPartner === 'true') {
                    router.push('/orders');
                }
            }
        }
    }["UniversalPartnerHub.useEffect"], [
        router
    ]);
    // Fetch live restaurants from /api/foods/restaurants and brands from /api/brands
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UniversalPartnerHub.useEffect": ()=>{
            const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
            Promise.all([
                fetch(`${API_URL}/api/foods/restaurants`).then({
                    "UniversalPartnerHub.useEffect": (res)=>res.json()
                }["UniversalPartnerHub.useEffect"]).catch({
                    "UniversalPartnerHub.useEffect": ()=>[]
                }["UniversalPartnerHub.useEffect"]),
                fetch(`${API_URL}/api/brands`).then({
                    "UniversalPartnerHub.useEffect": (res)=>res.json()
                }["UniversalPartnerHub.useEffect"]).catch({
                    "UniversalPartnerHub.useEffect": ()=>[]
                }["UniversalPartnerHub.useEffect"])
            ]).then({
                "UniversalPartnerHub.useEffect": ([restaurantData, brandData])=>{
                    // Parse Hotels / Restaurants
                    const rList = Array.isArray(restaurantData) ? restaurantData : restaurantData.restaurants || restaurantData.data || [];
                    const rNames = rList.map({
                        "UniversalPartnerHub.useEffect.rNames": (h)=>typeof h === 'string' ? h : h.hotelName || h.name || h.brand
                    }["UniversalPartnerHub.useEffect.rNames"]).filter(Boolean);
                    setBackendRestaurants(rNames);
                    if (rNames.length > 0) setSelectedHotel(rNames[0]);
                    // Parse Brands
                    const bList = Array.isArray(brandData) ? brandData : brandData.brands || brandData.data || [];
                    const bNames = bList.map({
                        "UniversalPartnerHub.useEffect.bNames": (b)=>typeof b === 'string' ? b : b.name || b.brand || b.title
                    }["UniversalPartnerHub.useEffect.bNames"]).filter(Boolean);
                    setBackendBrands(bNames);
                    if (bNames.length > 0) setSelectedBrand(bNames[0]);
                    setLoadingBackend(false);
                }
            }["UniversalPartnerHub.useEffect"]).catch({
                "UniversalPartnerHub.useEffect": ()=>setLoadingBackend(false)
            }["UniversalPartnerHub.useEffect"]);
        }
    }["UniversalPartnerHub.useEffect"], []);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        if (phone.length !== 10 || isNaN(Number(phone))) {
            setError('Please enter a valid 10-digit mobile number.');
            setLoading(false);
            return;
        }
        const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
        // Target the separated hotel and delivery route endpoints
        const rolePrefix = partnerType === 'hotel' ? 'hotel' : 'delivery';
        const actionPath = isLoginMode ? 'login' : 'register';
        const endpoint = `${API_URL}/api/auth/${rolePrefix}/${actionPath}`;
        let payload = {
            phone,
            password
        };
        if (partnerType === 'hotel') {
            if (!isLoginMode) {
                const activeHotel = hotelSelectionType === 'restaurant' ? selectedHotel : selectedBrand;
                if (!activeHotel) {
                    setError('Please select a hotel or brand from the list.');
                    setLoading(false);
                    return;
                }
                payload = {
                    phone,
                    password,
                    hotelName: hotelSelectionType === 'restaurant' ? selectedHotel : selectedBrand,
                    restaurant: hotelSelectionType === 'restaurant' ? selectedHotel : 'General',
                    brand: hotelSelectionType === 'brand' ? selectedBrand : 'General'
                };
            } else {
                payload = {
                    phone,
                    password
                };
            }
        } else {
            if (!isLoginMode && !deliveryName.trim()) {
                setError('Please enter your full name.');
                setLoading(false);
                return;
            }
            payload = isLoginMode ? {
                phone,
                password
            } : {
                phone,
                password,
                name: deliveryName.trim() || 'Delivery Rider'
            };
        }
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok && (data.success || data.token)) {
                localStorage.setItem('shopmatries_token', data.token || 'partner_session');
                localStorage.setItem('shopmatries_phone', phone);
                if (partnerType === 'hotel') {
                    localStorage.setItem('shopmatries_is_hotel_owner', 'true');
                    // Accurately map hotel name or brand name, preventing fallback mismatches
                    let finalName = data.hotelName || data.restaurant || data.brand || data.user?.hotelName || data.user?.brand;
                    if (!finalName || finalName === 'Partner Hotel') {
                        if (!isLoginMode) {
                            finalName = hotelSelectionType === 'brand' ? selectedBrand : selectedHotel;
                        } else {
                            try {
                                const [restRes, brandRes] = await Promise.all([
                                    fetch(`${API_URL}/api/foods/restaurants`).then((r)=>r.json()).catch(()=>[]),
                                    fetch(`${API_URL}/api/brands`).then((r)=>r.json()).catch(()=>[])
                                ]);
                                const rList = Array.isArray(restRes) ? restRes : restRes.restaurants || restRes.data || [];
                                const bList = Array.isArray(brandRes) ? brandRes : brandRes.brands || brandRes.data || [];
                                const matchedRest = rList.find((r)=>r.phone === phone || r.contact === phone);
                                const matchedBrand = bList.find((b)=>b.phone === phone || b.contact === phone);
                                if (matchedBrand) {
                                    finalName = matchedBrand.name || matchedBrand.brandName;
                                } else if (matchedRest) {
                                    finalName = matchedRest.hotelName || matchedRest.name || matchedRest.restaurantName;
                                } else {
                                    finalName = rList[0]?.hotelName || bList[0]?.name || 'Partner Hotel';
                                }
                            } catch (err) {}
                        }
                    }
                    localStorage.setItem('shopmatries_hotel_name', finalName || 'Partner Hotel');
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
        } catch  {
            setError('Unable to connect to backend server.');
        } finally{
            setLoading(false);
        }
    };
    // Filtered lists for search feature during registration
    const filteredRestaurants = backendRestaurants.filter((r)=>r.toLowerCase().includes(hotelSearchQuery.toLowerCase()));
    const filteredBrands = backendBrands.filter((b)=>b.toLowerCase().includes(hotelSearchQuery.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto pt-4 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl",
                        children: "⚡"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-black text-slate-950",
                        children: "Buy Brigg Hub"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-slate-500",
                        children: "Universal portal for hotel owners & delivery riders"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1.5 bg-orange-100/50 p-1 rounded-2xl border border-orange-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setPartnerType('hotel');
                            setError('');
                        },
                        className: `py-2 rounded-xl text-xs font-bold transition cursor-pointer ${partnerType === 'hotel' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`,
                        children: "🏨 Hotel Partner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setPartnerType('delivery');
                            setError('');
                        },
                        className: `py-2 rounded-xl text-xs font-bold transition cursor-pointer ${partnerType === 'delivery' ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`,
                        children: "🛵 Delivery Partner"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setIsLoginMode(true);
                            setError('');
                        },
                        className: `py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${isLoginMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`,
                        children: "🔑 Sign In"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setIsLoginMode(false);
                            setError('');
                        },
                        className: `py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${!isLoginMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`,
                        children: "🚀 Register"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white border border-orange-100 rounded-[26px] p-4 shadow-sm space-y-3",
                children: [
                    partnerType === 'hotel' && !isLoginMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-1 bg-orange-50 p-1 rounded-xl border border-orange-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setHotelSelectionType('restaurant');
                                            setHotelSearchQuery('');
                                        },
                                        className: `py-1.5 text-[10px] font-bold rounded-lg transition ${hotelSelectionType === 'restaurant' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`,
                                        children: "🏨 Hotels"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setHotelSelectionType('brand');
                                            setHotelSearchQuery('');
                                        },
                                        className: `py-1.5 text-[10px] font-bold rounded-lg transition ${hotelSelectionType === 'brand' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`,
                                        children: "🏷️ Brands"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 239,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] font-black text-slate-600 uppercase",
                                        children: hotelSelectionType === 'restaurant' ? 'Search & Select Hotel / Restaurant' : 'Search & Select Brand'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Type to search...",
                                        value: hotelSearchQuery,
                                        onChange: (e)=>setHotelSearchQuery(e.target.value),
                                        className: "w-full bg-orange-50/20 border border-orange-200 text-slate-900 text-xs rounded-xl py-2 px-3 font-medium focus:outline-none focus:border-orange-500 mb-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: hotelSelectionType === 'restaurant' ? selectedHotel : selectedBrand,
                                        onChange: (e)=>{
                                            if (hotelSelectionType === 'restaurant') setSelectedHotel(e.target.value);
                                            else setSelectedBrand(e.target.value);
                                        },
                                        className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500",
                                        required: true,
                                        children: loadingBackend ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Loading from backend..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 280,
                                            columnNumber: 19
                                        }, this) : hotelSelectionType === 'restaurant' ? filteredRestaurants.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "No matching hotels found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 283,
                                            columnNumber: 21
                                        }, this) : filteredRestaurants.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: r,
                                                children: [
                                                    "🏨 ",
                                                    r
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/page.js",
                                                lineNumber: 285,
                                                columnNumber: 55
                                            }, this)) : filteredBrands.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "No matching brands found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.js",
                                            lineNumber: 289,
                                            columnNumber: 21
                                        }, this) : filteredBrands.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: b,
                                                children: [
                                                    "🏷️ ",
                                                    b
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/page.js",
                                                lineNumber: 291,
                                                columnNumber: 50
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.js",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    partnerType === 'delivery' && !isLoginMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: "Your Full Name"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g. Rahul Kumar",
                                value: deliveryName,
                                onChange: (e)=>setDeliveryName(e.target.value),
                                className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 303,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: "10-Digit Mobile Number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "tel",
                                maxLength: 10,
                                placeholder: "Enter mobile number",
                                value: phone,
                                onChange: (e)=>setPhone(e.target.value.replace(/\D/g, '')),
                                className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-mono font-bold focus:outline-none focus:border-orange-500",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 329,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                placeholder: "Enter password",
                                value: password,
                                onChange: (e)=>setPassword(e.target.value),
                                className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-semibold focus:outline-none focus:border-orange-500",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.js",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-2 rounded-xl text-center",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 340,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black py-3 rounded-xl shadow-lg cursor-pointer transition mt-2",
                        children: loading ? 'Processing...' : isLoginMode ? `Sign In as ${partnerType === 'hotel' ? 'Hotel Partner' : 'Delivery Rider'} ⚡` : `Register ${partnerType === 'hotel' ? 'Hotel Account' : 'Delivery Account'} 🚀`
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.js",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 188,
        columnNumber: 5
    }, this);
}
_s(UniversalPartnerHub, "O+LKLUejxpWW+FIuqTQR3f9aaCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UniversalPartnerHub;
var _c;
__turbopack_context__.k.register(_c, "UniversalPartnerHub");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_page_1oninbp.js.map