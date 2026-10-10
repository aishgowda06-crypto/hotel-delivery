(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/login/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HotelAuthPage
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
function HotelAuthPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoginMode, setIsLoginMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectionMode, setSelectionMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('restaurant'); // 'restaurant' or 'brand'
    const [selectedHotel, setSelectedHotel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedBrand, setSelectedBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newHotelName, setNewHotelName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newBrandName, setNewBrandName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [backendRestaurants, setBackendRestaurants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendBrands, setBackendBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingBackend, setLoadingBackend] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HotelAuthPage.useEffect": ()=>{
            const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://food-cgs4.onrender.com';
            Promise.all([
                fetch(`${API_URL}/api/foods/restaurants`).then({
                    "HotelAuthPage.useEffect": (res)=>res.json()
                }["HotelAuthPage.useEffect"]).catch({
                    "HotelAuthPage.useEffect": ()=>[]
                }["HotelAuthPage.useEffect"]),
                fetch(`${API_URL}/api/brands`).then({
                    "HotelAuthPage.useEffect": (res)=>res.json()
                }["HotelAuthPage.useEffect"]).catch({
                    "HotelAuthPage.useEffect": ()=>[]
                }["HotelAuthPage.useEffect"])
            ]).then({
                "HotelAuthPage.useEffect": ([restaurantData, brandData])=>{
                    const rList = Array.isArray(restaurantData) ? restaurantData : restaurantData.restaurants || restaurantData.data || [];
                    const rNames = rList.map({
                        "HotelAuthPage.useEffect.rNames": (h)=>typeof h === 'string' ? h : h.hotelName || h.name || h.brand
                    }["HotelAuthPage.useEffect.rNames"]).filter(Boolean);
                    setBackendRestaurants(rNames);
                    if (rNames.length > 0) setSelectedHotel(rNames[0]);
                    const bList = Array.isArray(brandData) ? brandData : brandData.brands || brandData.data || [];
                    const bNames = bList.map({
                        "HotelAuthPage.useEffect.bNames": (b)=>typeof b === 'string' ? b : b.name || b.brand || b.title
                    }["HotelAuthPage.useEffect.bNames"]).filter(Boolean);
                    setBackendBrands(bNames);
                    if (bNames.length > 0) setSelectedBrand(bNames[0]);
                    setLoadingBackend(false);
                }
            }["HotelAuthPage.useEffect"]).catch({
                "HotelAuthPage.useEffect": ()=>setLoadingBackend(false)
            }["HotelAuthPage.useEffect"]);
        }
    }["HotelAuthPage.useEffect"], []);
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
        const endpoint = isLoginMode ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/register`;
        const activeHotel = isLoginMode ? selectedHotel : newHotelName.trim();
        const activeBrand = isLoginMode ? selectedBrand : newBrandName.trim();
        if (!isLoginMode && !activeHotel) {
            setError('Please enter your hotel or restaurant name.');
            setLoading(false);
            return;
        }
        const payload = isLoginMode ? {
            phone,
            password
        } : {
            phone,
            password,
            isHotelOwner: true,
            hotelName: activeHotel || 'Partner Hotel',
            restaurant: activeHotel || 'Partner Hotel',
            brand: activeBrand || 'General'
        };
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
                localStorage.setItem('shopmatries_is_hotel_owner', 'true');
                const finalHotelName = data.hotelName || data.restaurant || (isLoginMode ? selectedHotel : newHotelName) || 'Partner Hotel';
                localStorage.setItem('shopmatries_hotel_name', finalHotelName);
                router.push('/hotel-dashboard');
            } else {
                setError(data.error || data.message || 'Authentication failed. Please verify your credentials.');
            }
        } catch  {
            setError('Unable to connect to backend server.');
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto pt-4 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl",
                        children: "🏨"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-black text-slate-950",
                        children: "Hotel Partner Portal"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-slate-500",
                        children: "Manage your menu and incoming restaurant orders"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/login/page.js",
                lineNumber: 106,
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
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            setIsLoginMode(false);
                            setError('');
                        },
                        className: `py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${!isLoginMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`,
                        children: "🚀 Register Hotel"
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/login/page.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white border border-orange-100 rounded-[26px] p-4 shadow-sm space-y-3",
                children: [
                    isLoginMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-1 bg-orange-50 p-1 rounded-xl border border-orange-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectionMode('restaurant'),
                                className: `py-1.5 text-[10px] font-bold rounded-lg transition ${selectionMode === 'restaurant' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`,
                                children: "🏨 Hotels"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectionMode('brand'),
                                className: `py-1.5 text-[10px] font-bold rounded-lg transition ${selectionMode === 'brand' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600'}`,
                                children: "🏷️ Brands"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: isLoginMode ? selectionMode === 'restaurant' ? 'Select Registered Hotel' : 'Select Registered Brand' : 'New Hotel / Restaurant Name'
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            isLoginMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectionMode === 'restaurant' ? selectedHotel : selectedBrand,
                                onChange: (e)=>{
                                    if (selectionMode === 'restaurant') setSelectedHotel(e.target.value);
                                    else setSelectedBrand(e.target.value);
                                },
                                className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500",
                                required: true,
                                children: loadingBackend ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "Loading from backend..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.js",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this) : selectionMode === 'restaurant' ? backendRestaurants.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "No hotels found"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.js",
                                    lineNumber: 169,
                                    columnNumber: 51
                                }, this) : backendRestaurants.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: r,
                                        children: [
                                            "🏨 ",
                                            r
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/login/page.js",
                                        lineNumber: 169,
                                        columnNumber: 128
                                    }, this)) : backendBrands.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "No brands found"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/login/page.js",
                                    lineNumber: 171,
                                    columnNumber: 46
                                }, this) : backendBrands.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: b,
                                        children: [
                                            "🏷️ ",
                                            b
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/login/page.js",
                                        lineNumber: 171,
                                        columnNumber: 118
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Enter Hotel Name e.g. Empire Restaurant",
                                        value: newHotelName,
                                        onChange: (e)=>setNewHotelName(e.target.value),
                                        className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.js",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Enter Brand Name (Optional)",
                                        value: newBrandName,
                                        onChange: (e)=>setNewBrandName(e.target.value),
                                        className: "w-full bg-orange-50/30 border border-orange-200 text-slate-900 text-xs rounded-xl py-3 px-3 font-bold focus:outline-none focus:border-orange-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/login/page.js",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: "10-Digit Mobile Number"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 196,
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
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-black text-slate-600 uppercase",
                                children: "Password"
                            }, void 0, false, {
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 209,
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
                                fileName: "[project]/src/app/login/page.js",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-2 rounded-xl text-center",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 220,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-black py-3 rounded-xl shadow-lg cursor-pointer transition mt-2",
                        children: loading ? 'Processing...' : isLoginMode ? 'Sign In to Hotel Hub ⚡' : 'Register Hotel Account 🚀'
                    }, void 0, false, {
                        fileName: "[project]/src/app/login/page.js",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/login/page.js",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/login/page.js",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_s(HotelAuthPage, "JL7TWRDVUqvbKevFq+AldHKmLvQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = HotelAuthPage;
var _c;
__turbopack_context__.k.register(_c, "HotelAuthPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_login_page_0o5djze.js.map