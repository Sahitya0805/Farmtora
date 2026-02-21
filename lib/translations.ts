export type Language = 'en' | 'kn';

export const translations = {
    en: {
        // General
        'app.title': 'Farmtora AI Assistant',
        'app.subtitle': 'Smart Solutions for Modern Farming',
        'nav.dashboard': 'Dashboard',
        'nav.weather': 'Weather',
        'nav.crops': 'Crops',
        'nav.cattle': 'Cattle',
        'nav.market': 'Market',
        'nav.logout': 'Logout',

        // Login Page
        'login.welcome': 'Welcome. Please log in to your account.',
        'login.email': 'Email',
        'login.password': 'Password',
        'login.submit': 'Access Dashboard',

        // Dashboard
        'dashboard.welcome': 'Welcome back,',
        'dashboard.greeting': 'Farmer',
        'dashboard.overview': 'Farm Overview',
        'dashboard.quickActions': 'Quick Actions',
        'dashboard.weatherSummary': 'Weather Summary',
        'dashboard.multiWeather': 'Multi-Location Weather',
        'dashboard.recentAlerts': 'Recent Alerts',
        'dashboard.advisories': 'Government Advisories',
        'dashboard.research': 'Research & News',

        // Features Items
        'feature.crop.title': 'Crop Disease Detection',
        'feature.crop.desc': 'Upload photos of your crops for instant AI disease analysis & treatment recommendations.',
        'feature.weather.title': 'Weather Intelligence',
        'feature.weather.desc': 'Hourly localized tracking and severe weather prediction algorithms for your region.',
        'feature.cattle.title': 'Cattle Health Monitoring',
        'feature.cattle.desc': 'Visual AI diagnostics for livestock monitoring and early health concern detection.',
        'feature.data.title': 'Farm Data Visualization',
        'feature.data.desc': 'Interactive analytics dashboard tracking your yield, soil health, and financial metrics over time.',

        'action.trynow': 'Try Now',
        'action.viewforecast': 'View Full Forecast',

        // Weather Page
        'weather.title': 'Weather Intelligence',
        'weather.subtitle': 'Real-time agricultural data',
        'weather.search': 'Search global locations...',
        'weather.currentLocal': 'Current local observation',
        'weather.humidity': 'Humidity',
        'weather.wind': 'Wind',
        'weather.uv': 'UV',
        'weather.precip': 'Precip',
        'weather.7day': '7-Day Forecast',
        'weather.high': 'High',
        'weather.low': 'Low',

        // Crops Page
        'crops.title': 'Crop Disease Detection',
        'crops.subtitle': 'Upload an image to detect crop diseases',
        'crops.upload.title': 'Click to upload or drag and drop',
        'crops.upload.desc': 'PNG, JPG, GIF up to 10MB',
        'crops.upload.button': 'Detect Disease',
        'crops.upload.analyzing': 'Analyzing...',
        'crops.result.uploadAnother': 'Upload Another Image',
        'crops.result.critical': 'Critical Action Required',
        'crops.result.attention': 'Attention Recommended',
        'crops.result.healthy': 'Plant Appears Healthy',
        'crops.result.identified': 'Identified:',
        'crops.result.reportDesc': 'Automated visual diagnostics report.',
        'crops.result.severity': 'Severity',
        'crops.result.confidence': 'Confidence',
        'crops.result.quickAction': 'Quick Action Required',
        'crops.result.statusInfo': 'Status Information',
        'crops.result.treatments': 'Recommended Treatments',
        'crops.result.prevention': 'Prevention & Management',
        'crops.history.title': 'Detection History',

        // Cattle Page
        'cattle.title': 'Cattle Breed Identification',
        'cattle.subtitle': 'Upload an image to identify cattle breeds and get health insights',
        'cattle.healthAlert': 'Health Alert Detected',
        'cattle.urgent': 'Urgent attention may be required',
        'cattle.characteristics': 'Breed Characteristics',
        'cattle.origin': 'Origin',
        'cattle.production': 'Production Capacity',
        'cattle.healthPoints': 'Health Monitoring Points',
        'cattle.treatmentTips': 'Treatment & Care Tips',
    },
    kn: {
        // General
        'app.title': 'Farmtora AI ಸಹಾಯಕ',
        'app.subtitle': 'ಆಧುನಿಕ ಕೃಷಿಗೆ ಸ್ಮಾರ್ಟ್ ಪರಿಹಾರಗಳು',
        'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        'nav.weather': 'ಹವಾಮಾನ',
        'nav.crops': 'ಬೆಳೆಗಳು',
        'nav.cattle': 'ಜಾನುವಾರು',
        'nav.market': 'ಮಾರುಕಟ್ಟೆ',
        'nav.logout': 'ಲಾಗ್ಔಟ್',

        // Login Page
        'login.welcome': 'ಸ್ವಾಗತ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ.',
        'login.email': 'ಇಮೇಲ್ (Email)',
        'login.password': 'ಪಾಸ್‌ವರ್ಡ್ (Password)',
        'login.submit': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಿ',

        // Dashboard
        'dashboard.welcome': 'ಮರಳಿ ಸ್ವಾಗತ,',
        'dashboard.greeting': 'ರೈತ',
        'dashboard.overview': 'ಕೃಷಿ ಅವಲೋಕನ',
        'dashboard.quickActions': 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
        'dashboard.weatherSummary': 'ಹವಾಮಾನ ಸಾರಾಂಶ',
        'dashboard.multiWeather': 'ಬಹು-ಸ್ಥಳಗಳ ಹವಾಮಾನ',
        'dashboard.recentAlerts': 'ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆಗಳು',
        'dashboard.advisories': 'ಸರ್ಕಾರಿ ಸಲಹೆಗಳು',
        'dashboard.research': 'ಸಂಶೋಧನೆ ಮತ್ತು ಸುದ್ದಿ',

        // Features Items
        'feature.crop.title': 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
        'feature.crop.desc': 'ತಕ್ಷಣದ ಎಐ ರೋಗ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ನಿಮ್ಮ ಬೆಳೆಗಳ ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
        'feature.weather.title': 'ಹವಾಮಾನ ಗುಪ್ತಚರ',
        'feature.weather.desc': 'ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕಾಗಿ ಗಂಟೆಗೊಮ್ಮೆ ಸ್ಥಳೀಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ತೀವ್ರ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಕ್ರಮಾವಳಿಗಳು.',
        'feature.cattle.title': 'ಜಾನುವಾರು ಆರೋಗ್ಯ ನಿಗಾ',
        'feature.cattle.desc': 'ಜಾನುವಾರುಗಳ ನಿಗಾ ಮತ್ತು ಆರಂಭಿಕ ಆರೋಗ್ಯ ಕಾಳಜಿ ಪತ್ತೆಗಾಗಿ ದೃಶ್ಯ ಎಐ ರೋಗನಿರ್ಣಯ.',
        'feature.data.title': 'ಕೃಷಿ ದತ್ತಾಂಶ ದೃಶ್ಯೀಕರಣ',
        'feature.data.desc': 'ನಿಮ್ಮ ಇಳುವರಿ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಕಾಲಾನಂತರದಲ್ಲಿ ಆರ್ಥಿಕ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವ ಸಂವಾದಾತ್ಮಕ ಅನಾಲಿಟಿಕ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',

        'action.trynow': 'ಈಗ ಪ್ರಯತ್ನಿಸಿ',
        'action.viewforecast': 'ಪೂರ್ಣ ಮುನ್ಸೂಚನೆ ವೀಕ್ಷಿಸಿ',

        // Weather Page
        'weather.title': 'ಹವಾಮಾನ ಗುಪ್ತಚರ',
        'weather.subtitle': 'ನೈಜ-ಸಮಯದ ಕೃಷಿ ದತ್ತಾಂಶ',
        'weather.search': 'ಜಾಗತಿಕ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ...',
        'weather.currentLocal': 'ಪ್ರಸ್ತುತ ಸ್ಥಳೀಯ ವೀಕ್ಷಣೆ',
        'weather.humidity': 'ಆರ್ದ್ರತೆ',
        'weather.wind': 'ಗಾಳಿ',
        'weather.uv': 'ಯುವಿ (UV)',
        'weather.precip': 'ಮಳೆ',
        'weather.7day': '7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ',
        'weather.high': 'ಗರಿಷ್ಠ',
        'weather.low': 'ಕನಿಷ್ಠ',

        // Crops Page
        'crops.title': 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
        'crops.subtitle': 'ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಹಚ್ಚಲು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        'crops.upload.title': 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ಎಳೆದು ಬಿಡಿ',
        'crops.upload.desc': '10MB ವರೆಗಿನ PNG, JPG, GIF',
        'crops.upload.button': 'ರೋಗವನ್ನು ಪತ್ತೆಮಾಡಿ',
        'crops.upload.analyzing': 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
        'crops.result.uploadAnother': 'ಮತ್ತೊಂದು ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        'crops.result.critical': 'ನಿರ್ಣಾಯಕ ಕ್ರಿಯೆ ಅಗತ್ಯವಿದೆ',
        'crops.result.attention': 'ಗಮನ ಹರಿಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ',
        'crops.result.healthy': 'ಸಸ್ಯವು ಆರೋಗ್ಯಕರವಾಗಿದೆ',
        'crops.result.identified': 'ಗುರುತಿಸಲಾಗಿದೆ:',
        'crops.result.reportDesc': 'ಸ್ವಯಂಚಾಲಿತ ದೃಶ್ಯ ರೋಗನಿರ್ಣಯ ವರದಿ.',
        'crops.result.severity': 'ತೀವ್ರತೆ',
        'crops.result.confidence': 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
        'crops.result.quickAction': 'ತ್ವರಿತ ಕ್ರಿಯೆ ಅಗತ್ಯವಿದೆ',
        'crops.result.statusInfo': 'ಸ್ಥಿತಿ ಮಾಹಿತಿ',
        'crops.result.treatments': 'ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆಗಳು',
        'crops.result.prevention': 'ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ನಿರ್ವಹಣೆ',
        'crops.history.title': 'ಪತ್ತೆ ಇತಿಹಾಸ',

        // Cattle Page
        'cattle.title': 'ಜಾನುವಾರು ತಳಿ ಗುರುತಿಸುವಿಕೆ',
        'cattle.subtitle': 'ಜಾನುವಾರು ತಳಿಗಳನ್ನು ಗುರುತಿಸಲು ಹಾಗೂ ಆರೋಗ್ಯದ ಒಳನೋಟಗಳನ್ನು ಪಡೆಯಲು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        'cattle.healthAlert': 'ಆರೋಗ್ಯ ಎಚ್ಚರಿಕೆ ಪತ್ತೆಯಾಗಿದೆ',
        'cattle.urgent': 'ತುರ್ತು ಗಮನ ಹರಿಸುವುದು ಅಗತ್ಯವಿರಬಹುದು',
        'cattle.characteristics': 'ತಳಿಯ ಲಕ್ಷಣಗಳು',
        'cattle.origin': 'ಮೂಲ',
        'cattle.production': 'ಉತ್ಪಾದನಾ ಸಾಮರ್ಥ್ಯ',
        'cattle.healthPoints': 'ಆರೋಗ್ಯ ನಿಗಾ ಬಿಂದುಗಳು',
        'cattle.treatmentTips': 'ಚಿಕಿತ್ಸೆ ಮತ್ತು ಆರೈಕೆ ಸಲಹೆಗಳು',
    }
};
