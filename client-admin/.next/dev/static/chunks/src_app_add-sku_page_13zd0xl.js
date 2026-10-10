(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/add-sku/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminAddFoodDish
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function AdminAddFoodDish() {
    _s();
    const [hotels, setHotels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        kannadaName: '',
        englishName: '',
        category: 'Hotels',
        hotelId: '',
        hotelNameInput: '',
        hotelImage: '',
        price: '',
        image: '' // Photo for the food dish
    });
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploadingFood, setUploadingFood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadingHotel, setUploadingHotel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch partner hotels directly from backend database
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminAddFoodDish.useEffect": ()=>{
            const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://food-ohea.onrender.com';
            fetch(`${API_URL}/api/foods/restaurants`).then({
                "AdminAddFoodDish.useEffect": (res)=>res.json()
            }["AdminAddFoodDish.useEffect"]).then({
                "AdminAddFoodDish.useEffect": (data)=>{
                    if (Array.isArray(data)) {
                        setHotels(data);
                    }
                }
            }["AdminAddFoodDish.useEffect"]).catch({
                "AdminAddFoodDish.useEffect": (err)=>{
                    console.error('Failed to fetch hotels from backend:', err);
                    setHotels([]);
                }
            }["AdminAddFoodDish.useEffect"]);
        }
    }["AdminAddFoodDish.useEffect"], []);
    // Helper function to upload files directly from frontend to Cloudinary
    const uploadDirectToCloudinary = async (file)=>{
        const cloudName = 'divin440';
        const uploadPreset = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'shopmatries_preset';
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                method: 'POST',
                body: data
            });
            const json = await res.json();
            if (json.secure_url) {
                return json.secure_url;
            } else {
                throw new Error(json.error?.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Cloudinary upload error:', err);
            alert('Failed to upload image to Cloudinary.');
            return null;
        }
    };
    // Handle food image upload directly to Cloudinary
    const handleFoodImageChange = async (e)=>{
        const file = e.target.files[0];
        if (file) {
            setUploadingFood(true);
            const secureUrl = await uploadDirectToCloudinary(file);
            if (secureUrl) {
                setFormData((prev)=>({
                        ...prev,
                        image: secureUrl
                    }));
            }
            setUploadingFood(false);
        }
    };
    // Handle hotel image upload directly to Cloudinary
    const handleHotelImageChange = async (e)=>{
        const file = e.target.files[0];
        if (file) {
            setUploadingHotel(true);
            const secureUrl = await uploadDirectToCloudinary(file);
            if (secureUrl) {
                setFormData((prev)=>({
                        ...prev,
                        hotelImage: secureUrl
                    }));
            }
            setUploadingHotel(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        let finalHotelName = 'Partner Hotel';
        let finalHotelId = formData.hotelId;
        const API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'https://food-ohea.onrender.com';
        try {
            // If a new hotel is typed, save it along with its specific photo to the database first
            if (formData.hotelId === 'new') {
                const newHotelName = formData.hotelNameInput.trim() || 'New Partner Hotel';
                const hotelRes = await fetch(`${API_URL}/api/foods/restaurants`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: newHotelName,
                        address: 'Local Area',
                        image: formData.hotelImage // Strictly sends the hotel logo/store image
                    })
                });
                const hotelData = await hotelRes.json();
                if (hotelData.success && hotelData.restaurant) {
                    finalHotelName = hotelData.restaurant.name;
                    finalHotelId = hotelData.restaurant._id;
                } else {
                    finalHotelName = newHotelName;
                    finalHotelId = 'h-' + Date.now();
                }
            } else {
                const selectedHotelObj = hotels.find((h)=>h._id === formData.hotelId || h.id === formData.hotelId);
                if (selectedHotelObj) {
                    finalHotelName = selectedHotelObj.name;
                }
            }
            // Build a clean payload containing ONLY food-specific properties and the food dish image
            const foodPayload = {
                kannadaName: formData.kannadaName,
                englishName: formData.englishName,
                category: formData.category,
                hotelId: finalHotelId,
                hotelName: finalHotelName,
                price: formData.price,
                image: formData.image // Strictly sends the food dish photo URL
            };
            // Submit food dish payload to backend
            const foodRes = await fetch(`${API_URL}/api/foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foodPayload)
            });
            const foodData = await foodRes.json();
            if (foodRes.ok && foodData.success) {
                setMessage(`✅ Food dish successfully added to "${finalHotelName}" menu!`);
                setFormData({
                    kannadaName: '',
                    englishName: '',
                    category: 'Hotels',
                    hotelId: '',
                    hotelNameInput: '',
                    hotelImage: '',
                    price: '',
                    image: ''
                });
                setTimeout(()=>setMessage(''), 3000);
            } else {
                setMessage(`❌ ${foodData.error || 'Failed to add dish to backend catalog.'}`);
                setTimeout(()=>setMessage(''), 3000);
            }
        } catch (err) {
            console.error('Failed to submit form:', err);
            setMessage('❌ Network error while saving dish.');
            setTimeout(()=>setMessage(''), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 pb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-200 p-4 rounded-3xl shadow-sm space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-sm font-black text-slate-950",
                        children: "Add Food Dish & Hotel (ಹೊಸ ಆಹಾರ ಮತ್ತು ಹೋಟೆಲ್ ಸೇರಿಸಿ)"
                    }, void 0, false, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-slate-500",
                        children: "Select an existing hotel or type a new hotel name directly while adding your dish."
                    }, void 0, false, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/add-sku/page.js",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-emerald-200 text-emerald-700 text-xs font-bold p-3 rounded-2xl text-center shadow-sm",
                children: message
            }, void 0, false, {
                fileName: "[project]/src/app/add-sku/page.js",
                lineNumber: 172,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-bold text-slate-600 uppercase",
                                children: "Select or Add Hotel *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: formData.hotelId,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        hotelId: e.target.value
                                    }),
                                className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 font-bold cursor-pointer",
                                required: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "-- Choose Existing Hotel --"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    hotels.map((h)=>{
                                        const hId = h._id || h.id;
                                        const hName = h.name || h.hotelName || h.restaurantName || 'Midari hotel';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: hId,
                                            children: hName
                                        }, hId, false, {
                                            fileName: "[project]/src/app/add-sku/page.js",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "new",
                                        children: "➕ Type New Hotel Name..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 197,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            formData.hotelId === 'new' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-1 animate-fadeIn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Enter new hotel name (e.g. Midari hotel)",
                                            value: formData.hotelNameInput,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    hotelNameInput: e.target.value
                                                }),
                                            className: "w-full bg-emerald-50/50 border border-emerald-300 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 font-bold",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/add-sku/page.js",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] font-bold text-emerald-800",
                                                children: "Hotel Logo / Store Image (ಹೋಟೆಲ್ ಚಿತ್ರ) *"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 215,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "image/*",
                                                onChange: handleHotelImageChange,
                                                className: "w-full bg-emerald-50/40 border border-emerald-200 text-slate-600 text-xs rounded-xl p-2 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    uploadingHotel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-emerald-600 font-bold animate-pulse",
                                        children: "Uploading hotel image to Cloudinary..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this),
                                    formData.hotelImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full h-24 bg-slate-100 rounded-xl overflow-hidden border border-emerald-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: formData.hotelImage,
                                            alt: "Hotel Preview",
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/add-sku/page.js",
                                            lineNumber: 231,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-bold text-slate-600",
                                children: "Kannada Name (ಕನ್ನಡ ಹೆಸರು) *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "ಉದಾ: ಮಸಾಲೆ ದೋಸೆ, ಚಿಕನ್ ಬಿರಿಯಾನಿ",
                                value: formData.kannadaName,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        kannadaName: e.target.value
                                    }),
                                className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-bold text-slate-600",
                                children: "English Dish Name *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g. Hyderabadi Chicken Biryani",
                                value: formData.englishName,
                                onChange: (e)=>setFormData({
                                        ...formData,
                                        englishName: e.target.value
                                    }),
                                className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] font-bold text-slate-600",
                                        children: "Category *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: formData.category,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                category: e.target.value
                                            }),
                                        className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Hotels",
                                                children: "Hotels"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 270,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Breakfast",
                                                children: "Breakfast"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 271,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Veg",
                                                children: "Veg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 272,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Non-Veg",
                                                children: "Non-Veg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "South",
                                                children: "South"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 274,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "North",
                                                children: "North"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Chats",
                                                children: "Chats"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/add-sku/page.js",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] font-bold text-slate-600",
                                        children: "Base Price (₹) *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: "250",
                                        value: formData.price,
                                        onChange: (e)=>setFormData({
                                                ...formData,
                                                price: e.target.value
                                            }),
                                        className: "w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl p-3 focus:outline-none focus:border-emerald-500",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/add-sku/page.js",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 262,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[10px] font-bold text-slate-600",
                                children: "Food Dish Image Upload (ಆಹಾರದ ಚಿತ್ರ) *"
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: handleFoodImageChange,
                                className: "w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-xl p-2 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/app/add-sku/page.js",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    uploadingFood && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] text-emerald-600 font-bold animate-pulse",
                        children: "Uploading food image to Cloudinary..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this),
                    formData.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: formData.image,
                            alt: "Food Preview",
                            className: "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/add-sku/page.js",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3 rounded-xl shadow-lg shadow-emerald-600/20 transition mt-2 active:scale-95 cursor-pointer",
                        children: "+ Save & Assign Dish to Hotel ⚡"
                    }, void 0, false, {
                        fileName: "[project]/src/app/add-sku/page.js",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/add-sku/page.js",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/add-sku/page.js",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_s(AdminAddFoodDish, "Pw8Q3xxMlXuJzSLIWMv+yGFIn9U=");
_c = AdminAddFoodDish;
var _c;
__turbopack_context__.k.register(_c, "AdminAddFoodDish");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_add-sku_page_13zd0xl.js.map