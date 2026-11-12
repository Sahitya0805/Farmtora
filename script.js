/**
 * FarmTora - weather, crop and livestock guide for farmers
 * Core Client-Side SPA Application Engine
 */

// 1. Unified Translations Dictionary (en, kn, hi)
const TRANSLATIONS = {
    en: {
        appName: "Farmtora",
        tagline: "Weather. Crops. Livestock. Soil.",
        launchApp: "Launch App",
        learnMore: "Learn More",
        homeTitle: "Everyday farm help, <span class=\"accent\">in your language</span>.",
        homeSubtitle: "Check local weather, look up crop problems, and track livestock and soil care — in English, Kannada and Hindi.",
        unifiedIntel: "Everything in One Place",
        unifiedIntelSub: "Four simple tools for everyday farm decisions.",
        extremeYield: "Built for clearer daily farm decisions.",
        extremeYieldSub: "Local weather forecasts, a crop-problem guide and saved notes help farmers move from observation to action.",
        edgeFirst: "Works Offline",
        edgeFirstSub: "Install it on your phone; pages you have opened keep working on weak networks.",
        globalScale: "Three Languages",
        globalScaleSub: "Switch between English, Kannada and Hindi at any time.",
        deterministic: "Saved Records",
        deterministicSub: "Your lookups are saved on this device so you can revisit them.",
        ctaTitle: "Start with today’s field conditions.",
        ctaSubtitle: "Open the weather page, then use the crop, livestock and soil guides as your day unfolds.",
        
        // Navigation
        navHome: "Home",
        navWeather: "Weather",
        navCrops: "Crops",
        navCattle: "Cattle",
        navSoil: "Soil",
        navMarket: "Market",
        navDashboard: "Dashboard",
        navAccount: "Account",
        
        marketTitle: "Crop Market Prices",
        marketSubtitle: "Sample commodity prices and trends — not live market data.",
        marketSearchPlaceholder: "Search crop (e.g. Wheat, Rice, Cotton)...",
        
        // Weather
        weatherTitle: "Weather Forecast",
        weatherSubtitle: "Local forecasts to plan sowing, spraying and harvest.",
        searchPlaceholder: "Search city or location...",
        detectLocation: "Use My Location",
        currentTemp: "Current Temperature",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        precipProb: "Precipitation",
        uvIndex: "UV Index",
        sunrise: "Sunrise",
        sunset: "Sunset",
        sevenDayForecast: "7-Day Forecast",
        weatherHistory: "Recent Searches",
        clearHistory: "Clear History",
        
        // Crops
        cropsTitle: "Crop Problem Guide",
        cropsSubtitle: "Add a photo, pick the problem that matches what you see, and get treatment and prevention steps.",
        uploadAreaTitle: "Upload Crop Image",
        uploadAreaSub: "Drag and drop or click to upload leaf/plant photo",
        btnAnalyze: "Check Photo & Continue",
        critical: "Critical",
        attention: "Attention",
        healthy: "Healthy",
        cropDisease: "Selected Problem",
        confidence: "Confidence Score",
        treatments: "Treatment Recommendations",
        preventions: "Prevention Strategies",
        cropsHistory: "Saved Lookups",
        
        // Cattle
        cattleTitle: "Livestock Care Guide",
        cattleSubtitle: "Pick your breed for general care tips and the usual vaccination schedule.",
        uploadCattleTitle: "Upload Livestock Image",
        uploadCattleSub: "Drag and drop or click to upload cattle photo",
        cattleBreed: "Selected Breed",
        healthStatus: "Health Status",
        vaccineTracker: "Usual Vaccination Schedule",
        cattleHistory: "Saved Lookups",
        
        // Soil
        soilTitle: "Soil Type Guide",
        soilSubtitle: "Pick your soil type to see its typical nutrients and the crops that suit it.",
        uploadSoilTitle: "Upload Soil Image",
        uploadSoilSub: "Drag and drop or click to upload soil profile photo",
        soilType: "Selected Soil Type",
        soilNutrients: "Typical Nutrients",
        nitrogen: "Nitrogen (N)",
        phosphorus: "Phosphorus (P)",
        potassium: "Potassium (K)",
        phLevel: "pH Level",
        soilMoisture: "Soil Moisture",
        optimizedCrops: "Crops That Suit This Soil",
        recommendations: "Soil Treatment Recommendations",
        soilHistory: "Saved Lookups",
        
        // Dashboard
        dashTitle: "My Dashboard",
        dashSubtitle: "A summary of the lookups saved on this device.",
        botanicalIndex: "Crop Botanical Index",
        cattleHealth: "Cattle Health Index",
        soilTaxonomy: "Soil Taxonomy Ratio",
        advisoryBoard: "Official Sources",
        researchFeed: "Get Help",
        scansCount: "Saved Lookups",
        activeCattle: "Livestock Lookups",
        soilAvgPh: "Typical pH (saved soils)",
        
        // Auth
        authTitle: "Access Portal",
        authSubtitle: "Log in or register your farm details",
        emailLabel: "Email Address",
        emailPlaceholder: "farmtora@farming.com",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
        btnSignIn: "Sign In",
        btnSignUp: "Register Account",
        alreadyAccount: "Already have an account? Sign In",
        noAccount: "Don't have an account? Register Farm",
        signOut: "Sign Out",
        welcomeBack: "Welcome back",
        activeSession: "Active Farmer Session",
        
        // Validation Errors
        errInvalidCrop: "Verification failed: Please upload a photo of a crop, plant, or leaf.",
        errInvalidCattle: "Verification failed: Please upload a photo of a cow or other livestock.",
        errInvalidSoil: "Verification failed: Please upload a photo containing soil or dirt.",
        loadingModel: "Loading the photo checker...",
        scanningImage: "Checking the photo...",
        fetchingWeather: "Retrieving weather data...",
        weatherError: "Couldn't load the weather right now. Check your connection and try again.",
        pickMatchTitle: "Which one matches what you see?",
        pickCropSub: "Compare your photo with these common problems and choose the closest one.",
        pickCattleSub: "Choose your animal's breed.",
        pickSoilSub: "Choose the soil type that looks most like yours.",
        referenceNote: "This is general guidance, not a diagnosis. Confirm with your local agriculture officer or Krishi Vigyan Kendra before using chemicals.",
        vetNote: "General guidance only. Follow the schedule your local veterinarian gives you.",
        soilNote: "Typical values for this soil type. Get your field tested for a Soil Health Card to know its exact nutrients.",
        sampleData: "Sample data",
        chooseAnother: "Choose a different match",
        noRecords: "Nothing saved yet.",
        careTips: "Care Tips",
        statusLabel: "Severity",
        photoTipTitle: "Add a photo (optional)",
        skipPhoto: "Skip photo and browse the guide",
        marketKpi: "Sample Prices"
    },
    kn: {
        appName: "ಫಾರ್ಮ್‌ಟೋರಾ",
        tagline: "ಹವಾಮಾನ. ಬೆಳೆ. ಜಾನುವಾರು. ಮಣ್ಣು.",
        launchApp: "ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಾರಂಭಿಸಿ",
        learnMore: "ಹೆಚ್ಚು ತಿಳಿಯಿರಿ",
        homeTitle: "ದಿನನಿತ್ಯದ ಕೃಷಿ ನೆರವು, <span class=\"accent\">ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ</span>.",
        homeSubtitle: "ಸ್ಥಳೀಯ ಹವಾಮಾನ ನೋಡಿ, ಬೆಳೆ ಸಮಸ್ಯೆಗಳನ್ನು ಹುಡುಕಿ, ಜಾನುವಾರು ಮತ್ತು ಮಣ್ಣಿನ ಆರೈಕೆಯನ್ನು ನಿರ್ವಹಿಸಿ — ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ.",
        unifiedIntel: "ಎಲ್ಲವೂ ಒಂದೇ ಕಡೆ",
        unifiedIntelSub: "ದೈನಂದಿನ ಕೃಷಿ ನಿರ್ಧಾರಗಳಿಗೆ ನಾಲ್ಕು ಸರಳ ಸಾಧನಗಳು.",
        extremeYield: "ದಿನನಿತ್ಯದ ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ಸುಲಭಗೊಳಿಸಲು.",
        extremeYieldSub: "ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ, ಬೆಳೆ ಸಮಸ್ಯೆ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಉಳಿಸಿದ ದಾಖಲೆಗಳು ರೈತರಿಗೆ ಬೇಗ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ನೆರವಾಗುತ್ತವೆ.",
        edgeFirst: "ಆಫ್‌ಲೈನ್‌ನಲ್ಲೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
        edgeFirstSub: "ಫೋನ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ; ತೆರೆದ ಪುಟಗಳು ದುರ್ಬಲ ನೆಟ್‌ವರ್ಕ್‌ನಲ್ಲೂ ಕೆಲಸ ಮಾಡುತ್ತವೆ.",
        globalScale: "ಮೂರು ಭಾಷೆಗಳು",
        globalScaleSub: "ಯಾವಾಗ ಬೇಕಾದರೂ ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ನಡುವೆ ಬದಲಿಸಿ.",
        deterministic: "ಉಳಿಸಿದ ದಾಖಲೆಗಳು",
        deterministicSub: "ನಿಮ್ಮ ಹುಡುಕಾಟಗಳು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಯುತ್ತವೆ, ನಂತರ ಮತ್ತೆ ನೋಡಬಹುದು.",
        ctaTitle: "ಇಂದಿನ ಹೊಲದ ಪರಿಸ್ಥಿತಿಯಿಂದ ಪ್ರಾರಂಭಿಸಿ.",
        ctaSubtitle: "ಮೊದಲು ಹವಾಮಾನ ಪುಟ ತೆರೆಯಿರಿ, ನಂತರ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಬೆಳೆ, ಜಾನುವಾರು ಮತ್ತು ಮಣ್ಣಿನ ಮಾರ್ಗದರ್ಶಿಗಳನ್ನು ಬಳಸಿ.",
        
        navHome: "ಮುಖಪುಟ",
        navWeather: "ಹವಾಮಾನ",
        navCrops: "ಬೆಳೆಗಳು",
        navCattle: "ಜಾನುವಾರು",
        navSoil: "ಮಣ್ಣು",
        navMarket: "ಮಾರುಕಟ್ಟೆ",
        navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        navAccount: "ಖಾತೆ",
        
        marketTitle: "ಬೆಳೆ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        marketSubtitle: "ಮಾದರಿ ಸರಕು ಬೆಲೆಗಳು ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳು — ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳಲ್ಲ.",
        marketSearchPlaceholder: "ಬೆಳೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ. ಗೋಧಿ, ಭತ್ತ)...",
        
        weatherTitle: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
        weatherSubtitle: "ಬಿತ್ತನೆ, ಸಿಂಪಡಣೆ ಮತ್ತು ಕೊಯ್ಲು ಯೋಜಿಸಲು ಸ್ಥಳೀಯ ಮುನ್ಸೂಚನೆ.",
        searchPlaceholder: "ನಗರ ಅಥವಾ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ...",
        detectLocation: "ನನ್ನ ಸ್ಥಳ ಬಳಸಿ",
        currentTemp: "ಪ್ರಸ್ತುತ ತಾಪಮಾನ",
        humidity: "ಆರ್ದ್ರತೆ",
        windSpeed: "ಗಾಳಿಯ ವೇಗ",
        precipProb: "ಮಳೆ ಸಂಭವನೀಯತೆ",
        uvIndex: "ಯುವಿ ಸೂಚ್ಯಂಕ",
        sunrise: "ಸೂರ್ಯೋದಯ",
        sunset: "ಸೂರ್ಯಾಸ್ತ",
        sevenDayForecast: "೭ ದಿನಗಳ ಮುನ್ಸೂಚನೆ",
        weatherHistory: "ಇತ್ತೀಚಿನ ಹುಡುಕಾಟಗಳು",
        clearHistory: "ಇತಿಹಾಸ ಅಳಿಸಿ",
        
        cropsTitle: "ಬೆಳೆ ಸಮಸ್ಯೆ ಮಾರ್ಗದರ್ಶಿ",
        cropsSubtitle: "ಫೋಟೋ ಸೇರಿಸಿ, ನೀವು ಕಾಣುವ ಲಕ್ಷಣಕ್ಕೆ ಹೊಂದುವ ಸಮಸ್ಯೆಯನ್ನು ಆರಿಸಿ, ಚಿಕಿತ್ಸೆ ಮತ್ತು ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು ಪಡೆಯಿರಿ.",
        uploadAreaTitle: "ಬೆಳೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        uploadAreaSub: "ಎಲೆ/ಸಸ್ಯದ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
        btnAnalyze: "ಫೋಟೋ ಪರಿಶೀಲಿಸಿ ಮುಂದುವರಿಯಿರಿ",
        critical: "ಗಂಭೀರ",
        attention: "ಗಮನ ಹರಿಸಿ",
        healthy: "ಆರೋಗ್ಯಕರ",
        cropDisease: "ಆಯ್ಕೆ ಮಾಡಿದ ಸಮಸ್ಯೆ",
        confidence: "ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಸ್ಕೋರ್",
        treatments: "ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳು",
        preventions: "ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳು",
        cropsHistory: "ಉಳಿಸಿದ ಹುಡುಕಾಟಗಳು",
        
        cattleTitle: "ಜಾನುವಾರು ಆರೈಕೆ ಮಾರ್ಗದರ್ಶಿ",
        cattleSubtitle: "ಸಾಮಾನ್ಯ ಆರೈಕೆ ಸಲಹೆಗಳು ಮತ್ತು ಸಾಮಾನ್ಯ ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿಗಾಗಿ ನಿಮ್ಮ ತಳಿಯನ್ನು ಆರಿಸಿ.",
        uploadCattleTitle: "ಜಾನುವಾರು ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        uploadCattleSub: "ಮವೇಶಿಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
        cattleBreed: "ಆಯ್ಕೆ ಮಾಡಿದ ತಳಿ",
        healthStatus: "ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
        vaccineTracker: "ಸಾಮಾನ್ಯ ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿ",
        cattleHistory: "ಉಳಿಸಿದ ಹುಡುಕಾಟಗಳು",
        
        soilTitle: "ಮಣ್ಣಿನ ಪ್ರಕಾರ ಮಾರ್ಗದರ್ಶಿ",
        soilSubtitle: "ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ, ಅದರ ಸಾಮಾನ್ಯ ಪೋಷಕಾಂಶಗಳು ಮತ್ತು ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ನೋಡಿ.",
        uploadSoilTitle: "ಮಣ್ಣಿನ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        uploadSoilSub: "ಮಣ್ಣಿನ ಪ್ರೊಫೈಲ್ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಎಳೆಯಿರಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
        soilType: "ಆಯ್ಕೆ ಮಾಡಿದ ಮಣ್ಣಿನ ಪ್ರಕಾರ",
        soilNutrients: "ಸಾಮಾನ್ಯ ಪೋಷಕಾಂಶಗಳು",
        nitrogen: "ಸಾರಜನಕ (N)",
        phosphorus: "ರಂಜಕ (P)",
        potassium: "ಪೊಟ್ಯಾಸಿಯಮ್ (K)",
        phLevel: "pH ಮಟ್ಟ",
        soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
        optimizedCrops: "ಈ ಮಣ್ಣಿಗೆ ಸೂಕ್ತ ಬೆಳೆಗಳು",
        recommendations: "ಮಣ್ಣಿನ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು",
        soilHistory: "ಉಳಿಸಿದ ಹುಡುಕಾಟಗಳು",
        
        dashTitle: "ನನ್ನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        dashSubtitle: "ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಿದ ಹುಡುಕಾಟಗಳ ಸಾರಾಂಶ.",
        botanicalIndex: "ಬೆಳೆ ಬಟಾನಿಕಲ್ ಸೂಚ್ಯಂಕ",
        cattleHealth: "ಜಾನುವಾರು ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ",
        soilTaxonomy: "ಮಣ್ಣಿನ ವರ್ಗೀಕರಣ ಅನುಪಾತ",
        advisoryBoard: "ಅಧಿಕೃತ ಮೂಲಗಳು",
        researchFeed: "ಸಹಾಯ ಪಡೆಯಿರಿ",
        scansCount: "ಉಳಿಸಿದ ಹುಡುಕಾಟಗಳು",
        activeCattle: "ಜಾನುವಾರು ಹುಡುಕಾಟಗಳು",
        soilAvgPh: "ಸಾಮಾನ್ಯ pH (ಉಳಿಸಿದ ಮಣ್ಣು)",
        
        authTitle: "ಪ್ರವೇಶ ಪೋರ್ಟಲ್",
        authSubtitle: "ಲಾಗಿನ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಫಾರ್ಮ್ ವಿವರಗಳನ್ನು ನೋಂದಾಯಿಸಿ",
        emailLabel: "ಇಮೇಲ್ ವಿಳಾಸ",
        emailPlaceholder: "farmtora@farming.com",
        passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
        passwordPlaceholder: "••••••••",
        btnSignIn: "ಸೈನ್ ಇನ್",
        btnSignUp: "ಖಾತೆಯನ್ನು ನೋಂದಾಯಿಸಿ",
        alreadyAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಸೈನ್ ಇನ್",
        noAccount: "ಖಾತೆ ಇಲ್ಲವೇ? ಫಾರ್ಮ್ ನೋಂದಾಯಿಸಿ",
        signOut: "ಸೈನ್ ಔಟ್",
        welcomeBack: "ಸ್ವಾಗತ",
        activeSession: "ಸಕ್ರಿಯ ರೈತ ಸೆಷನ್",
        
        errInvalidCrop: "ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ: ದಯವಿಟ್ಟು ಬೆಳೆ, ಸಸ್ಯ ಅಥವಾ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        errInvalidCattle: "ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ: ದಯವಿಟ್ಟು ಹಸು ಅಥವಾ ಇತರ ಜಾನುವಾರುಗಳ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        errInvalidSoil: "ಪರಿಶೀಲನೆ ವಿಫಲವಾಗಿದೆ: ದಯವಿಟ್ಟು ಮಣ್ಣು ಅಥವಾ ಕೊಳೆಯನ್ನು ಹೊಂದಿರುವ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        loadingModel: "ಫೋಟೋ ಪರಿಶೀಲಕವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
        scanningImage: "ಫೋಟೋ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
        fetchingWeather: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
        weatherError: "ಈಗ ಹವಾಮಾನ ಮಾಹಿತಿ ಪಡೆಯಲಾಗಲಿಲ್ಲ. ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
        pickMatchTitle: "ನೀವು ಕಾಣುವುದಕ್ಕೆ ಯಾವುದು ಹೊಂದುತ್ತದೆ?",
        pickCropSub: "ನಿಮ್ಮ ಫೋಟೋವನ್ನು ಈ ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ, ಹತ್ತಿರದದನ್ನು ಆರಿಸಿ.",
        pickCattleSub: "ನಿಮ್ಮ ಪ್ರಾಣಿಯ ತಳಿಯನ್ನು ಆರಿಸಿ.",
        pickSoilSub: "ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಹೆಚ್ಚು ಹೋಲುವ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ.",
        referenceNote: "ಇದು ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ರಾಸಾಯನಿಕ ಬಳಸುವ ಮೊದಲು ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿ ಅಥವಾ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರದೊಂದಿಗೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
        vetNote: "ಇದು ಸಾಮಾನ್ಯ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ. ನಿಮ್ಮ ಸ್ಥಳೀಯ ಪಶುವೈದ್ಯರು ನೀಡುವ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಅನುಸರಿಸಿ.",
        soilNote: "ಈ ಮಣ್ಣಿನ ಪ್ರಕಾರದ ಸಾಮಾನ್ಯ ಮೌಲ್ಯಗಳು. ನಿಖರ ಪೋಷಕಾಂಶ ತಿಳಿಯಲು ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್‌ಗಾಗಿ ನಿಮ್ಮ ಹೊಲದ ಮಣ್ಣನ್ನು ಪರೀಕ್ಷಿಸಿ.",
        sampleData: "ಮಾದರಿ ದತ್ತಾಂಶ",
        chooseAnother: "ಬೇರೆ ಆಯ್ಕೆ ಮಾಡಿ",
        noRecords: "ಇನ್ನೂ ಏನೂ ಉಳಿಸಿಲ್ಲ.",
        careTips: "ಆರೈಕೆ ಸಲಹೆಗಳು",
        statusLabel: "ತೀವ್ರತೆ",
        photoTipTitle: "ಫೋಟೋ ಸೇರಿಸಿ (ಐಚ್ಛಿಕ)",
        skipPhoto: "ಫೋಟೋ ಬಿಟ್ಟು ಮಾರ್ಗದರ್ಶಿ ನೋಡಿ",
        marketKpi: "ಮಾದರಿ ಬೆಲೆಗಳು"
    },
    hi: {
        appName: "फार्मटोरा",
        tagline: "मौसम। फसल। पशु। मिट्टी।",
        launchApp: "ऐप लॉन्च करें",
        learnMore: "अधिक जानें",
        homeTitle: "रोज़ की खेती में मदद, <span class=\"accent\">आपकी भाषा में</span>।",
        homeSubtitle: "स्थानीय मौसम देखें, फसल की समस्याएं खोजें, और पशु व मिट्टी की देखभाल करें — हिंदी, कन्नड़ और अंग्रेज़ी में।",
        unifiedIntel: "सब कुछ एक जगह",
        unifiedIntelSub: "रोज़मर्रा के खेती के फ़ैसलों के लिए चार आसान टूल।",
        extremeYield: "रोज़ के खेती के फ़ैसले आसान बनाने के लिए।",
        extremeYieldSub: "स्थानीय मौसम पूर्वानुमान, फसल समस्या गाइड और सहेजे गए रिकॉर्ड किसानों को जल्दी कदम उठाने में मदद करते हैं।",
        edgeFirst: "ऑफ़लाइन भी चलता है",
        edgeFirstSub: "फ़ोन पर इंस्टॉल करें; खोले गए पेज कमज़ोर नेटवर्क पर भी चलते हैं।",
        globalScale: "तीन भाषाएं",
        globalScaleSub: "कभी भी हिंदी, कन्नड़ और अंग्रेज़ी के बीच बदलें।",
        deterministic: "सहेजे गए रिकॉर्ड",
        deterministicSub: "आपकी खोजें इसी डिवाइस पर सहेजी जाती हैं, ताकि आप बाद में देख सकें।",
        ctaTitle: "आज के खेत के हालात से शुरुआत करें।",
        ctaSubtitle: "पहले मौसम पेज खोलें, फिर ज़रूरत के अनुसार फसल, पशु और मिट्टी गाइड इस्तेमाल करें।",
        
        navHome: "मुख्य पृष्ठ",
        navWeather: "मौसम",
        navCrops: "फसलें",
        navCattle: "मवेशी",
        navSoil: "मिट्टी",
        navMarket: "बाज़ार",
        navDashboard: "डैशबोर्ड",
        navAccount: "खाता",
        
        marketTitle: "फ़सल बाज़ार भाव",
        marketSubtitle: "नमूना कृषि मूल्य और रुझान — लाइव बाज़ार दरें नहीं।",
        marketSearchPlaceholder: "फ़सल खोजें (जैसे गेहूं, धान, कपास)...",
        
        weatherTitle: "मौसम का पूर्वानुमान",
        weatherSubtitle: "बुआई, छिड़काव और कटाई की योजना के लिए स्थानीय पूर्वानुमान।",
        searchPlaceholder: "शहर या स्थान खोजें...",
        detectLocation: "मेरा स्थान उपयोग करें",
        currentTemp: "वर्तमान तापमान",
        humidity: "आर्द्रता",
        windSpeed: "हवा की गति",
        precipProb: "वर्षा की संभावना",
        uvIndex: "यूवी सूचकांक",
        sunrise: "सूर्योदय",
        sunset: "सूर्यास्त",
        sevenDayForecast: "७ दिवसीय पूर्वानुमान",
        weatherHistory: "हाल की खोजें",
        clearHistory: "इतिहास साफ़ करें",
        
        cropsTitle: "फसल समस्या गाइड",
        cropsSubtitle: "फ़ोटो जोड़ें, जो दिख रहा है उससे मिलती समस्या चुनें, और इलाज व बचाव के उपाय पाएं।",
        uploadAreaTitle: "फसल की छवि अपलोड करें",
        uploadAreaSub: "पत्ती/पौधे की फोटो अपलोड करने के लिए खींचें या क्लिक करें",
        btnAnalyze: "फ़ोटो जांचें और आगे बढ़ें",
        critical: "गंभीर",
        attention: "ध्यान दें",
        healthy: "स्वस्थ",
        cropDisease: "चुनी गई समस्या",
        confidence: "विश्वास स्कोर",
        treatments: "उपचार की सिफारिशें",
        preventions: "बचाव के उपाय",
        cropsHistory: "सहेजी गई खोजें",
        
        cattleTitle: "पशु देखभाल गाइड",
        cattleSubtitle: "सामान्य देखभाल सुझावों और सामान्य टीकाकरण अनुसूची के लिए अपनी नस्ल चुनें।",
        uploadCattleTitle: "मवेशी की छवि अपलोड करें",
        uploadCattleSub: "मवेशी की फोटो अपलोड करने के लिए खींचें या क्लिक करें",
        cattleBreed: "चुनी गई नस्ल",
        healthStatus: "स्वास्थ्य स्थिति",
        vaccineTracker: "सामान्य टीकाकरण अनुसूची",
        cattleHistory: "सहेजी गई खोजें",
        
        soilTitle: "मिट्टी प्रकार गाइड",
        soilSubtitle: "अपनी मिट्टी का प्रकार चुनें और उसके सामान्य पोषक तत्व व उपयुक्त फसलें देखें।",
        uploadSoilTitle: "मिट्टी की छवि अपलोड करें",
        uploadSoilSub: "मिट्टी प्रोफ़ाइल की फोटो अपलोड करने के लिए खींचें या क्लिक करें",
        soilType: "चुना गया मिट्टी का प्रकार",
        soilNutrients: "सामान्य पोषक तत्व",
        nitrogen: "नाइट्रोजन (N)",
        phosphorus: "फास्फोरस (P)",
        potassium: "पोटेशियम (K)",
        phLevel: "pH स्तर",
        soilMoisture: "मिट्टी की नमी",
        optimizedCrops: "इस मिट्टी के लिए उपयुक्त फसलें",
        recommendations: "मिट्टी उपचार सिफारिशें",
        soilHistory: "सहेजी गई खोजें",
        
        dashTitle: "मेरा डैशबोर्ड",
        dashSubtitle: "इस डिवाइस पर सहेजी गई खोजों का सारांश।",
        botanicalIndex: "फसल वानस्पतिक सूचकांक",
        cattleHealth: "मवेशी स्वास्थ्य सूचकांक",
        soilTaxonomy: "मिट्टी वर्गीकरण अनुपात",
        advisoryBoard: "आधिकारिक स्रोत",
        researchFeed: "मदद पाएं",
        scansCount: "सहेजी गई खोजें",
        activeCattle: "पशु खोजें",
        soilAvgPh: "सामान्य pH (सहेजी गई मिट्टी)",
        
        authTitle: "प्रवेश द्वार",
        authSubtitle: "लॉग इन करें या अपने खेत का विवरण पंजीकृत करें",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "farmtora@farming.com",
        passwordLabel: "पासवर्ड",
        passwordPlaceholder: "••••••••",
        btnSignIn: "साइन इन",
        btnSignUp: "खाता पंजीकृत करें",
        alreadyAccount: "पहले से ही एक खाता है? साइन इन",
        noAccount: "खाता नहीं है? खेत पंजीकृत करें",
        signOut: "साइन आउट",
        welcomeBack: "आपका स्वागत है",
        activeSession: "सक्रिय किसान सत्र",
        
        errInvalidCrop: "सत्यापन विफल: कृपया फसल, पौधे या पत्ती की तस्वीर अपलोड करें।",
        errInvalidCattle: "सत्यापन विफल: कृपया गाय या अन्य मवेशियों की तस्वीर अपलोड करें।",
        errInvalidSoil: "सत्यापन विफल: कृपया मिट्टी या गंदगी वाली तस्वीर अपलोड करें।",
        loadingModel: "फ़ोटो जांचने वाला टूल लोड हो रहा है...",
        scanningImage: "फ़ोटो जांची जा रही है...",
        fetchingWeather: "मौसम की जानकारी प्राप्त की जा रही है...",
        weatherError: "अभी मौसम की जानकारी नहीं मिल सकी। कनेक्शन जांचें और फिर कोशिश करें।",
        pickMatchTitle: "आपको जो दिख रहा है, उससे कौन-सा मेल खाता है?",
        pickCropSub: "अपनी फ़ोटो की तुलना इन आम समस्याओं से करें और सबसे मिलती-जुलती चुनें।",
        pickCattleSub: "अपने पशु की नस्ल चुनें।",
        pickSoilSub: "अपनी मिट्टी से सबसे ज़्यादा मिलता-जुलता प्रकार चुनें।",
        referenceNote: "यह सामान्य मार्गदर्शन है, निदान नहीं। रसायन इस्तेमाल करने से पहले अपने स्थानीय कृषि अधिकारी या कृषि विज्ञान केंद्र से पुष्टि करें।",
        vetNote: "यह केवल सामान्य मार्गदर्शन है। अपने स्थानीय पशु चिकित्सक द्वारा बताई गई अनुसूची का पालन करें।",
        soilNote: "यह इस मिट्टी के प्रकार के सामान्य मान हैं। सही पोषक तत्व जानने के लिए मृदा स्वास्थ्य कार्ड हेतु अपने खेत की मिट्टी की जांच कराएं।",
        sampleData: "नमूना डेटा",
        chooseAnother: "दूसरा विकल्प चुनें",
        noRecords: "अभी तक कुछ सहेजा नहीं गया।",
        careTips: "देखभाल सुझाव",
        statusLabel: "गंभीरता",
        photoTipTitle: "फ़ोटो जोड़ें (वैकल्पिक)",
        skipPhoto: "फ़ोटो छोड़ें और गाइड देखें",
        marketKpi: "नमूना मूल्य"
    }
};

// 2. Mock Diagnoses Catalogs with Translation Keys
const CROP_CATALOG = {
    tomato_late_blight: {
        title: { en: "Tomato - Late Blight", kn: "ಟೊಮೆಟೊ - ಲೇಟ್ ಬ್ಲೈಟ್", hi: "टमाटर - लेट ब्लाइट" },
        severity: "critical",
        treatments: {
            en: ["Apply copper fungicides immediately", "Prune lower infected canopy leaves", "Avoid overhead irrigation systems"],
            kn: ["ತಕ್ಷಣ ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕಗಳನ್ನು ಬಳಸಿ", "ಸೋಂಕಿತ ಕೆಳಗಿನ ಎಲೆಗಳ ಕೊಂಬೆಗಳನ್ನು ಕತ್ತರಿಸಿ", "ಮೇಲಿಂದ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ"],
            hi: ["तुरंत तांबे के कवकनाशी का छिड़काव करें", "संक्रमित निचली शाखाओं की छंटाई करें", "ऊपर से सिंचाई करने से बचें"]
        },
        preventions: {
            en: ["Maintain 3-year crop rotations", "Plant certified blight-resistant seeds", "Keep field tools disinfected"],
            kn: ["3 ವರ್ಷಕ್ಕೊಮ್ಮೆ ಬೆಳೆ ಸರದಿಯನ್ನು ಅನುಸರಿಸಿ", "ರೋಗ ನಿರೋಧಕ ಬೀಜಗಳನ್ನು ಬಿತ್ತನೆ ಮಾಡಿ", "ಕೃಷಿ ಪರಿಕರಗಳನ್ನು ಕ್ರಿಮಿನಾಶಕಗೊಳಿಸಿ"],
            hi: ["3 साल में फसल चक्र अपनाएं", "रोग-प्रतिरोधी बीजों का चयन करें", "कृषि उपकरणों को कीटाणुरहित रखें"]
        }
    },
    rice_blast: {
        title: { en: "Rice - Blast Disease", kn: "ಭತ್ತ - ಬೆಂಕಿ ರೋಗ", hi: "धान - ब्लास्ट रोग" },
        severity: "critical",
        treatments: {
            en: ["Spray Tricyclazole fungicide as recommended", "Reduce chemical nitrogen fertilizers", "Regulate water heights in field paddies"],
            kn: ["ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ", "ಸಾರಜನಕ ಗೊಬ್ಬರದ ಬಳಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ", "ಗದ್ದೆಗಳಲ್ಲಿ ನೀರಿನ ಮಟ್ಟ ನಿಯಂತ್ರಿಸಿ"],
            hi: ["ट्राइसाइक्लाजोल कवकनाशी का छिड़काव करें", "नाइट्रोजन युक्त उर्वरक का प्रयोग कम करें", "धान के खेतों में पानी का स्तर नियंत्रित रखें"]
        },
        preventions: {
            en: ["Select blast-resistant crop varieties", "Apply systemic seed treatments before sowing", "Clear infected crop residues completely"],
            kn: ["ಬೆಂಕಿ ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ", "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜೋಪಚಾರ ಮಾಡಿ", "ಬೆಳೆ ಕಟಾವಿನ ನಂತರ ತ್ಯಾಜ್ಯ ಮುಕ್ತಗೊಳಿಸಿ"],
            hi: ["ब्लास्ट-प्रतिरोधी किस्मों का चयन करें", "बुआई से पहले प्रणालीगत बीज उपचार अपनाएं", "संक्रमित फसल अवशेषों को पूरी तरह साफ करें"]
        }
    },
    corn_rust: {
        title: { en: "Corn - Common Rust", kn: "ಮೆಕ್ಕೆಜೋಳ - ಮುರಗಿ ರೋಗ", hi: "मक्का - आम जंग रोग" },
        severity: "attention",
        treatments: {
            en: ["Apply foliar fungicide at early infection", "Remove host weeds and grass borders"],
            kn: ["ರೋಗದ ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಎಲೆಗಳಿಗೆ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ", "ಹೊಲದ ಸುತ್ತಲಿನ ಕಳೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ"],
            hi: ["प्रारंभिक अवस्था में पर्ण कवकनाशी का प्रयोग करें", "मेड़ों के आसपास के खरपतवार नष्ट करें"]
        },
        preventions: {
            en: ["Plant high-yield rust-resistant hybrids", "Ensure optimal plant row spaces", "Incorporate organic matter during autumn tilling"],
            kn: ["ರೋಗ ನಿರೋಧಕ ಹೈಬ್ರಿಡ್ ತಳಿಗಳನ್ನು ಆರಿಸಿ", "ಸಸ್ಯಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಪಾಡಿ", "ಉಳುಮೆಯ ಸಮಯದಲ್ಲಿ ಸಾವಯವ ಗೊಬ್ಬರ ಸೇರಿಸಿ"],
            hi: ["जंग-प्रतिरोधी संकर किस्मों का रोपण करें", "पौधों के बीच इष्टतम दूरी रखें", "जुताई के समय जैविक खाद मिलाएं"]
        }
    },
    healthy_leaf: {
        title: { en: "Healthy Foliage Structure", kn: "ಆರೋಗ್ಯಕರ ಎಲೆ ರಚನೆ", hi: "स्वस्थ पत्ती की संरचना" },
        severity: "healthy",
        treatments: {
            en: ["No chemical treatments needed", "Maintain active hydration schedules"],
            kn: ["ಯಾವುದೇ ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆಗಳ ಅಗತ್ಯವಿಲ್ಲ", "ನಿಯಮಿತ ನೀರಾವರಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ"],
            hi: ["किसी रासायनिक उपचार की आवश्यकता नहीं है", "नियमित सिंचाई व्यवस्था बनाए रखें"]
        },
        preventions: {
            en: ["Conduct monthly soil matrix checkups", "Perform routine crop pathogen inspection"],
            kn: ["ತಿಂಗಳಿಗೊಮ್ಮೆ ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ ಪರಿಶೀಲಿಸಿ", "ನಿಯಮಿತ ರೋಗ ಲಕ್ಷಣಗಳ ಪರಿಶೀಲನೆ ನಡೆಸಿ"],
            hi: ["मासिक मिट्टी परीक्षण करवाएं", "फसल रोगों का नियमित निरीक्षण करें"]
        }
    }
};

const CATTLE_CATALOG = {
    jersey_cow: {
        breed: {"en": "Jersey Breed", "kn": "ಜರ್ಸಿ ತಳಿ", "hi": "जर्सी नस्ल"},
        severity: "healthy",
        vaccines: {"en": ["FMD (foot-and-mouth): every 6 months", "HS and Black Quarter: once a year, before the monsoon", "Brucellosis: once, for female calves aged 4–8 months"], "kn": ["ಕಾಲು ಬಾಯಿ ಜ್ವರ (FMD): ಪ್ರತಿ 6 ತಿಂಗಳಿಗೊಮ್ಮೆ", "ಗಳಲೆ ರೋಗ (HS) ಮತ್ತು ಚಪ್ಪೆ ರೋಗ: ವರ್ಷಕ್ಕೊಮ್ಮೆ, ಮುಂಗಾರಿನ ಮೊದಲು", "ಬ್ರೂಸೆಲೋಸಿಸ್: 4–8 ತಿಂಗಳ ಹೆಣ್ಣು ಕರುಗಳಿಗೆ ಒಮ್ಮೆ"], "hi": ["खुरपका-मुंहपका (FMD): हर 6 महीने", "गलघोंटू (HS) और लंगड़ी बुखार: साल में एक बार, मानसून से पहले", "ब्रूसेलोसिस: 4–8 महीने की मादा बछियों को एक बार"]},
        treatments: {"en": ["Sensitive to heat: give shade, fans or water sprays in summer", "Provide about 40 litres of clean drinking water a day", "Feed balanced green and dry fodder with mineral mixture"], "kn": ["ಶಾಖಕ್ಕೆ ಸೂಕ್ಷ್ಮ: ಬೇಸಿಗೆಯಲ್ಲಿ ನೆರಳು, ಫ್ಯಾನ್ ಅಥವಾ ನೀರಿನ ಸಿಂಪಡಣೆ ಒದಗಿಸಿ", "ದಿನಕ್ಕೆ ಸುಮಾರು 40 ಲೀಟರ್ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರು ಒದಗಿಸಿ", "ಖನಿಜ ಮಿಶ್ರಣದೊಂದಿಗೆ ಸಮತೋಲಿತ ಹಸಿರು ಮತ್ತು ಒಣ ಮೇವು ಕೊಡಿ"], "hi": ["गर्मी के प्रति संवेदनशील: गर्मियों में छाया, पंखा या पानी का छिड़काव दें", "प्रतिदिन लगभग 40 लीटर स्वच्छ पेयजल दें", "खनिज मिश्रण के साथ संतुलित हरा और सूखा चारा दें"]}
    },
    sahiwal_cow: {
        breed: {"en": "Sahiwal Breed", "kn": "ಸಾಹಿವಾಲ್ ತಳಿ", "hi": "साहीवाल नस्ल"},
        severity: "healthy",
        vaccines: {"en": ["FMD (foot-and-mouth): every 6 months", "HS and Black Quarter: once a year, before the monsoon", "Brucellosis: once, for female calves aged 4–8 months"], "kn": ["ಕಾಲು ಬಾಯಿ ಜ್ವರ (FMD): ಪ್ರತಿ 6 ತಿಂಗಳಿಗೊಮ್ಮೆ", "ಗಳಲೆ ರೋಗ (HS) ಮತ್ತು ಚಪ್ಪೆ ರೋಗ: ವರ್ಷಕ್ಕೊಮ್ಮೆ, ಮುಂಗಾರಿನ ಮೊದಲು", "ಬ್ರೂಸೆಲೋಸಿಸ್: 4–8 ತಿಂಗಳ ಹೆಣ್ಣು ಕರುಗಳಿಗೆ ಒಮ್ಮೆ"], "hi": ["खुरपका-मुंहपका (FMD): हर 6 महीने", "गलघोंटू (HS) और लंगड़ी बुखार: साल में एक बार, मानसून से पहले", "ब्रूसेलोसिस: 4–8 महीने की मादा बछियों को एक बार"]},
        treatments: {"en": ["Naturally heat-tolerant, but still give shade in peak summer", "Keep the shed and bedding dry to prevent udder infections (mastitis)", "Feed balanced green and dry fodder with clean water"], "kn": ["ಸಹಜವಾಗಿ ಶಾಖ ಸಹಿಷ್ಣು, ಆದರೂ ಬೇಸಿಗೆಯಲ್ಲಿ ನೆರಳು ಒದಗಿಸಿ", "ಕೆಚ್ಚಲು ಬಾವು ತಡೆಯಲು ಕೊಟ್ಟಿಗೆ ಮತ್ತು ಹಾಸನ್ನು ಒಣದಾಗಿರಿಸಿ", "ಶುದ್ಧ ನೀರಿನೊಂದಿಗೆ ಸಮತೋಲಿತ ಹಸಿರು ಮತ್ತು ಒಣ ಮೇವು ಕೊಡಿ"], "hi": ["स्वाभाविक रूप से गर्मी सहने वाली, फिर भी तेज़ गर्मी में छाया दें", "थनैला रोग से बचाव के लिए बाड़ा और बिछावन सूखा रखें", "साफ़ पानी के साथ संतुलित हरा और सूखा चारा दें"]}
    },
    gir_cow: {
        breed: {"en": "Gir Breed", "kn": "ಗೀರ್ ತಳಿ", "hi": "गीर नस्ल"},
        severity: "healthy",
        vaccines: {"en": ["FMD (foot-and-mouth): every 6 months", "HS and Black Quarter: once a year, before the monsoon", "Brucellosis: once, for female calves aged 4–8 months"], "kn": ["ಕಾಲು ಬಾಯಿ ಜ್ವರ (FMD): ಪ್ರತಿ 6 ತಿಂಗಳಿಗೊಮ್ಮೆ", "ಗಳಲೆ ರೋಗ (HS) ಮತ್ತು ಚಪ್ಪೆ ರೋಗ: ವರ್ಷಕ್ಕೊಮ್ಮೆ, ಮುಂಗಾರಿನ ಮೊದಲು", "ಬ್ರೂಸೆಲೋಸಿಸ್: 4–8 ತಿಂಗಳ ಹೆಣ್ಣು ಕರುಗಳಿಗೆ ಒಮ್ಮೆ"], "hi": ["खुरपका-मुंहपका (FMD): हर 6 महीने", "गलघोंटू (HS) और लंगड़ी बुखार: साल में एक बार, मानसून से पहले", "ब्रूसेलोसिस: 4–8 महीने की मादा बछियों को एक बार"]},
        treatments: {"en": ["Hardy breed suited to hot regions", "Check hooves and ticks regularly", "Maintain balanced dry and green fodder"], "kn": ["ಬಿಸಿ ಪ್ರದೇಶಗಳಿಗೆ ಸೂಕ್ತವಾದ ಗಟ್ಟಿಮುಟ್ಟಾದ ತಳಿ", "ಗೊರಸು ಮತ್ತು ಉಣ್ಣೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ", "ಹಸಿರು ಮತ್ತು ಒಣ ಮೇವಿನ ಸಮತೋಲನ ಕಾಪಾಡಿ"], "hi": ["गर्म क्षेत्रों के लिए उपयुक्त मज़बूत नस्ल", "खुर और किलनी (टिक) की नियमित जांच करें", "हरे और सूखे चारे का संतुलित अनुपात बनाए रखें"]}
    }
};

const SOIL_CATALOG = {
    loamy_soil: {
        soil: { en: "Loamy Soil Structure", kn: "ದುಬ್ಬಣ್ಣು ಮಣ್ಣು (ಲೋಮ್)", hi: "दूमट मिट्टी" },
        crops: { en: "Wheat, Sugarcane, Cotton, Soybeans", kn: "ಗೋಧಿ, ಕಬ್ಬು, ಹತ್ತಿ, ಸೋಯಾಬೀನ್", hi: "गेहूं, गन्ना, कपास, सोयाबीन" },
        nitrogen: "High",
        phosphorus: "Medium",
        potassium: "Medium",
        ph: 6.5,
        moisture: "65%",
        recommendations: {
            en: ["Add organic leaf mold compost", "Rotate crops with clover or alfalfa legumes", "Keep soil moisture aerated"],
            kn: ["ಸಾವಯವ ಎಲೆ ಗೊಬ್ಬರವನ್ನು ಸೇರಿಸಿ", "ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಸರದಿ ಮಾಡಿ", "ಮಣ್ಣಿನಲ್ಲಿ ಸೂಕ್ತ ತೇವಾಂಶ ಕಾಪಾಡಿ"],
            hi: ["जैविक पत्ती खाद का उपयोग करें", "तिपतिया घास या अल्फाल्फा के साथ फसल चक्र अपनाएं", "मिट्टी में हवा का प्रवाह बनाए रखें"]
        }
    },
    sandy_soil: {
        soil: { en: "Sandy Soil Structure", kn: "ಮರಳು ಮಣ್ಣು", hi: "बलुई मिट्टी" },
        crops: { en: "Groundnut, Potatoes, Watermelon, Millets", kn: "ಕಡಲೆಕಾಯಿ, ಆಲೂಗಡ್ಡೆ, ಕಲ್ಲಂಗಡಿ, ರಾಗಿ", hi: "मूंगफली, आलू, तरबूज, बाजरा" },
        nitrogen: "Low",
        phosphorus: "Low",
        potassium: "Low",
        ph: 6.0,
        moisture: "30%",
        recommendations: {
            en: ["Incorporate peat moss or compost", "Apply water-soluble fertilizers in split doses", "Utilize mulching to conserve moisture"],
            kn: ["ಹ್ಯೂಮಸ್ ಅಥವಾ ಕಾಂಪೋಸ್ಟ್ ಸೇರಿಸಿ", "ಕಡಿಮೆ ಪ್ರಮಾಣದಲ್ಲಿ ನಿಯಮಿತವಾಗಿ ದ್ರವ ಗೊಬ್ಬರ ಕೊಡಿ", "ತೇವಾಂಶ ಉಳಿಸಲು ಒಣ ಕಸ ಹೊದಿಕೆ (ಮಲ್ಚಿಂಗ್) ಮಾಡಿ"],
            hi: ["पीट मॉस या जैविक खाद मिलाएं", "घुलनशील उर्वरक का प्रयोग विभाजित खुराकों में करें", "नमी बनाए रखने के लिए मल्चिंग विधि अपनाएं"]
        }
    },
    clay_soil: {
        soil: { en: "Clay Soil Structure", kn: "ಜೇಡಿ ಮಣ್ಣು", hi: "चिकनी मिट्टी" },
        crops: { en: "Rice, Sorghum, Broccoli, Peas", kn: "ಭತ್ತ, ಜೋಳ, ಬ್ರೊಕೋಲಿ, ಬಟಾಣಿ", hi: "धान, ज्वार, ब्रोकली, मटर" },
        nitrogen: "Medium",
        phosphorus: "High",
        potassium: "High",
        ph: 7.2,
        moisture: "80%",
        recommendations: {
            en: ["Add gypsum to break heavy clay structures", "Construct gravel drainage to prevent waterlogging", "Avoid tilling soil when wet"],
            kn: ["ಜೇಡಿ ಮಣ್ಣಿನ ಕಣಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಲು ಜಿಪ್ಸಮ್ ಸೇರಿಸಿ", "ನೀರು ನಿಲ್ಲದಂತೆ ಸಣ್ಣ ಜಲ್ಲಿ ಚರಂಡಿ ನಿರ್ಮಿಸಿ", "ಮಣ್ಣು ತೇವವಾಗಿದ್ದಾಗ ಉಳುಮೆ ಮಾಡಬೇಡಿ"],
            hi: ["मिट्टी को ढीला करने के लिए जिप्सम मिलाएं", "जलभराव रोकने के लिए जल निकासी नाली बनाएं", "मिट्टी गीली होने पर जुताई से बचें"]
        }
    }
};

// 3. IndexedDB Client Wrapper
const DB_NAME = "FarmtoraDB";
const DB_VERSION = 1;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("weather")) {
                db.createObjectStore("weather", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("crops")) {
                db.createObjectStore("crops", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("cattle")) {
                db.createObjectStore("cattle", { keyPath: "id", autoIncrement: true });
            }
            if (!db.objectStoreNames.contains("soil")) {
                db.createObjectStore("soil", { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

function addToStore(storeName, data) {
    return initDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const request = store.add(data);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    });
}

function getAllFromStore(storeName) {
    return initDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => reject(e.target.error);
        });
    });
}

function clearStore(storeName) {
    return initDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    });
}

// 4. Farmtora Main App Class
class FarmtoraApp {
    constructor() {
        this.currentPage = 'home';
        this.currentLang = localStorage.getItem('farmtora_locale') || 'en';
        
        // Active scan memory to preserve views during language shifts
        this.currentCropScan = null;
        this.currentCattleScan = null;
        this.currentSoilScan = null;
        this.currentWeatherInfo = null;

        this.init();
    }

    async init() {
        this.setupLanguage();
        this.setupBackgroundAnimations();
        this.setupEventListeners();
        
        // Hash routing entry
        const startHash = window.location.hash.substring(1) || 'home';
        this.showPage(startHash);
    }

    setupLanguage() {
        // Toggle language button classes in navbar lang selector
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    t(key) {
        return TRANSLATIONS[this.currentLang][key] || TRANSLATIONS['en'][key] || key;
    }

    changeLanguage(lang) {
        if (!TRANSLATIONS[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('farmtora_locale', lang);
        
        // Update language button elements UI
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Re-render the current page and re-attach its event handlers
        const scrollY = window.scrollY;
        this.showPage(this.currentPage);
        window.scrollTo(0, scrollY);
    }

    setupEventListeners() {
        // Desktop Navbar & Account Profile Trigger clicks
        document.querySelectorAll('.nav-item, .mobile-nav-item, .brand-link, .btn-account').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetHref = link.getAttribute('href');
                if (targetHref && targetHref.startsWith('#')) {
                    // Letting browser trigger popstate/hashchange natively
                    const page = targetHref.substring(1) || 'home';
                    this.showPage(page);
                }
            });
        });

        // Global Lang switch selectors
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeLanguage(btn.dataset.lang);
            });
        });

        // Hash change router hook
        window.addEventListener('hashchange', () => {
            const page = window.location.hash.substring(1) || 'home';
            if (this.currentPage !== page) {
                this.showPage(page);
            }
        });
    }

    updateActiveNav(pageName) {
        // Toggle active navigation highlighting across screens
        document.querySelectorAll('.nav-item, .btn-account[data-page]').forEach(link => {
            const linkPage = link.dataset.page || (link.getAttribute('href') || '').substring(1);
            link.classList.toggle('active', linkPage === pageName);
        });
        document.querySelectorAll('.mobile-nav-item').forEach(link => {
            const linkPage = link.dataset.page || (link.getAttribute('href') || '').substring(1);
            link.classList.toggle('active', linkPage === pageName);
        });
    }

    showPage(pageName) {
        const validPages = ['home', 'weather', 'crops', 'cattle', 'soil', 'market', 'dashboard', 'auth'];
        if (!validPages.includes(pageName)) {
            pageName = 'home';
        }
        
        this.currentPage = pageName;
        window.location.hash = pageName;
        this.updateActiveNav(pageName);
        this.renderCurrentPage();
        
        // Post mount triggers
        lucide.createIcons();
        window.scrollTo(0, 0);

        if (pageName === 'weather') {
            this.initWeatherEvents();
        } else if (pageName === 'crops') {
            this.initScanEvents('crops');
            this.initUploadAreaEnhancements();
        } else if (pageName === 'cattle') {
            this.initScanEvents('cattle');
            this.initUploadAreaEnhancements();
        } else if (pageName === 'soil') {
            this.initScanEvents('soil');
            this.initUploadAreaEnhancements();
        } else if (pageName === 'market') {
            this.initMarketEvents();
        } else if (pageName === 'dashboard') {
            this.initDashboardCharts();
        } else if (pageName === 'auth') {
            this.initAuthEvents();
            this.initUploadAreaEnhancements();
        }
    }

    renderCurrentPage() {
        const app = document.getElementById('app');
        if (!app) return;
        
        switch(this.currentPage) {
            case 'home':
                app.innerHTML = this.getHomeTemplate();
                break;
            case 'weather':
                app.innerHTML = this.getWeatherTemplate();
                break;
            case 'crops':
                app.innerHTML = this.getScanTemplate('crops');
                break;
            case 'cattle':
                app.innerHTML = this.getScanTemplate('cattle');
                break;
            case 'soil':
                app.innerHTML = this.getScanTemplate('soil');
                break;
            case 'market':
                app.innerHTML = this.getMarketTemplate();
                break;
            case 'dashboard':
                app.innerHTML = this.getDashboardTemplate();
                break;
            case 'auth':
                app.innerHTML = this.getAuthTemplate();
                break;
            default:
                app.innerHTML = this.getHomeTemplate();
        }
    }

    // 5. HTML Templates Render Functions
    getHomeTemplate() {
        return `
            <div class="page animate-fade-in">
                <!-- Moving Blur blobs -->
                <div class="bg-blob animate-blob" style="top: -60px; left: -60px; width: 600px; height: 600px; background: rgba(52, 211, 153, 0.07);"></div>
                <div class="bg-blob animate-blob animation-delay-2000" style="top: 150px; right: -40px; width: 500px; height: 500px; background: rgba(34, 211, 238, 0.05);"></div>
                <div class="bg-blob animate-blob animation-delay-4000" style="bottom: -100px; left: 40%; width: 700px; height: 700px; background: rgba(167, 139, 250, 0.05);"></div>

                <!-- Hero -->
                <section class="hero-section">
                    <video class="hero-video" src="public/crops-video.mp4" autoplay loop muted></video>
                    
                    <div class="badge-zap glass">
                        <i data-lucide="zap"></i><span>${this.t('tagline')}</span>
                    </div>
                    <h1 class="hero-title">${this.t('homeTitle')}</h1>
                    <p class="hero-subtitle">${this.t('homeSubtitle')}</p>
                    
                    <div class="hero-buttons">
                        <a href="#weather" class="btn btn-primary">
                            <i data-lucide="play-circle"></i>${this.t('launchApp')}
                        </a>
                        <a href="#dashboard" class="btn btn-outline">
                            <i data-lucide="line-chart"></i>${this.t('navDashboard')}
                        </a>
                    </div>
                </section>

                <!-- Unified Intelligence Features -->
                <section class="features-container">
                    <span class="section-tag">${this.t('unifiedIntel')}</span>
                    <h2 class="section-heading">${this.t('unifiedIntelSub')}</h2>
                    
                    <div class="grid grid-cols-2">
                        <!-- Card 1: Weather -->
                        <div class="feature-box glass from-farm-sky" onclick="window.location.hash='weather'">
                            <div class="feature-icon-container" style="background: rgba(6, 182, 212, 0.1); color: var(--secondary);">
                                <i data-lucide="cloud-sun" style="width: 2rem; height: 2rem;"></i>
                            </div>
                            <div>
                                <h3>${this.t('navWeather')}</h3>
                                <p>${this.t('weatherSubtitle')}</p>
                                <span class="feature-link">${this.t('navWeather')} <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <!-- Card 2: Crops -->
                        <div class="feature-box glass from-farm-emerald" onclick="window.location.hash='crops'">
                            <div class="feature-icon-container" style="background: rgba(16, 185, 129, 0.1); color: var(--primary);">
                                <i data-lucide="leaf" style="width: 2rem; height: 2rem;"></i>
                            </div>
                            <div>
                                <h3>${this.t('navCrops')}</h3>
                                <p>${this.t('cropsSubtitle')}</p>
                                <span class="feature-link">${this.t('navCrops')} <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <!-- Card 3: Cattle -->
                        <div class="feature-box glass from-farm-rose" onclick="window.location.hash='cattle'">
                            <div class="feature-icon-container" style="background: rgba(244, 63, 94, 0.1); color: var(--farm-rose);">
                                <i data-lucide="paw-print" style="width: 2rem; height: 2rem;"></i>
                            </div>
                            <div>
                                <h3>${this.t('navCattle')}</h3>
                                <p>${this.t('cattleSubtitle')}</p>
                                <span class="feature-link">${this.t('navCattle')} <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>

                        <!-- Card 4: Soil -->
                        <div class="feature-box glass from-farm-soil" onclick="window.location.hash='soil'">
                            <div class="feature-icon-container" style="background: rgba(120, 53, 15, 0.1); color: var(--farm-soil);">
                                <i data-lucide="layers" style="width: 2rem; height: 2rem;"></i>
                            </div>
                            <div>
                                <h3>${this.t('navSoil')}</h3>
                                <p>${this.t('soilSubtitle')}</p>
                                <span class="feature-link">${this.t('navSoil')} <i data-lucide="arrow-right"></i></span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Extreme Yield section (Why Choose) -->
                <section class="why-choose-section">
                    <div class="grid grid-cols-2" style="align-items: center;">
                        <div>
                            <span class="section-tag">${this.t('appName')}</span>
                            <h2 class="section-heading" style="margin-bottom: 2rem;">${this.t('extremeYield')}</h2>
                            <p style="color: var(--muted-foreground); margin-bottom: 3rem;">${this.t('extremeYieldSub')}</p>
                            
                            <div class="why-items">
                                <div class="why-item glass">
                                    <div class="why-icon-box" style="color: var(--primary);">
                                        <i data-lucide="cpu"></i>
                                    </div>
                                    <div class="why-text">
                                        <h4>${this.t('edgeFirst')}</h4>
                                        <p>${this.t('edgeFirstSub')}</p>
                                    </div>
                                </div>
                                <div class="why-item glass">
                                    <div class="why-icon-box" style="color: var(--secondary);">
                                        <i data-lucide="globe"></i>
                                    </div>
                                    <div class="why-text">
                                        <h4>${this.t('globalScale')}</h4>
                                        <p>${this.t('globalScaleSub')}</p>
                                    </div>
                                </div>
                                <div class="why-item glass">
                                    <div class="why-icon-box" style="color: var(--accent);">
                                        <i data-lucide="shield-check"></i>
                                    </div>
                                    <div class="why-text">
                                        <h4>${this.t('deterministic')}</h4>
                                        <p>${this.t('deterministicSub')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Video Card side -->
                        <div class="why-video-card glass">
                            <video src="public/crops-video.mp4" autoplay loop muted></video>
                            <div class="video-play-box glass">
                                <div class="video-play-icon">
                                    <i data-lucide="video"></i>
                                </div>
                                <h3>${this.t('globalScale')}</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- CTA -->
                <section class="cta-container">
                    <div class="cta-box glass">
                        <div class="bg-blob animate-blob" style="top:-30%; left:-20%; width: 500px; height: 500px; background: rgba(16, 185, 129, 0.15);"></div>
                        <h2 class="cta-title">${this.t('ctaTitle')}</h2>
                        <p class="cta-subtitle">${this.t('ctaSubtitle')}</p>
                        <a href="#weather" class="btn btn-primary" style="padding: 1.5rem 3rem;">
                            <i data-lucide="zap"></i>${this.t('launchApp')}
                        </a>
                    </div>
                </section>
            </div>
        `;
    }

    getWeatherTemplate() {
        return `
            <div class="page animate-fade-in">
                <!-- Header -->
                <div class="subpage-header">
                    <div class="subpage-header-top">
                        <h1 class="page-title">${this.t('weatherTitle')}</h1>
                        
                        <!-- Search Container -->
                        <div class="search-node-container">
                            <i data-lucide="search"></i>
                            <input type="text" id="weatherSearchInput" class="input-node" placeholder="${this.t('searchPlaceholder')}">
                            <div id="weatherSearchResults" class="search-results-dropdown glass hidden"></div>
                        </div>
                        
                        <!-- Geo Button -->
                        <button id="btnDetectLocation" class="btn btn-outline">
                            <i data-lucide="map-pin"></i>${this.t('detectLocation')}
                        </button>
                    </div>
                    <p class="page-subtitle">${this.t('weatherSubtitle')}</p>
                    <p id="weatherError" class="guidance-note hidden" role="alert"><i data-lucide="alert-triangle"></i><span>${this.t('weatherError')}</span></p>
                </div>

                <!-- Weather Card Panel -->
                <div id="weatherHeroCard" class="weather-hero-card glass hidden">
                    <div class="weather-hero-layout">
                        <!-- Primary Details -->
                        <div class="weather-primary-info">
                            <div class="weather-loc-box">
                                <i data-lucide="map-pin"></i>
                                <span id="weatherLocName">-</span>
                            </div>
                            <div class="weather-temp-display">
                                <span id="weatherTemp">-</span>
                                <span class="weather-temp-degree">°C</span>
                            </div>
                            <div class="weather-cond-text" id="weatherCondition">-</div>
                        </div>
                        
                        <!-- Metrics Grid -->
                        <div class="weather-metrics-grid">
                            <div class="weather-metric-item glass">
                                <i data-lucide="droplets" style="color: var(--secondary);"></i>
                                <p class="weather-metric-label">${this.t('humidity')}</p>
                                <h4 class="weather-metric-value" id="weatherHumidity">-</h4>
                            </div>
                            <div class="weather-metric-item glass">
                                <i data-lucide="wind" style="color: var(--primary);"></i>
                                <p class="weather-metric-label">${this.t('windSpeed')}</p>
                                <h4 class="weather-metric-value" id="weatherWind">-</h4>
                            </div>
                            <div class="weather-metric-item glass">
                                <i data-lucide="cloud-rain" style="color: var(--accent);"></i>
                                <p class="weather-metric-label">${this.t('precipProb')}</p>
                                <h4 class="weather-metric-value" id="weatherPrecip">-</h4>
                            </div>
                        </div>
                    </div>

                    <!-- UV / Sunrise Sunset Row -->
                    <div class="sun-aero-grid">
                        <div class="sun-card glass">
                            <div class="sun-card-glow" style="background: linear-gradient(135deg, var(--farm-sun), transparent);"></div>
                            <i data-lucide="sunrise" style="color: var(--farm-sun);"></i>
                            <h4>${this.t('sunrise')}</h4>
                            <div class="sun-time-row">
                                <span class="sun-time-val" id="weatherSunrise">-</span>
                                <span class="sun-time-label">Local AM</span>
                            </div>
                        </div>
                        <div class="sun-card glass">
                            <div class="sun-card-glow" style="background: linear-gradient(135deg, var(--farm-rose), transparent);"></div>
                            <i data-lucide="sunset" style="color: var(--farm-rose);"></i>
                            <h4>${this.t('sunset')}</h4>
                            <div class="sun-time-row">
                                <span class="sun-time-val" id="weatherSunset">-</span>
                                <span class="sun-time-label">Local PM</span>
                            </div>
                        </div>
                        <div class="sun-card glass">
                            <div class="sun-card-glow" style="background: linear-gradient(135deg, var(--primary), transparent);"></div>
                            <i data-lucide="shield-alert" style="color: var(--primary);"></i>
                            <h4>${this.t('uvIndex')}</h4>
                            <div class="sun-time-row">
                                <span class="sun-time-val" id="weatherUV">-</span>
                                <span class="sun-time-label">Max Daily</span>
                            </div>
                        </div>
                    </div>

                    <!-- 7-Day Forecast Grid -->
                    <h3 class="forecast-heading">
                        <span class="forecast-heading-icon"><i data-lucide="calendar"></i></span>
                        ${this.t('sevenDayForecast')}
                    </h3>
                    <div class="forecast-grid" id="weatherForecastGrid"></div>

                    <!-- 7-Day Farm Advice -->
                    <h3 class="forecast-heading">
                        <span class="forecast-heading-icon"><i data-lucide="sprout"></i></span>
                        ${window.FarmAdvice ? FarmAdvice.text('title', this.currentLang) : ''}
                    </h3>
                    <div id="farmAdviceSummary" class="farm-advice-summary"></div>
                    <div id="farmAdviceList" class="farm-advice-list"></div>
                    <p class="farm-advice-note">${window.FarmAdvice ? FarmAdvice.text('note', this.currentLang) : ''}</p>
                </div>

                <!-- History Search List -->
                <div class="history-section">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                        <h3 class="history-heading" style="margin-bottom:0;"><i data-lucide="history"></i>${this.t('weatherHistory')}</h3>
                        <button id="btnClearWeatherHistory" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;"><i data-lucide="trash-2"></i>${this.t('clearHistory')}</button>
                    </div>
                    <div id="weatherHistoryGrid" class="history-grid"></div>
                </div>
            </div>
        `;
    }

    getScanTemplate(moduleName) {
        // Share standard layout for Crops, Cattle, Soil scans
        let titleKey, subtitleKey, uTitleKey, uSubKey, histKey, rLabelKey, rValuePlaceholder, statLabelKey, statValPlaceholder;
        let infoCardTitle, infoCardText;
        if (moduleName === 'crops') {
            titleKey = 'cropsTitle';
            subtitleKey = 'cropsSubtitle';
            uTitleKey = 'uploadAreaTitle';
            uSubKey = 'uploadAreaSub';
            histKey = 'cropsHistory';
            rLabelKey = 'cropDisease';
            rValuePlaceholder = '-';
            statLabelKey = 'confidence';
            statValPlaceholder = '-';
            infoCardTitle = this.t('photoTipTitle');
            infoCardText = this.t(subtitleKey);
        } else if (moduleName === 'cattle') {
            titleKey = 'cattleTitle';
            subtitleKey = 'cattleSubtitle';
            uTitleKey = 'uploadCattleTitle';
            uSubKey = 'uploadCattleSub';
            histKey = 'cattleHistory';
            rLabelKey = 'cattleBreed';
            rValuePlaceholder = '-';
            statLabelKey = 'healthStatus';
            statValPlaceholder = '-';
            infoCardTitle = this.t('photoTipTitle');
            infoCardText = this.t(subtitleKey);
        } else { // Soil
            titleKey = 'soilTitle';
            subtitleKey = 'soilSubtitle';
            uTitleKey = 'uploadSoilTitle';
            uSubKey = 'uploadSoilSub';
            histKey = 'soilHistory';
            rLabelKey = 'soilType';
            rValuePlaceholder = '-';
            statLabelKey = 'soilNutrients';
            statValPlaceholder = '-';
            infoCardTitle = this.t('photoTipTitle');
            infoCardText = this.t(subtitleKey);
        }

        return `
            <div class="page animate-fade-in">
                <!-- Header -->
                <div class="subpage-header">
                    <h1 class="page-title">${this.t(titleKey)}</h1>
                    <p class="page-subtitle">${this.t(subtitleKey)}</p>
                </div>
                
                <div class="upload-wrapper">
                    <!-- Left: Upload Interface -->
                    <div class="card glass">
                        <div id="scanUploadArea" class="upload-area">
                            <div class="upload-icon">
                                <i data-lucide="upload-cloud"></i>
                            </div>
                            <p class="upload-text-main">${this.t(uTitleKey)}</p>
                            <p class="upload-text-sub">${this.t(uSubKey)}</p>
                            <input type="file" id="scanFileInput" class="file-input" accept="image/*">
                        </div>
                        
                        <div id="scanPreviewContainer" class="preview-container hidden">
                            <div class="preview-card">
                                <img id="scanPreviewImg" class="preview-image" src="" alt="Scan Preview">
                            </div>
                            <button id="btnRunScan" class="btn btn-primary btn-upload-submit">
                                <i data-lucide="image"></i>${this.t('btnAnalyze')}
                            </button>
                        </div>
                        <p id="scanErrorText" class="text-center" style="color: var(--destructive); font-weight: 700; margin-top: 1rem; display: none;"></p>
                    </div>
                    
                    <!-- Right: Results display panel -->
                    <div id="scanResultsCard" class="result-details-card glass" style="min-height: 420px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                        <!-- Placeholder -->
                        <div id="scanPlaceholderContent">
                            <div class="upload-icon" style="background: rgba(16, 185, 129, 0.1); margin-bottom: 1.5rem; color: var(--primary);">
                                <i data-lucide="book-open" style="width:2.5rem; height:2.5rem;"></i>
                            </div>
                            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${infoCardTitle}</h3>
                            <p style="color: var(--muted-foreground); max-width: 280px; margin: 0 auto;">${infoCardText}</p>
                            <button type="button" id="btnSkipPhoto" class="btn btn-outline" style="margin-top: 1.5rem;"><i data-lucide="book-open"></i>${this.t('skipPhoto')}</button>
                        </div>

                        <!-- Real Scan Details -->
                        <div id="scanResultsContent" class="hidden text-center" style="width: 100%;">
                            <div id="scanSeverityBadge" class="status-badge-container"></div>
                            
                            <div class="result-item-header">
                                <p class="result-item-label">${this.t(rLabelKey)}</p>
                                <h2 id="scanResultName" class="result-item-value">${rValuePlaceholder}</h2>
                            </div>
                            
                            <!-- Nutrients/Gauges for Soil, basic stats for crops/cattle -->
                            <div id="resultsStatContainer" style="width:100%;"></div>
                            
                            <!-- Dynamic recommendations Lists -->
                            <div id="recsContainer" style="text-align: left; margin-top: 2rem;"></div>
                        </div>
                    </div>
                </div>

                <!-- History archives -->
                <div class="history-section">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                        <h3 class="history-heading" style="margin-bottom:0;"><i data-lucide="archive"></i>${this.t(histKey)}</h3>
                        <button id="btnClearScanHistory" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.75rem;"><i data-lucide="trash-2"></i>${this.t('clearHistory')}</button>
                    </div>
                    <div id="scanHistoryGrid" class="history-grid"></div>
                </div>
            </div>
        `;
    }

    getDashboardTemplate() {
        return `
            <div class="page animate-fade-in">
                <div class="subpage-header">
                    <h1 class="page-title">${this.t('dashTitle')}</h1>
                    <p class="page-subtitle">${this.t('dashSubtitle')}</p>
                </div>

                <!-- operational counter matrices -->
                <div class="dashboard-kpi-grid grid grid-cols-3">
                    <div class="dashboard-kpi-card card glass crops">
                        <div class="dashboard-kpi-icon"><i data-lucide="scan"></i></div>
                        <div>
                            <p class="dashboard-kpi-label">${this.t('scansCount')}</p>
                            <h2 id="dashScansCount" class="dashboard-kpi-value">0</h2>
                        </div>
                    </div>
                    <div class="dashboard-kpi-card card glass cattle">
                        <div class="dashboard-kpi-icon"><i data-lucide="paw-print"></i></div>
                        <div>
                            <p class="dashboard-kpi-label">${this.t('activeCattle')}</p>
                            <h2 id="dashCattleCount" class="dashboard-kpi-value">0</h2>
                        </div>
                    </div>
                    <div class="dashboard-kpi-card card glass soil">
                        <div class="dashboard-kpi-icon"><i data-lucide="droplet"></i></div>
                        <div>
                            <p class="dashboard-kpi-label">${this.t('soilAvgPh')}</p>
                            <h2 id="dashSoilPh" class="dashboard-kpi-value">6.5</h2>
                        </div>
                    </div>
                </div>

                <!-- charts grids -->
                <div class="dashboard-grid">
                    <!-- Crops -->
                    <div class="dash-matrix-card glass crops">
                        <div class="dash-matrix-header">
                            <div class="dash-matrix-icon-box" style="background: rgba(16, 185, 129, 0.1); color: var(--primary);">
                                <i data-lucide="leaf"></i>
                            </div>
                            <h4 class="dash-matrix-title">${this.t('botanicalIndex')}</h4>
                        </div>
                        <div class="dash-chart-container">
                            <canvas id="cropChart"></canvas>
                            <div class="dash-chart-center-text">
                                <span class="dash-chart-center-val" id="cropPercentText">75%</span>
                                <span class="dash-chart-center-label">${this.t('healthy')}</span>
                            </div>
                        </div>
                        <ul class="dash-points-list">
                            <li class="dash-point-item"><i data-lucide="check-circle-2" style="color: #10b981;"></i> ${this.t('healthy')}: <span id="dashCropHealthy" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="alert-triangle" style="color: #fb923c;"></i> ${this.t('attention')}: <span id="dashCropWarning" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="x-circle" style="color: #ef4444;"></i> ${this.t('critical')}: <span id="dashCropCritical" style="margin-left: auto;">-</span></li>
                        </ul>
                    </div>

                    <!-- Cattle -->
                    <div class="dash-matrix-card glass cattle">
                        <div class="dash-matrix-header">
                            <div class="dash-matrix-icon-box" style="background: rgba(244, 63, 94, 0.1); color: var(--farm-rose);">
                                <i data-lucide="paw-print"></i>
                            </div>
                            <h4 class="dash-matrix-title">${this.t('cattleHealth')}</h4>
                        </div>
                        <div class="dash-chart-container">
                            <canvas id="cattleChart"></canvas>
                            <div class="dash-chart-center-text">
                                <span class="dash-chart-center-val" id="cattlePercentText">85%</span>
                                <span class="dash-chart-center-label">${this.t('healthy')}</span>
                            </div>
                        </div>
                        <ul class="dash-points-list">
                            <li class="dash-point-item"><i data-lucide="check-circle-2" style="color: #10b981;"></i> ${this.t('healthy')}: <span id="dashCattleHealthy" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="eye" style="color: #fb923c;"></i> Observation: <span id="dashCattleObserve" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="x-circle" style="color: #ef4444;"></i> Critical: <span id="dashCattleCritical" style="margin-left: auto;">-</span></li>
                        </ul>
                    </div>

                    <!-- Soil -->
                    <div class="dash-matrix-card glass soil">
                        <div class="dash-matrix-header">
                            <div class="dash-matrix-icon-box" style="background: rgba(120, 53, 15, 0.1); color: var(--farm-soil);">
                                <i data-lucide="layers"></i>
                            </div>
                            <h4 class="dash-matrix-title">${this.t('soilTaxonomy')}</h4>
                        </div>
                        <div class="dash-chart-container">
                            <canvas id="soilChart"></canvas>
                            <div class="dash-chart-center-text">
                                <span class="dash-chart-center-val" id="soilPercentText">0%</span>
                                <span class="dash-chart-center-label" id="soilPercentLabel">-</span>
                            </div>
                        </div>
                        <ul class="dash-points-list">
                            <li class="dash-point-item"><i data-lucide="sprout" style="color: #8b5cf6;"></i> Loamy: <span id="dashSoilLoam" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="droplet" style="color: #06b6d4;"></i> Clay: <span id="dashSoilClay" style="margin-left: auto;">-</span></li>
                            <li class="dash-point-item"><i data-lucide="cookie" style="color: #78350f;"></i> Sandy: <span id="dashSoilSand" style="margin-left: auto;">-</span></li>
                        </ul>
                    </div>
                </div>

                <!-- advisories & news feeds -->
                <div class="news-heading">
                    <i data-lucide="newspaper" style="color: var(--primary);"></i>
                    <h3>${this.t('advisoryBoard')}</h3>
                </div>
                
                <div class="news-layout">
                    <!-- Advisories -->
                    <div>
                        <h4 class="news-column-title">${this.t('advisoryBoard')}</h4>
                        <div class="news-cards-list" id="advisoriesList"></div>
                    </div>
                    
                    <!-- Research -->
                    <div>
                        <h4 class="news-column-title">${this.t('researchFeed')}</h4>
                        <div class="news-cards-list" id="researchList"></div>
                    </div>
                </div>
            </div>
        `;
    }

    getAuthTemplate() {
        const user = localStorage.getItem('farmtora_user');
        if (user) {
            const userData = JSON.parse(user);
            return `
                <div class="page animate-fade-in auth-container">
                    <div class="auth-card glass">
                        <div class="auth-card-decor"></div>
                        <div class="auth-header">
                            <div class="upload-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--primary); margin-bottom: 1.5rem;">
                                <i data-lucide="user-check" style="width: 2.5rem; height: 2.5rem;"></i>
                            </div>
                            <h1>${this.t('welcomeBack')}!</h1>
                            <p>${this.t('activeSession')}</p>
                        </div>
                        
                        <div style="margin-bottom: 2.5rem; font-weight: 700; line-height: 2;">
                            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding: 0.75rem 0;">
                                <span style="color: var(--muted-foreground)">Account Email:</span>
                                <span>${userData.email}</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; border-bottom:1px solid var(--border); padding: 0.75rem 0;">
                                <span style="color: var(--muted-foreground)">Status:</span>
                                <span style="color: var(--primary);">Signed in locally</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; padding: 0.75rem 0;">
                                <span style="color: var(--muted-foreground)">Last Sign In:</span>
                                <span>${userData.lastSignIn || 'Current session'}</span>
                            </div>
                        </div>

                        <button id="btnSignOut" class="btn btn-outline" style="width: 100%; padding: 1rem;">
                            <i data-lucide="log-out"></i>${this.t('signOut')}
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="page animate-fade-in auth-container">
                <button class="auth-back-btn" onclick="window.location.hash='home'">
                    <i data-lucide="arrow-left"></i> Back to Homepage
                </button>
                <div class="auth-card glass">
                    <div class="auth-card-decor"></div>
                    <div class="auth-header">
                        <h1 id="authTitleText">${this.t('authTitle')}</h1>
                        <p id="authSubtitleText">${this.t('authSubtitle')}</p>
                    </div>
                    
                    <form class="auth-form" id="authForm">
                        <div class="form-group">
                            <label class="form-label">${this.t('emailLabel')}</label>
                            <div class="input-icon-wrapper">
                                <i data-lucide="mail"></i>
                                <input type="email" id="authEmail" class="input-field" required placeholder="${this.t('emailPlaceholder')}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">${this.t('passwordLabel')}</label>
                            <div class="input-icon-wrapper">
                                <i data-lucide="lock"></i>
                                <input type="password" id="authPassword" class="input-field" required placeholder="${this.t('passwordPlaceholder')}">
                            </div>
                        </div>
                        
                        <button type="submit" id="btnAuthSubmit" class="btn btn-primary btn-auth-submit">
                            ${this.t('btnSignIn')}
                        </button>
                    </form>
                    
                    <div class="auth-divider">
                        <span class="auth-divider-span">Local Session</span>
                    </div>
                    
                    <div class="auth-footer">
                        <button id="btnToggleAuthMode" class="btn-toggle-auth">
                            ${this.t('noAccount')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 6. Weather Page Controller Logic
    initWeatherEvents() {
        const searchInput = document.getElementById('weatherSearchInput');
        const resultsBox = document.getElementById('weatherSearchResults');
        const btnClear = document.getElementById('btnClearWeatherHistory');
        
        if (searchInput && resultsBox) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                const query = searchInput.value.trim();
                if (query.length < 3) {
                    resultsBox.classList.add('hidden');
                    return;
                }
                debounceTimer = setTimeout(async () => {
                    try {
                        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&format=json`;
                        const res = await fetch(url);
                        const data = await res.json();
                        if (data && data.results) {
                            this.renderSearchResults(data.results);
                        } else {
                            resultsBox.innerHTML = `<div class="search-result-item">No results found</div>`;
                            resultsBox.classList.remove('hidden');
                        }
                    } catch(e) {
                        console.error(e);
                    }
                }, 300);
            });

            // Close dropdown clicks outside search
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
                    resultsBox.classList.add('hidden');
                }
            });
        }

        // Clear history click listener
        if (btnClear) {
            btnClear.addEventListener('click', async () => {
                await clearStore('weather');
                this.renderWeatherHistory();
            });
        }

        this.initGeolocation();
        this.renderWeatherHistory();
        
        // Restore active search or load default Bangalore
        if (this.currentWeatherInfo) {
            this.displayWeatherData(this.currentWeatherInfo);
        } else {
            this.fetchWeather(12.97, 77.59, "Bangalore, Karnataka, IN");
        }
    }

    renderSearchResults(results) {
        const resultsBox = document.getElementById('weatherSearchResults');
        if (!resultsBox) return;
        resultsBox.innerHTML = results.map(item => {
            const locName = `${item.name}, ${item.admin1 || ''} ${item.country_code.toUpperCase()}`;
            return `
                <div class="search-result-item" onclick="window.app.selectLocation(${item.latitude}, ${item.longitude}, '${locName.replace(/'/g, "\\'")}')">
                    <i data-lucide="map-pin"></i>
                    <div class="search-result-text">
                        <p>${item.name}</p>
                        <span>${item.admin1 || ''}, ${item.country || ''}</span>
                    </div>
                </div>
            `;
        }).join('');
        resultsBox.classList.remove('hidden');
        lucide.createIcons();
    }

    async selectLocation(lat, lon, name) {
        document.getElementById('weatherSearchResults').classList.add('hidden');
        document.getElementById('weatherSearchInput').value = '';
        this.showLoading(this.t('fetchingWeather'));
        try {
            await this.fetchWeather(lat, lon, name);
        } finally {
            this.hideLoading();
        }
    }

    initGeolocation() {
        const btnGeo = document.getElementById('btnDetectLocation');
        if (!btnGeo) return;
        btnGeo.addEventListener('click', () => {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported by this browser.");
                return;
            }
            this.showLoading(this.t('fetchingWeather'));
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    try {
                        const city = await this.reverseGeocode(lat, lon);
                        await this.fetchWeather(lat, lon, city);
                    } catch (err) {
                        await this.fetchWeather(lat, lon, `My Farm (${lat.toFixed(2)}, ${lon.toFixed(2)})`);
                    } finally {
                        this.hideLoading();
                    }
                },
                (err) => {
                    this.hideLoading();
                    alert(`Location error: ${err.message}`);
                }
            );
        });
    }

    async reverseGeocode(lat, lon) {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.address) {
            return data.address.city || data.address.town || data.address.village || data.display_name;
        }
        return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    }

    async fetchWeather(lat, lon, name) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,weathercode,sunrise,sunset,uv_index_max&timezone=auto`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Weather service returned ${res.status}`);
            const data = await res.json();
            if (!data.current || !data.daily) throw new Error('Incomplete weather data');
            
            // Format log for UI displays
            const record = {
                name: name,
                lat: lat,
                lon: lon,
                temp: data.current.temperature_2m,
                code: data.current.weather_code,
                wind: Math.round(data.current.wind_speed_10m),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
                raw: data
            };

            this.currentWeatherInfo = record;
            this.displayWeatherData(record);
            
            // Add search entry to IndexedDB weather table
            await addToStore('weather', {
                name: name,
                temp: record.temp,
                condition: this.getWeatherCondition(record.code).text,
                date: new Date().toLocaleDateString()
            });
            this.renderWeatherHistory();
            document.getElementById('weatherError')?.classList.add('hidden');
        } catch(e) {
            console.error("Weather fetch failure", e);
            document.getElementById('weatherError')?.classList.remove('hidden');
        }
    }

    displayWeatherData(record) {
        const hero = document.getElementById('weatherHeroCard');
        if (!hero) return;
        hero.classList.remove('hidden');

        document.getElementById('weatherLocName').textContent = record.name;
        document.getElementById('weatherTemp').textContent = Math.round(record.temp);
        
        const cond = this.getWeatherCondition(record.code);
        document.getElementById('weatherCondition').innerHTML = `<i data-lucide="${cond.icon}" style="display:inline-block; vertical-align:middle; width:2rem; height:2rem; margin-right:0.5rem; color:var(--secondary)"></i> ${this.currentLang === 'en' ? cond.text : cond.textTranslated[this.currentLang] || cond.text}`;
        
        // Real relative humidity from Open-Meteo's `current` block
        const humidity = record.raw.current?.relative_humidity_2m;
        document.getElementById('weatherHumidity').textContent = typeof humidity === 'number' ? `${Math.round(humidity)}%` : '-';
        document.getElementById('weatherWind').textContent = `${record.wind} km/h`;
        
        const dailyPrecip = record.raw.daily.precipitation_probability_max[0];
        document.getElementById('weatherPrecip').textContent = `${dailyPrecip}%`;

        // UV and Sunrise Sunset
        const sunriseTime = new Date(record.raw.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunsetTime = new Date(record.raw.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const uvIndexVal = record.raw.daily.uv_index_max[0];
        
        document.getElementById('weatherSunrise').textContent = sunriseTime;
        document.getElementById('weatherSunset').textContent = sunsetTime;
        document.getElementById('weatherUV').textContent = uvIndexVal.toFixed(1);

        // Render 7-day forecast cards
        const forecastGrid = document.getElementById('weatherForecastGrid');
        if (forecastGrid) {
            const daily = record.raw.daily;
            forecastGrid.innerHTML = daily.time.map((timeStr, idx) => {
                const dateObj = new Date(timeStr);
                const dayName = dateObj.toLocaleDateString(this.currentLang, { weekday: 'short' });
                const maxTemp = Math.round(daily.temperature_2m_max[idx]);
                const minTemp = Math.round(daily.temperature_2m_min[idx]);
                const condCode = daily.weathercode[idx];
                const weatherCond = this.getWeatherCondition(condCode);
                const probVal = daily.precipitation_probability_max[idx];
                const isToday = idx === 0;

                return `
                    <div class="forecast-card glass ${isToday ? 'today' : ''}">
                        <div class="forecast-day">${dayName}</div>
                        <div class="forecast-icon-box" style="color: var(--secondary);">
                            <i data-lucide="${weatherCond.icon}" style="width: 2.5rem; height: 2.5rem;"></i>
                        </div>
                        <div class="forecast-temp-range">
                            <span class="forecast-temp-max">${maxTemp}°</span>
                            <span class="forecast-temp-min">${minTemp}°</span>
                        </div>
                        <div class="forecast-slider">
                            <div class="forecast-slider-bar" style="width: ${Math.max(10, Math.min(100, (maxTemp / 45) * 100))}%"></div>
                        </div>
                        <span class="forecast-precip-badge">
                            <i data-lucide="cloud-rain" style="width:0.75rem; height:0.75rem;"></i> ${probVal}%
                        </span>
                    </div>
                `;
            }).join('');
        }
        this.renderFarmAdvice(record.raw.daily);
        lucide.createIcons();
    }

    renderFarmAdvice(daily) {
        const list = document.getElementById('farmAdviceList');
        const summary = document.getElementById('farmAdviceSummary');
        if (!list || !summary || !window.FarmAdvice) return;

        const lang = this.currentLang;
        const week = FarmAdvice.adviseWeek(daily);
        const dayLabel = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString(lang, { weekday: 'short', day: 'numeric', month: 'short' });
        const icons = { frost: 'snowflake', heat: 'thermometer-sun', heavyRain: 'cloud-rain-wind', sprayGood: 'spray-can', sprayAvoid: 'ban', irrigate: 'droplets', skipIrrigation: 'cloud-drizzle', normal: 'check-circle-2' };

        const spray = FarmAdvice.bestSprayDays(week).map(dayLabel);
        summary.innerHTML = `
            <i data-lucide="spray-can"></i>
            <strong>${FarmAdvice.text('bestSprayDays', lang)}:</strong>
            <span>${spray.length ? spray.join(', ') : FarmAdvice.text('none', lang)}</span>
        `;

        list.innerHTML = week.map((day) => `
            <div class="farm-advice-day glass">
                <div class="farm-advice-date">${dayLabel(day.date)}</div>
                <ul class="farm-advice-items">
                    ${day.advice.map((item) => `
                        <li class="farm-advice-item level-${item.level}">
                            <i data-lucide="${icons[item.code] || 'info'}"></i>
                            <span>${FarmAdvice.describe(item, lang)}</span>
                        </li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    getWeatherCondition(code) {
        const mapping = {
            0: { text: "Sunny / Clear Sky", icon: "sun", textTranslated: { kn: "ಬಿಸಿಲಿನ ವಾತಾವರಣ", hi: "धूप खिली है" } },
            1: { text: "Mainly Clear", icon: "cloud-sun", textTranslated: { kn: "ಹೆಚ್ಚಾಗಿ ಸ್ಪಷ್ಟ", hi: "मुख्य रूप से साफ" } },
            2: { text: "Partly Cloudy", icon: "cloud-sun", textTranslated: { kn: "ಭಾಗಶಃ ಮೋಡ", hi: "आंशिक रूप से बादल" } },
            3: { text: "Overcast Clouds", icon: "cloud", textTranslated: { kn: "ಮೋಡ ಮುಚ್ಚಿದ", hi: "घने बादल" } },
            45: { text: "Dense Foggy", icon: "cloud-fog", textTranslated: { kn: "ದಟ್ಟ ಮಂಜು", hi: "घना कोहरा" } },
            48: { text: "Depositing Rime Fog", icon: "cloud-fog", textTranslated: { kn: "ಹಿಮದ ಮಂಜು", hi: "पाला कोहरा" } },
            51: { text: "Light Drizzle", icon: "cloud-drizzle", textTranslated: { kn: "ತಿಂಪುರು ಮಳೆ", hi: "हल्की बूंदाबांदी" } },
            53: { text: "Moderate Drizzle", icon: "cloud-drizzle", textTranslated: { kn: "ಮಧ್ಯಮ ತುಂತುರು", hi: "मध्यम बूंदाबांदी" } },
            55: { text: "Dense Drizzle", icon: "cloud-drizzle", textTranslated: { kn: "ದಟ್ಟ ತುಂತುರು ಮಳೆ", hi: "घनी बूंदाबांदी" } },
            61: { text: "Slight Rain Showers", icon: "cloud-rain", textTranslated: { kn: "ಹಗುರ ಮಳೆ", hi: "हल्की बारिश" } },
            63: { text: "Moderate Rain", icon: "cloud-rain", textTranslated: { kn: "ಮಧ್ಯಮ ಮಳೆ", hi: "मध्यम बारिश" } },
            65: { text: "Heavy Downpours", icon: "cloud-rain", textTranslated: { kn: "ಭಾರೀ ಮಳೆ", hi: "भारी बारिश" } },
            80: { text: "Slight Showers", icon: "cloud-showers-heavy", textTranslated: { kn: "ಹಗುರ ತುಂತುರು", hi: "हल्की बौछारें" } },
            81: { text: "Moderate Showers", icon: "cloud-showers-heavy", textTranslated: { kn: "ಮಧ್ಯಮ ಧಾರೆ", hi: "मध्यम बौछारें" } },
            82: { text: "Violent Showers", icon: "cloud-showers-heavy", textTranslated: { kn: "ಮುಸಲಧಾರೆ ಮಳೆ", hi: "तेज़ बौछारें" } },
            95: { text: "Thunderstorm", icon: "cloud-lightning", textTranslated: { kn: "ಗುಡುಗು ಸಿಡಿಲು", hi: "बिजली कड़कना" } },
            96: { text: "Storm with Hail", icon: "cloud-lightning", textTranslated: { kn: "ಆಲಿಕಲ್ಲು ಮಳೆ", hi: "ओलों के साथ तूफान" } },
            99: { text: "Violent Hailstorm", icon: "cloud-lightning", textTranslated: { kn: "ಭೀಕರ ಆಲಿಕಲ್ಲು ಮಳೆ", hi: "भारी ओलावृष्टि" } }
        };
        return mapping[code] || { text: "Unknown Weather", icon: "cloud", textTranslated: { kn: "ಅಜ್ಞಾತ ಹವಾಮಾನ", hi: "अज्ञात मौसम" } };
    }

    async renderWeatherHistory() {
        const grid = document.getElementById('weatherHistoryGrid');
        if (!grid) return;
        const list = await getAllFromStore('weather');
        if (list.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--muted-foreground); padding: 2rem;">No recent weather history logs.</p>`;
            return;
        }
        grid.innerHTML = list.reverse().slice(0, 6).map(item => `
            <div class="history-card glass" onclick="window.app.loadWeatherHistoryItem('${item.name.replace(/'/g, "\\'")}')">
                <div class="history-card-header">
                    <div class="history-card-icon" style="color: var(--secondary);"><i data-lucide="cloud"></i></div>
                    <span class="history-card-date">${item.date}</span>
                </div>
                <h4>${item.name.split(',')[0]}</h4>
                <div class="history-card-meta">${item.temp}°C - ${item.condition}</div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    loadWeatherHistoryItem(name) {
        this.showLoading(this.t('fetchingWeather'));
        // Find rough coordinate match based on common Indian locations or search Nominatim
        const locationCoords = {
            "Bangalore": { lat: 12.97, lon: 77.59 },
            "Delhi": { lat: 28.61, lon: 77.20 },
            "Mumbai": { lat: 19.07, lon: 72.87 },
            "Pune": { lat: 18.52, lon: 73.85 },
            "Kolkata": { lat: 22.57, lon: 88.36 }
        };
        const simpleKey = Object.keys(locationCoords).find(k => name.toLowerCase().includes(k.toLowerCase()));
        const coords = locationCoords[simpleKey] || { lat: 12.97, lon: 77.59 };
        
        this.fetchWeather(coords.lat, coords.lon, name).finally(() => this.hideLoading());
    }

    // 7. General AI Scan Controller (Crops, Cattle, Soil)
    initScanEvents(moduleName) {
        const uploadArea = document.getElementById('scanUploadArea');
        const fileInput = document.getElementById('scanFileInput');
        const btnScan = document.getElementById('btnRunScan');
        const btnClear = document.getElementById('btnClearScanHistory');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            // Drag-and-Drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--primary)';
                uploadArea.style.background = 'rgba(16, 185, 129, 0.05)';
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = '';
                uploadArea.style.background = '';
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '';
                uploadArea.style.background = '';
                if (e.dataTransfer.files.length > 0) {
                    this.handleFileSelected(e.dataTransfer.files[0], moduleName);
                }
            });

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    this.handleFileSelected(fileInput.files[0], moduleName);
                }
            });
        }

        if (btnScan) {
            btnScan.addEventListener('click', () => {
                this.executeImageScan(moduleName);
            });
        }

        const btnSkip = document.getElementById('btnSkipPhoto');
        if (btnSkip) {
            btnSkip.addEventListener('click', () => this.showMatchPicker(moduleName));
        }

        if (btnClear) {
            btnClear.addEventListener('click', async () => {
                await clearStore(moduleName);
                this.renderScanHistory(moduleName);
            });
        }

        // Restore active scan views
        if (moduleName === 'crops' && this.currentCropScan) {
            this.displayScanResults('crops', this.currentCropScan);
        } else if (moduleName === 'cattle' && this.currentCattleScan) {
            this.displayScanResults('cattle', this.currentCattleScan);
        } else if (moduleName === 'soil' && this.currentSoilScan) {
            this.displayScanResults('soil', this.currentSoilScan);
        }

        this.renderScanHistory(moduleName);
    }

    handleFileSelected(file, moduleName) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            
            // Render file previews
            document.getElementById('scanUploadArea').classList.add('hidden');
            const previewContainer = document.getElementById('scanPreviewContainer');
            previewContainer.classList.remove('hidden');
            
            const previewImg = document.getElementById('scanPreviewImg');
            previewImg.src = dataUrl;
            previewImg.dataset.filename = file.name;
            previewImg.dataset.filesize = file.size;

            // Reset results
            document.getElementById('scanErrorText').style.display = 'none';
            document.getElementById('scanResultsCard').style.display = '';
            document.getElementById('scanPlaceholderContent').classList.remove('hidden');
            document.getElementById('scanResultsContent').classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }

    getExpectedKeywords(moduleName) {
        if (moduleName === 'crops') {
            return ['plant', 'leaf', 'flower', 'tree', 'grass', 'weed', 'vegetable', 'fruit', 'basil', 'corn', 'crop', 'pot', 'foliage', 'stem', 'sprout', 'seedling', 'rose', 'orchid', 'daisy', 'sunflower', 'grain'];
        } else if (moduleName === 'cattle') {
            return ['cow', 'cattle', 'livestock', 'bull', 'ox', 'calf', 'heifer', 'mammal', 'animal', 'sheep', 'goat', 'pig', 'horse', 'yak', 'bison', 'buffalo', 'zebra', 'llama', 'fauna'];
        } else { // Soil
            return ['soil', 'dirt', 'sand', 'clay', 'mud', 'ground', 'earth', 'gravel', 'stone', 'rock', 'pebble', 'terrain', 'path', 'structure'];
        }
    }

    async executeImageScan(moduleName) {
        this.showLoading(this.t('scanningImage'));
        document.getElementById('scanErrorText').style.display = 'none';
        

        const img = document.getElementById('scanPreviewImg');
        const filename = img.dataset.filename || "scan.jpg";
        const filesize = parseInt(img.dataset.filesize || "50000");
        let isValid = false;

        if (window.tf && window.mobilenet) {
            try {
                // Initializing MobileNet model checking
                this.setLoadingText(this.t('loadingModel'));
                const model = await mobilenet.load();
                const predictions = await model.classify(img);
                
                const keywords = this.getExpectedKeywords(moduleName);
                isValid = predictions.some(pred => {
                    const label = pred.className.toLowerCase();
                    return keywords.some(kw => label.includes(kw));
                });
            } catch(e) {
                console.error("TF/MobileNet analysis failed, defaulting to simulation", e);
                isValid = true; // offline/WebGL failure safeguard
            }
        } else {
            console.warn("MobileNet libraries offline, bypassing checks.");
            isValid = true;
        }

        this.hideLoading();

        if (!isValid) {
            const errStr = moduleName === 'crops' ? 'errInvalidCrop' : (moduleName === 'cattle' ? 'errInvalidCattle' : 'errInvalidSoil');
            const errBox = document.getElementById('scanErrorText');
            errBox.textContent = this.t(errStr);
            errBox.style.display = 'block';
            
            // Revert preview and upload card
            document.getElementById('scanPreviewContainer').classList.add('hidden');
            document.getElementById('scanUploadArea').classList.remove('hidden');
            return;
        }

        this.showMatchPicker(moduleName);
    }

    getCatalog(moduleName) {
        if (moduleName === 'crops') return CROP_CATALOG;
        if (moduleName === 'cattle') return CATTLE_CATALOG;
        return SOIL_CATALOG;
    }

    getRecordTitle(record) {
        const field = record.title || record.breed || record.soil;
        return field[this.currentLang] || field.en;
    }

    showMatchPicker(moduleName) {
        const catalog = this.getCatalog(moduleName);
        const subKey = moduleName === 'crops' ? 'pickCropSub' : (moduleName === 'cattle' ? 'pickCattleSub' : 'pickSoilSub');
        const severityLabel = { critical: this.t('critical'), attention: this.t('attention'), healthy: this.t('healthy') };

        document.getElementById('scanPlaceholderContent').classList.add('hidden');
        document.getElementById('scanResultsContent').classList.add('hidden');

        let picker = document.getElementById('scanMatchPicker');
        if (!picker) {
            picker = document.createElement('div');
            picker.id = 'scanMatchPicker';
            picker.className = 'match-picker';
            document.getElementById('scanResultsCard').appendChild(picker);
        }
        picker.classList.remove('hidden');
        picker.innerHTML = `
            <h3 class="match-picker-title">${this.t('pickMatchTitle')}</h3>
            <p class="match-picker-sub">${this.t(subKey)}</p>
            <div class="match-picker-list" role="list">
                ${Object.entries(catalog).map(([key, record]) => `
                    <button type="button" class="match-option" role="listitem" data-key="${key}">
                        <span class="match-option-name">${this.getRecordTitle(record)}</span>
                        ${moduleName === 'crops' ? `<span class="match-option-tag tag-${record.severity}">${severityLabel[record.severity] || ''}</span>` : ''}
                        <i data-lucide="chevron-right"></i>
                    </button>
                `).join('')}
            </div>
        `;
        picker.querySelectorAll('.match-option').forEach(btn => {
            btn.addEventListener('click', () => this.selectMatch(moduleName, btn.dataset.key));
        });
        lucide.createIcons();
        picker.querySelector('.match-option')?.focus();
    }

    async selectMatch(moduleName, key) {
        const record = this.getCatalog(moduleName)[key];
        if (!record) return;

        if (moduleName === 'crops') this.currentCropScan = record;
        else if (moduleName === 'cattle') this.currentCattleScan = record;
        else this.currentSoilScan = record;

        await addToStore(moduleName, {
            title: (record.title || record.breed || record.soil).en,
            severity: record.severity || "healthy",
            date: new Date().toLocaleDateString(),
            raw: record
        });

        this.displayScanResults(moduleName, record);
        this.renderScanHistory(moduleName);
    }

    displayScanResults(moduleName, record) {
        document.getElementById('scanPlaceholderContent').classList.add('hidden');
        document.getElementById('scanMatchPicker')?.classList.add('hidden');
        const resultsContent = document.getElementById('scanResultsContent');
        resultsContent.classList.remove('hidden');

        // Render Severity Badge
        const badge = document.getElementById('scanSeverityBadge');
        badge.className = "status-badge-container";
        
        const severity = record.severity || 'healthy';
        badge.style.display = moduleName === 'crops' ? '' : 'none';
        if (severity === 'critical') {
            badge.classList.add('status-badge-critical');
            badge.innerHTML = `<i data-lucide="alert-octagon"></i>${this.t('critical')}`;
        } else if (severity === 'attention') {
            badge.classList.add('status-badge-attention');
            badge.innerHTML = `<i data-lucide="alert-circle"></i>${this.t('attention')}`;
        } else {
            badge.classList.add('status-badge-healthy');
            badge.innerHTML = `<i data-lucide="check-circle-2"></i>${this.t('healthy')}`;
        }

        // Render Title Name
        document.getElementById('scanResultName').textContent = this.getRecordTitle(record);
        const note = (key) => `<p class="guidance-note"><i data-lucide="info"></i><span>${this.t(key)}</span></p>`;
        const backButton = `<button type="button" class="btn btn-outline match-back" onclick="window.app.showMatchPicker('${moduleName}')"><i data-lucide="rotate-ccw"></i>${this.t('chooseAnother')}</button>`;

        // Render Module Specific Stats
        const statContainer = document.getElementById('resultsStatContainer');
        const recsContainer = document.getElementById('recsContainer');

        if (moduleName === 'crops') {
            statContainer.innerHTML = note('referenceNote');

            recsContainer.innerHTML = `
                <h3 class="result-treatment-heading"><i data-lucide="activity"></i>${this.t('treatments')}</h3>
                <ul class="result-list">
                    ${record.treatments[this.currentLang].map(t => `<li class="result-list-item"><i data-lucide="check"></i>${t}</li>`).join('')}
                </ul>
                <h3 class="result-treatment-heading" style="margin-top: 2rem;"><i data-lucide="shield"></i>${this.t('preventions')}</h3>
                <ul class="result-list">
                    ${record.preventions[this.currentLang].map(p => `<li class="result-list-item"><i data-lucide="check"></i>${p}</li>`).join('')}
                </ul>
                ${backButton}
            `;

        } else if (moduleName === 'cattle') {
            statContainer.innerHTML = note('vetNote');

            recsContainer.innerHTML = `
                <h3 class="result-treatment-heading"><i data-lucide="shield-alert"></i>${this.t('vaccineTracker')}</h3>
                <ul class="result-list" style="margin-bottom: 2rem;">
                    ${record.vaccines[this.currentLang].map(v => `<li class="result-list-item"><i data-lucide="syringe" style="color: var(--farm-rose)"></i>${v}</li>`).join('')}
                </ul>
                <h3 class="result-treatment-heading"><i data-lucide="activity"></i>${this.t('careTips')}</h3>
                <ul class="result-list">
                    ${record.treatments[this.currentLang].map(t => `<li class="result-list-item"><i data-lucide="check"></i>${t}</li>`).join('')}
                </ul>
                ${backButton}
            `;

        } else { // Soil Matrix Gauges
            statContainer.innerHTML = note('soilNote') + `
                <p class="result-item-label" style="margin-top:1.5rem;">${this.t('soilNutrients')}</p>
                <!-- Nutrients grid -->
                <div class="soil-gauge-container" style="margin-bottom: 2rem;">
                    <div class="soil-gauge-card glass">
                        <p class="soil-gauge-title">${this.t('nitrogen')}</p>
                        <h4 class="soil-gauge-value" style="color: var(--accent);">${record.nitrogen}</h4>
                    </div>
                    <div class="soil-gauge-card glass">
                        <p class="soil-gauge-title">${this.t('phosphorus')}</p>
                        <h4 class="soil-gauge-value" style="color: var(--secondary);">${record.phosphorus}</h4>
                    </div>
                    <div class="soil-gauge-card glass">
                        <p class="soil-gauge-title">${this.t('potassium')}</p>
                        <h4 class="soil-gauge-value" style="color: var(--farm-sun);">${record.potassium}</h4>
                    </div>
                </div>

                <div class="result-stats-row">
                    <div class="result-stat-card glass">
                        <p class="result-item-label">${this.t('phLevel')}</p>
                        <h4 class="result-stat-val" style="color: var(--primary);">${record.ph} pH</h4>
                    </div>
                    <div class="result-stat-card glass">
                        <p class="result-item-label">${this.t('soilMoisture')}</p>
                        <h4 class="result-stat-val" style="color: var(--secondary);">${record.moisture}</h4>
                    </div>
                </div>
            `;

            recsContainer.innerHTML = `
                <h3 class="result-treatment-heading"><i data-lucide="sprout"></i>${this.t('optimizedCrops')}</h3>
                <p style="font-weight: 900; font-size: 1.25rem; color: var(--primary); margin-bottom: 2rem; padding-left: 0.5rem;">${record.crops[this.currentLang]}</p>
                
                <h3 class="result-treatment-heading"><i data-lucide="clipboard-list"></i>${this.t('recommendations')}</h3>
                <ul class="result-list">
                    ${record.recommendations[this.currentLang].map(r => `<li class="result-list-item"><i data-lucide="check"></i>${r}</li>`).join('')}
                </ul>
                ${backButton}
            `;
        }

        lucide.createIcons();
    }

    async renderScanHistory(moduleName) {
        const grid = document.getElementById('scanHistoryGrid');
        if (!grid) return;
        const list = await getAllFromStore(moduleName);
        if (list.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--muted-foreground); padding: 2rem;">${this.t('noRecords')}</p>`;
            return;
        }

        grid.innerHTML = list.reverse().map(item => {
            const itemTitle = this.getRecordTitle(item.raw);
            const icon = moduleName === 'crops' ? 'leaf' : (moduleName === 'cattle' ? 'paw-print' : 'layers');
            const color = moduleName === 'crops' ? 'var(--primary)' : (moduleName === 'cattle' ? 'var(--farm-rose)' : 'var(--farm-soil)');
            return `
                <div class="history-card glass" onclick="window.app.loadSavedScan('${moduleName}', ${item.id})">
                    <div class="history-card-header">
                        <div class="history-card-icon" style="color: ${color};"><i data-lucide="${icon}"></i></div>
                        <span class="history-card-date">${item.date}</span>
                    </div>
                    <h4>${itemTitle.split(' - ')[0]}</h4>
                    ${moduleName === 'crops' ? `<div class="history-card-meta">${this.t('statusLabel')}: ${this.t(item.severity) || item.severity}</div>` : ''}
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    async loadSavedScan(moduleName, id) {
        const list = await getAllFromStore(moduleName);
        const item = list.find(x => x.id === id);
        if (!item) return;

        // Hide upload panel to render visual results
        document.getElementById('scanUploadArea').classList.add('hidden');
        document.getElementById('scanPreviewContainer').classList.remove('hidden');
        
        // Show placeholders or saved image indicator
        document.getElementById('scanPreviewImg').src = "public/placeholder.svg";
        document.getElementById('scanErrorText').style.display = 'none';

        if (moduleName === 'crops') this.currentCropScan = item.raw;
        else if (moduleName === 'cattle') this.currentCattleScan = item.raw;
        else this.currentSoilScan = item.raw;

        this.displayScanResults(moduleName, item.raw);
    }

    // 8. Dashboard Controller (Chart.js Renderer)
    async initDashboardCharts() {
        const crops = await getAllFromStore('crops');
        const cattle = await getAllFromStore('cattle');
        const soil = await getAllFromStore('soil');
        
        // Summary calculations
        const totalScans = crops.length + cattle.length + soil.length;
        document.getElementById('dashScansCount').textContent = totalScans;
        
        const activeCattle = cattle.length;
        document.getElementById('dashCattleCount').textContent = activeCattle;
        
        const avgPh = soil.length > 0 ? (soil.reduce((acc, curr) => acc + (curr.raw.ph || 6.5), 0) / soil.length).toFixed(1) : "6.5";
        document.getElementById('dashSoilPh').textContent = `${avgPh} pH`;

        // Crop chart details
        const cropH = crops.filter(c => c.severity === 'healthy').length;
        const cropW = crops.filter(c => c.severity === 'attention').length;
        const cropC = crops.filter(c => c.severity === 'critical').length;
        const cropTotal = cropH + cropW + cropC;
        const cropPercent = cropTotal ? Math.round((cropH / cropTotal) * 100) : 0;
        document.getElementById('cropPercentText').textContent = `${cropPercent}%`;
        document.getElementById('dashCropHealthy').textContent = cropH;
        document.getElementById('dashCropWarning').textContent = cropW;
        document.getElementById('dashCropCritical').textContent = cropC;

        // Cattle details
        const catH = cattle.filter(c => c.severity === 'healthy').length;
        const catO = cattle.filter(c => c.severity === 'attention').length;
        const catC = cattle.filter(c => c.severity === 'critical').length;
        const catTotal = catH + catO + catC;
        const cattlePercent = catTotal ? Math.round((catH / catTotal) * 100) : 0;
        document.getElementById('cattlePercentText').textContent = `${cattlePercent}%`;
        document.getElementById('dashCattleHealthy').textContent = catH;
        document.getElementById('dashCattleObserve').textContent = catO;
        document.getElementById('dashCattleCritical').textContent = catC;

        // Soil details
        const loamCount = soil.filter(s => s.raw.soil.en.includes("Loam")).length;
        const clayCount = soil.filter(s => s.raw.soil.en.includes("Clay")).length;
        const sandCount = soil.filter(s => s.raw.soil.en.includes("Sand")).length;
        const soilPct = (n) => soil.length ? `${Math.round((n / soil.length) * 100)}%` : '0%';
        document.getElementById('dashSoilLoam').textContent = soilPct(loamCount);
        document.getElementById('dashSoilClay').textContent = soilPct(clayCount);
        document.getElementById('dashSoilSand').textContent = soilPct(sandCount);
        const soilTop = [['Loam', loamCount], ['Clay', clayCount], ['Sand', sandCount]].sort((x, y) => y[1] - x[1])[0];
        document.getElementById('soilPercentText').textContent = soil.length ? soilPct(soilTop[1]) : '0%';
        document.getElementById('soilPercentLabel').textContent = soil.length ? soilTop[0] : '-';

        // Render Chart JS Objects
        this.renderDoughnutChart('cropChart', [cropH, cropW, cropC], ['#10b981', '#fb923c', '#ef4444']);
        this.renderDoughnutChart('cattleChart', [catH, catO, catC], ['#10b981', '#fb923c', '#ef4444']);
        this.renderDoughnutChart('soilChart', [loamCount, clayCount, sandCount], ['#8b5cf6', '#06b6d4', '#78350f']);

        this.renderNewsFeeds();
    }

    renderDoughnutChart(canvasId, dataVals, colors) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // Prevent Canvas reuse error
        const chartKey = `${canvasId}Instance`;
        if (window[chartKey]) {
            window[chartKey].destroy();
        }

        window[chartKey] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: dataVals,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                cutout: '75%',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
    }

    renderNewsFeeds() {
        // Links to real, official services instead of invented news items.
        const sources = [{"source": {"en": "India Meteorological Department", "kn": "ಭಾರತೀಯ ಹವಾಮಾನ ಇಲಾಖೆ", "hi": "भारत मौसम विज्ञान विभाग"}, "title": {"en": "District agromet advisories", "kn": "ಜಿಲ್ಲಾ ಕೃಷಿ ಹವಾಮಾನ ಸಲಹೆಗಳು", "hi": "ज़िला कृषि-मौसम सलाह"}, "desc": {"en": "Official weather-based crop advice for your district, updated twice a week.", "kn": "ನಿಮ್ಮ ಜಿಲ್ಲೆಗೆ ಹವಾಮಾನ ಆಧಾರಿತ ಅಧಿಕೃತ ಬೆಳೆ ಸಲಹೆ, ವಾರಕ್ಕೆ ಎರಡು ಬಾರಿ ನವೀಕರಣ.", "hi": "आपके ज़िले के लिए मौसम आधारित आधिकारिक फसल सलाह, सप्ताह में दो बार अपडेट।"}, "url": "https://mausam.imd.gov.in/"}, {"source": {"en": "Agmarknet (Govt. of India)", "kn": "ಅಗ್‌ಮಾರ್ಕ್‌ನೆಟ್ (ಭಾರತ ಸರ್ಕಾರ)", "hi": "एगमार्कनेट (भारत सरकार)"}, "title": {"en": "Today's mandi prices", "kn": "ಇಂದಿನ ಮಂಡಿ ದರಗಳು", "hi": "आज के मंडी भाव"}, "desc": {"en": "Check real arrival prices for your crop at nearby APMC markets.", "kn": "ಹತ್ತಿರದ ಎಪಿಎಂಸಿ ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಯ ನಿಜವಾದ ದರ ನೋಡಿ.", "hi": "नज़दीकी APMC मंडियों में अपनी फसल के असली भाव देखें।"}, "url": "https://agmarknet.gov.in/"}, {"source": {"en": "Soil Health Card Scheme", "kn": "ಮಣ್ಣು ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ", "hi": "मृदा स्वास्थ्य कार्ड योजना"}, "title": {"en": "Get your soil tested", "kn": "ನಿಮ್ಮ ಮಣ್ಣನ್ನು ಪರೀಕ್ಷಿಸಿ", "hi": "अपनी मिट्टी की जांच कराएं"}, "desc": {"en": "Free soil testing with nutrient and fertiliser recommendations for your field.", "kn": "ನಿಮ್ಮ ಹೊಲಕ್ಕೆ ಪೋಷಕಾಂಶ ಮತ್ತು ಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ಉಚಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ.", "hi": "आपके खेत के लिए पोषक तत्व और उर्वरक सुझावों के साथ मुफ़्त मिट्टी जांच।"}, "url": "https://soilhealth.dac.gov.in/"}];
        const help = [{"source": {"en": "Kisan Call Centre", "kn": "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್", "hi": "किसान कॉल सेंटर"}, "title": {"en": "Call 1800-180-1551 (toll-free)", "kn": "1800-180-1551 ಗೆ ಕರೆ ಮಾಡಿ (ಉಚಿತ)", "hi": "1800-180-1551 पर कॉल करें (टोल-फ़्री)"}, "desc": {"en": "Talk to agriculture experts in your language about crop, pest or livestock problems.", "kn": "ಬೆಳೆ, ಕೀಟ ಅಥವಾ ಜಾನುವಾರು ಸಮಸ್ಯೆಗಳ ಬಗ್ಗೆ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೃಷಿ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ.", "hi": "फसल, कीट या पशु की समस्याओं पर अपनी भाषा में कृषि विशेषज्ञों से बात करें।"}, "url": "tel:18001801551"}, {"source": {"en": "ICAR", "kn": "ಐಸಿಎಆರ್", "hi": "आईसीएआर"}, "title": {"en": "Find your Krishi Vigyan Kendra", "kn": "ನಿಮ್ಮ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು ಹುಡುಕಿ", "hi": "अपना कृषि विज्ञान केंद्र खोजें"}, "desc": {"en": "Your district KVK can confirm a crop disease and advise on treatment.", "kn": "ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಕೆವಿಕೆ ಬೆಳೆ ರೋಗವನ್ನು ಖಚಿತಪಡಿಸಿ ಚಿಕಿತ್ಸೆ ಬಗ್ಗೆ ಸಲಹೆ ನೀಡುತ್ತದೆ.", "hi": "आपके ज़िले का KVK फसल रोग की पुष्टि कर इलाज की सलाह दे सकता है।"}, "url": "https://icar.org.in/"}];

        const card = (item) => `
            <a class="news-card glass news-card-link" href="${item.url}" ${item.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
                <div class="news-card-header">
                    <span class="news-card-source">${item.source[this.currentLang] || item.source.en}</span>
                    <i data-lucide="${item.url.startsWith('tel:') ? 'phone' : 'external-link'}" style="width:1rem;height:1rem;"></i>
                </div>
                <h4>${item.title[this.currentLang] || item.title.en}</h4>
                <p>${item.desc[this.currentLang] || item.desc.en}</p>
            </a>
        `;

        const advContainer = document.getElementById('advisoriesList');
        if (advContainer) advContainer.innerHTML = sources.map(card).join('');

        const resContainer = document.getElementById('researchList');
        if (resContainer) resContainer.innerHTML = help.map(card).join('');
        if (window.lucide) lucide.createIcons();
    }

    // 9. Account Profile & Authentication
    initAuthEvents() {
        const form = document.getElementById('authForm');
        const btnToggle = document.getElementById('btnToggleAuthMode');
        const btnOut = document.getElementById('btnSignOut');
        
        let isRegisterMode = false;

        if (form && btnToggle) {
            // Add real-time validation feedback to inputs
            const emailInput = document.getElementById('authEmail');
            const passwordInput = document.getElementById('authPassword');
            if (emailInput) {
                emailInput.addEventListener('blur', () => {
                    if (emailInput.value && !this.validateEmail(emailInput.value)) {
                        this.showFormError('authEmail', 'Please enter a valid email address');
                    } else {
                        this.clearFormError('authEmail');
                    }
                });
                emailInput.addEventListener('input', () => {
                    this.clearFormError('authEmail');
                });
            }

            if (passwordInput) {
                passwordInput.addEventListener('blur', () => {
                    if (passwordInput.value && !this.validatePassword(passwordInput.value)) {
                        this.showFormError('authPassword', 'Password must be at least 6 characters');
                    } else {
                        this.clearFormError('authPassword');
                    }
                });
                passwordInput.addEventListener('input', () => {
                    this.clearFormError('authPassword');
                });
            }

            btnToggle.addEventListener('click', (e) => {
                e.preventDefault();
                isRegisterMode = !isRegisterMode;
                
                document.getElementById('authTitleText').textContent = isRegisterMode ? this.t('btnSignUp') : this.t('authTitle');
                document.getElementById('authSubtitleText').textContent = isRegisterMode ? "Create an account to start diagnostic logs" : this.t('authSubtitle');
                document.getElementById('btnAuthSubmit').textContent = isRegisterMode ? this.t('btnSignUp') : this.t('btnSignIn');
                btnToggle.textContent = isRegisterMode ? this.t('alreadyAccount') : this.t('noAccount');
                
                lucide.createIcons();
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validate form fields
                const email = document.getElementById('authEmail').value;
                const password = document.getElementById('authPassword').value;
                let isValid = true;

                // Email validation
                if (!email) {
                    this.showFormError('authEmail', 'Email is required');
                    isValid = false;
                } else if (!this.validateEmail(email)) {
                    this.showFormError('authEmail', 'Please enter a valid email address');
                    isValid = false;
                } else {
                    this.clearFormError('authEmail');
                }

                // Password validation
                if (!password) {
                    this.showFormError('authPassword', 'Password is required');
                    isValid = false;
                } else if (!this.validatePassword(password)) {
                    this.showFormError('authPassword', 'Password must be at least 6 characters');
                    isValid = false;
                } else {
                    this.clearFormError('authPassword');
                }

                if (!isValid) return;

                // Show loading state and submit
                this.setButtonLoading('btnAuthSubmit', true);
                
                // Simulate network delay for better UX
                setTimeout(() => {
                    const sessionData = {
                        email: email,
                        lastSignIn: new Date().toLocaleString()
                    };
                    
                    localStorage.setItem('farmtora_user', JSON.stringify(sessionData));
                    this.setButtonLoading('btnAuthSubmit', false);
                    this.showPage('dashboard');
                }, 600);
            });
        }

        if (btnOut) {
            btnOut.addEventListener('click', () => {
                localStorage.removeItem('farmtora_user');
                this.showPage('auth');
            });
        }
    }

    // 10. Background Themes — Clean white theme
    setupBackgroundAnimations() {
        this.applyWhiteTheme();
    }

    applyWhiteTheme() {
        const body = document.body;
        // Clean white background for optimal visibility
        body.style.background = '#ffffff';
        body.style.color = '#1a1a1a';
    }

    showLoading(text) {
        const overlay = document.getElementById('loadingOverlay');
        const textEl = document.getElementById('loadingOverlayText');
        if (overlay) {
            if (textEl && text) textEl.textContent = text;
            overlay.classList.remove('hidden');
        }
    }

    setLoadingText(text) {
        const textEl = document.getElementById('loadingOverlayText');
        if (textEl) textEl.textContent = text;
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    // Form validation utilities
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password && password.length >= 6;
    }

    showFormError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.classList.add('invalid');
        field.style.borderColor = '#dc2626';
        
        // Remove existing error message if present
        const existingError = field.parentElement.querySelector('.form-error-message');
        if (existingError) existingError.remove();
        
        // Add new error message
        if (message) {
            const errorEl = document.createElement('div');
            errorEl.className = 'form-error-message';
            errorEl.innerHTML = `<i data-lucide="alert-circle"></i>${message}`;
            field.parentElement.appendChild(errorEl);
            lucide.createIcons();
        }
    }

    clearFormError(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        field.classList.remove('invalid');
        field.style.borderColor = '';
        
        const errorEl = field.parentElement.querySelector('.form-error-message');
        if (errorEl) errorEl.remove();
    }

    setButtonLoading(buttonId, isLoading) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
        
        if (isLoading) {
            btn.classList.add('loading');
            btn.disabled = true;
        } else {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    }

    // Enhanced upload area with better feedback
    initUploadAreaEnhancements() {
        const uploadAreas = document.querySelectorAll('.upload-area');
        uploadAreas.forEach(area => {
            // Drag and drop feedback
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--primary)';
                area.style.backgroundColor = 'rgba(22, 163, 74, 0.08)';
            });
            
            area.addEventListener('dragleave', () => {
                area.style.borderColor = 'var(--border)';
                area.style.backgroundColor = '#ffffff';
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.style.borderColor = 'var(--border)';
                area.style.backgroundColor = '#ffffff';
            });
        });
    }

    getMarketTemplate() {
        return `
            <div class="page animate-fade-in">
                <div class="subpage-header">
                    <h1 class="page-title">${this.t('marketTitle')}</h1>
                    <p class="page-subtitle">${this.t('marketSubtitle')}</p>
                </div>

                <!-- Market Summary KPIs -->
                <div class="dashboard-kpi-grid grid grid-cols-3" style="margin-bottom: 2rem;">
                    <div class="dashboard-kpi-card card glass">
                        <div class="dashboard-kpi-icon" style="background: rgba(34, 197, 94, 0.15); color: #16a34a;">
                            <i data-lucide="trending-up"></i>
                        </div>
                        <div>
                            <p class="dashboard-kpi-label">Top Gainer (sample)</p>
                            <h2 class="dashboard-kpi-value" style="font-size: 1.25rem; color: #16a34a;">Tomato (+6.8%)</h2>
                        </div>
                    </div>
                    <div class="dashboard-kpi-card card glass">
                        <div class="dashboard-kpi-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">
                            <i data-lucide="trending-down"></i>
                        </div>
                        <div>
                            <p class="dashboard-kpi-label">Top Price Drop (sample)</p>
                            <h2 class="dashboard-kpi-value" style="font-size: 1.25rem; color: #ef4444;">Onion (-4.2%)</h2>
                        </div>
                    </div>
                    <div class="dashboard-kpi-card card glass">
                        <div class="dashboard-kpi-icon" style="background: rgba(59, 130, 246, 0.15); color: #3b82f6;">
                            <i data-lucide="refresh-cw"></i>
                        </div>
                        <div>
                            <p class="dashboard-kpi-label">Data Source</p>
                            <h2 class="dashboard-kpi-value" style="font-size: 1.25rem;">${this.t('marketKpi')}</h2>
                        </div>
                    </div>
                </div>

                <!-- Search & Category Filters -->
                <div class="card glass" style="padding: 1.5rem; margin-bottom: 2rem;">
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between;">
                        <div style="position: relative; flex: 1; min-width: 250px;">
                            <input type="text" id="marketSearchInput" class="input-node" placeholder="${this.t('marketSearchPlaceholder')}" style="width: 100%; padding-left: 2.75rem;">
                            <i data-lucide="search" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); width: 1.25rem; height: 1.25rem;"></i>
                        </div>
                        <div class="market-category-filters" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                            <button class="btn btn-secondary market-cat-btn active" data-cat="all">All Crops</button>
                            <button class="btn btn-secondary market-cat-btn" data-cat="grains">Grains & Pulses</button>
                            <button class="btn btn-secondary market-cat-btn" data-cat="vegetables">Vegetables</button>
                            <button class="btn btn-secondary market-cat-btn" data-cat="cash">Cash Crops</button>
                        </div>
                    </div>
                </div>

                <!-- Crop Price Cards Grid -->
                <div id="marketCropGrid" class="grid grid-cols-3" style="gap: 1.5rem;">
                    <!-- Dynamically populated crop price cards -->
                </div>
            </div>
        `;
    }

    initMarketEvents() {
        const cropData = [
            { name: "Wheat (Sharbati)", category: "grains", price: "₹2,450 / Quintal", trend: "+3.2%", positive: true, mandi: "Kolar APMC, KA", icon: "wheat" },
            { name: "Paddy (Basmati)", category: "grains", price: "₹3,890 / Quintal", trend: "+1.8%", positive: true, mandi: "Amritsar Mandi, PB", icon: "sprout" },
            { name: "Tomato (Hybrid)", category: "vegetables", price: "₹32 / kg", trend: "+6.8%", positive: true, mandi: "Kolar Market, KA", icon: "apple" },
            { name: "Onion (Red)", category: "vegetables", price: "₹24 / kg", trend: "-4.2%", positive: false, mandi: "Lasalgaon APMC, MH", icon: "circle-dot" },
            { name: "Cotton (Medium Staple)", category: "cash", price: "₹7,120 / Quintal", trend: "+0.5%", positive: true, mandi: "Rajkot APMC, GJ", icon: "flower-2" },
            { name: "Sugarcane", category: "cash", price: "₹315 / Quintal", trend: "0.0%", positive: true, mandi: "Mandya Mandi, KA", icon: "tree-pine" },
            { name: "Maize (Yellow)", category: "grains", price: "₹2,100 / Quintal", trend: "+2.4%", positive: true, mandi: "Davangere APMC, KA", icon: "sun" },
            { name: "Potato (Jyoti)", category: "vegetables", price: "₹18 / kg", trend: "-1.5%", positive: false, mandi: "Hooghly APMC, WB", icon: "circle" },
            { name: "Soybean", category: "cash", price: "₹4,650 / Quintal", trend: "+4.1%", positive: true, mandi: "Indore Mandi, MP", icon: "leaf" }
        ];

        const renderGrid = (items) => {
            const container = document.getElementById('marketCropGrid');
            if (!container) return;

            if (items.length === 0) {
                container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 3rem;" class="card glass"><p class="text-muted">No crop prices found matching your query.</p></div>`;
                return;
            }

            container.innerHTML = items.map(c => `
                <div class="card glass animate-fade-in" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 2.75rem; height: 2.75rem; border-radius: 0.75rem; background: rgba(22, 163, 74, 0.12); display: flex; align-items: center; justify-content: center; color: var(--primary);">
                                    <i data-lucide="${c.icon}"></i>
                                </div>
                                <div>
                                    <h3 style="font-size: 1.1rem; font-weight: 600; margin: 0;">${c.name}</h3>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">${c.mandi}</span>
                                </div>
                            </div>
                            <span class="badge" style="background: ${c.positive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'}; color: ${c.positive ? '#16a34a' : '#ef4444'}; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 0.5rem; font-size: 0.85rem;">
                                ${c.trend}
                            </span>
                        </div>
                        <div style="margin-top: 1rem;">
                            <div style="font-size: 1.5rem; font-weight: 700; color: var(--text);">${c.price}</div>
                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">${this.t('sampleData')}</div>
                        </div>
                    </div>
                </div>
            `).join('');

            lucide.createIcons();
        };

        renderGrid(cropData);

        // Filter events
        const searchInput = document.getElementById('marketSearchInput');
        let currentCat = 'all';

        const filterData = () => {
            const query = (searchInput?.value || '').toLowerCase();
            const filtered = cropData.filter(item => {
                const matchesCat = currentCat === 'all' || item.category === currentCat;
                const matchesSearch = item.name.toLowerCase().includes(query) || item.mandi.toLowerCase().includes(query);
                return matchesCat && matchesSearch;
            });
            renderGrid(filtered);
        };

        if (searchInput) {
            searchInput.addEventListener('input', filterData);
        }

        document.querySelectorAll('.market-cat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.market-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCat = btn.dataset.cat;
                filterData();
            });
        });
    }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FarmtoraApp();
});
