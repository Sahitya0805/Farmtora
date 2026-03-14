// API Services for Agricultural Data Integration

// Weather API - Using Open-Meteo (free, no API key required)
export const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('Weather API failed');
    const data = await response.json();

    return {
      current: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        condition: getWeatherCondition(data.current.weather_code),
        precipitation: data.current.precipitation,
        uvIndex: data.current.uv_index,
        weatherCode: data.current.weather_code,
      },
      daily: data.daily,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
};

function getWeatherCondition(code: number): string {
  const conditions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy with rime',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with large hail',
  };
  return conditions[code] || 'Unknown';
}

// Geocoding API - Search for locations
export const searchLocations = async (query: string) => {
  try {
    if (!query || query.length < 2) return [];

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
      { cache: 'no-store' }
    );

    if (!response.ok) throw new Error('Geocoding API failed');
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((result: any) => ({
      id: result.id,
      name: result.name,
      country: result.country,
      admin1: result.admin1, // State/Province
      latitude: result.latitude,
      longitude: result.longitude,
    }));
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
};

// Reverse Geocoding API - Get location name from coordinates
export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en' // Preference for English names
        }
      }
    );

    if (!response.ok) throw new Error('Reverse geocoding API failed');
    const data = await response.json();

    if (data && data.address) {
      // Try to get city, town, or village, fallback to county or state
      const city = data.address.city || data.address.town || data.address.village || data.address.county;
      const country = data.address.country;
      const state = data.address.state;

      let displayName = null;
      if (city && country) {
        displayName = `${city}, ${country}`;
      } else if (data.display_name) {
        // Fallback to a shortened version of the full display name
        displayName = data.display_name.split(',').slice(0, 2).join(', ');
      }
      return { name: displayName, state: state };
    }
    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

// Helper function to create a simple hash of a string
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Crop Disease Detection using Plant.id API (Free tier available)
// For demo purposes, we'll use mock data as Plant.id requires authentication
export const detectCropDisease = async (imageBase64: string) => {
  try {
    // Generate a deterministic number based on the image content
    const hash = hashString(imageBase64);

    // Use the hash to make a deterministic "random" choice
    const isHealthy = hash % 3 === 0;

    // Use the hash to pick a specific disease if not healthy
    const diseases = ['Blossom End Rot', 'Early Blight', 'Late Blight', 'Powdery Mildew', 'Leaf Spot', 'Fusarium Wilt'];
    const diseaseName = isHealthy ? 'Healthy Crop' : diseases[hash % diseases.length];

    // Generate a deterministic confidence between 0.85 and 0.99
    const confidence = 0.85 + ((hash % 15) / 100);
    const severity = diseaseName === 'Healthy Crop' ? 'low' :
      (hash % 2 === 0 ? 'high' : 'medium');

    const mockResult = { name: diseaseName, confidence, severity };

    return {
      disease: mockResult.name,
      confidence: mockResult.confidence,
      severity: mockResult.severity,
      treatments: getDiseaseInformation(mockResult.name).treatments,
      preventionMeasures: getDiseaseInformation(mockResult.name).prevention,
    };
  } catch (error) {
    console.error('Disease detection error:', error);
    return null;
  }
};

// Cattle Breed Identification using TensorFlow.js or mock
export const identifyCattleBreed = async (imageBase64: string) => {
  try {
    const breeds = [
      { name: 'Holstein-Friesian', confidenceBase: 0.94, origin: 'Netherlands' },
      { name: 'Jersey', confidenceBase: 0.87, origin: 'United Kingdom' },
      { name: 'Brahman', confidenceBase: 0.91, origin: 'India' },
      { name: 'Gir', confidenceBase: 0.89, origin: 'India' },
      { name: 'Sahiwal', confidenceBase: 0.85, origin: 'Pakistan' },
      { name: 'Red Sindhi', confidenceBase: 0.88, origin: 'Pakistan' },
      { name: 'Crossbreed', confidenceBase: 0.92, origin: 'Mixed' },
    ];

    const hash = hashString(imageBase64);

    // Deterministically pick a breed based on image hash
    const breedIndex = hash % breeds.length;
    const randomBreed = breeds[breedIndex];

    // Deterministically calculate confidence score
    const confidence = randomBreed.confidenceBase + ((hash % 5) / 100);

    // Deterministically decide if the cattle has a disease (e.g. 1 in 4 chance)
    const hasDisease = hash % 4 === 0;

    return {
      breed: randomBreed.name,
      confidence: confidence,
      origin: randomBreed.origin,
      characteristics: getCattleBreedInfo(randomBreed.name).characteristics,
      healthConcerns: getCattleBreedInfo(randomBreed.name).healthConcerns,
      productionCapacity: getCattleBreedInfo(randomBreed.name).productionCapacity,
      treatmentTips: getCattleBreedInfo(randomBreed.name).treatmentTips,
      diseaseDetected: hasDisease ? {
        name: 'Lumpy Skin Disease (LSD)',
        confidence: 0.85 + ((hash % 10) / 100),
        severity: (hash % 2 === 0) ? 'High' : 'Medium',
        description: 'A viral disease of cattle characterized by fever, enlarged superficial lymph nodes, and multiple nodules (measuring 2-5 cm) on the skin and mucous membranes.',
        treatments: [
          'Immediate isolation of the infected animal',
          'Administer antibiotics to prevent secondary skin infections',
          'Provide anti-inflammatory drugs to reduce fever and pain',
          'Ensure easy access to clean water and soft feed',
          'Notify local veterinary authorities immediately'
        ]
      } : undefined
    };
  } catch (error) {
    console.error('Breed identification error:', error);
    return null;
  }
};

// Soil Analysis using hash of image for deterministic results
export const analyzeSoil = async (imageBase64: string) => {
  try {
    const hash = hashString(imageBase64);
    const soilTypes = ['Loamy', 'Sandy', 'Clay', 'Silty', 'Peaty', 'Saline'];
    const soilType = soilTypes[hash % soilTypes.length];
    const confidence = 0.92 + ((hash % 5) / 100); // High confidence 92-96%

    const info = getSoilInformation(soilType);

    // Realistic deterministic metrics based on soil type
    let moisture = 0, nitrogen = 0, phosphorus = 0, potassium = 0, ph = 7.0;

    switch (soilType) {
      case 'Loamy':
        moisture = 45 + (hash % 15);
        nitrogen = 40 + (hash % 10);
        phosphorus = 35 + (hash % 10);
        potassium = 40 + (hash % 10);
        ph = 6.5 + ((hash % 10) / 20);
        break;
      case 'Sandy':
        moisture = 15 + (hash % 10);
        nitrogen = 10 + (hash % 10);
        phosphorus = 15 + (hash % 10);
        potassium = 10 + (hash % 10);
        ph = 5.8 + ((hash % 10) / 10);
        break;
      case 'Clay':
        moisture = 65 + (hash % 15);
        nitrogen = 30 + (hash % 15);
        phosphorus = 25 + (hash % 15);
        potassium = 50 + (hash % 15);
        ph = 7.2 + ((hash % 10) / 10);
        break;
      case 'Silty':
        moisture = 55 + (hash % 15);
        nitrogen = 35 + (hash % 10);
        phosphorus = 30 + (hash % 10);
        potassium = 45 + (hash % 10);
        ph = 6.8 + ((hash % 10) / 20);
        break;
      case 'Peaty':
        moisture = 75 + (hash % 15);
        nitrogen = 50 + (hash % 20);
        phosphorus = 15 + (hash % 10);
        potassium = 20 + (hash % 10);
        ph = 4.5 + ((hash % 10) / 10);
        break;
      case 'Saline':
        moisture = 30 + (hash % 15);
        nitrogen = 15 + (hash % 10);
        phosphorus = 20 + (hash % 10);
        potassium = 30 + (hash % 10);
        ph = 8.5 + ((hash % 10) / 10);
        break;
    }

    return {
      soilType: soilType,
      confidence: confidence,
      metrics: {
        moisture,
        nitrogen,
        phosphorus,
        potassium,
        ph: parseFloat(ph.toFixed(1)),
      },
      recommendations: info.recommendations,
      managementTips: info.managementTips,
    };
  } catch (error) {
    console.error('Soil analysis error:', error);
    return null;
  }
};

// Export for use in crops page
export function getDiseaseInformation(
  diseaseName: string
): {
  treatments: string[];
  prevention: string[];
} {
  const diseaseDatabase: { [key: string]: { treatments: string[]; prevention: string[] } } = {
    'Healthy Crop': {
      treatments: [
        'No immediate action required',
        'Continue regular maintenance schedule',
      ],
      prevention: [
        'Maintain current watering schedule',
        'Continue routine nutrient applications',
        'Conduct weekly visual inspections',
      ],
    },
    'Blossom End Rot': {
      treatments: [
        'Apply calcium chloride foliar spray immediately',
        'Maintain consistent soil moisture levels',
        'Remove severely affected fruits to redirect plant energy',
        'Apply organic mulch to retain soil moisture',
      ],
      prevention: [
        'Ensure adequate calcium in soil before planting',
        'Water consistently, avoiding dry/wet cycles',
        'Avoid excessive nitrogen fertilization',
        'Do not damage roots during cultivation',
      ],
    },
    'Early Blight': {
      treatments: [
        'Remove infected leaves immediately',
        'Apply chlorothalonil fungicide',
        'Use copper-sulfur sprays',
        'Apply mancozeb regularly',
      ],
      prevention: [
        'Maintain proper plant spacing',
        'Avoid overhead irrigation',
        'Remove crop debris',
        'Rotate crops annually',
        'Use certified seeds',
      ],
    },
    'Late Blight': {
      treatments: [
        'Apply metalaxyl fungicides',
        'Use chlorothalonil spray',
        'Remove infected plant parts immediately',
        'Apply Bordeaux mixture',
      ],
      prevention: [
        'Use resistant varieties',
        'Ensure good drainage',
        'Avoid overhead watering',
        'Monitor weather conditions',
        'Destroy infected tubers',
      ],
    },
    'Powdery Mildew': {
      treatments: [
        'Apply sulfur dust',
        'Use wettable sulfur spray',
        'Apply potassium bicarbonate',
        'Use neem oil spray',
      ],
      prevention: [
        'Maintain adequate air circulation',
        'Reduce plant density',
        'Avoid excessive nitrogen',
        'Monitor relative humidity',
      ],
    },
    'Leaf Spot': {
      treatments: [
        'Remove infected leaves',
        'Apply copper fungicide',
        'Use mancozeb spray',
        'Apply chlorothalonil',
      ],
      prevention: [
        'Improve air circulation',
        'Avoid wet leaves',
        'Sanitize tools',
        'Remove plant debris',
      ],
    },
    'Fusarium Wilt': {
      treatments: [
        'Remove infected plants',
        'Apply soil fungicides',
        'Use trichoderma treatment',
        'Improve soil drainage',
      ],
      prevention: [
        'Use resistant varieties',
        'Practice crop rotation',
        'Sterilize soil',
        'Avoid waterlogging',
      ],
    },
  };

  return (
    diseaseDatabase[diseaseName] || {
      treatments: ['Consult local agricultural expert', 'Monitor plant condition'],
      prevention: ['Maintain crop hygiene', 'Regular inspection'],
    }
  );
}

// Export for use in cattle page
export function getCattleBreedInfo(
  breedName: string
): {
  characteristics: string[];
  healthConcerns: string[];
  productionCapacity: string;
  treatmentTips: string[];
} {
  const breedDatabase: {
    [key: string]: {
      characteristics: string[];
      healthConcerns: string[];
      productionCapacity: string;
      treatmentTips: string[];
    };
  } = {
    'Holstein-Friesian': {
      characteristics: ['Large frame', 'Black and white patches', 'High milk production', 'Excellent for dairy'],
      healthConcerns: ['Heat sensitivity', 'Mastitis susceptibility', 'Foot problems'],
      productionCapacity: '25-30 liters/day milk production',
      treatmentTips: ['Provide adequate shade and cooling systems', 'Regular udder hygiene checks', 'Frequent hoof trimming schedule'],
    },
    Jersey: {
      characteristics: ['Small frame', 'Light tan color', 'High butterfat milk', 'Docile temperament'],
      healthConcerns: ['Susceptibility to metabolic disorders', 'Heat stress', 'Reproductive issues'],
      productionCapacity: '12-16 liters/day high butterfat milk',
      treatmentTips: ['Monitor calcium levels closely post-calving', 'Access to fresh, clean water at all times', 'Regular reproductive health screening'],
    },
    Brahman: {
      characteristics: ['Heat tolerant', 'Hump on shoulders', 'Loose skin', 'Drought resistant'],
      healthConcerns: ['Slow growth', 'Heat tolerance issues in improper handling'],
      productionCapacity: 'Good meat production, moderate milk',
      treatmentTips: ['Ensure low-stress handling practices', 'Provide supplemental feeding during dry periods', 'Regular tick and parasite control'],
    },
    Gir: {
      characteristics: ['Brown color', 'Large hump', 'Heat tolerant', 'Native to India'],
      healthConcerns: ['Tick susceptibility', 'Heat stress management needed'],
      productionCapacity: '10-12 liters/day milk, good immunity',
      treatmentTips: ['Implement strict endoparasite and ectoparasite control routine', 'Provide high-quality forage', 'Regular vaccination against endemic diseases'],
    },
    Sahiwal: {
      characteristics: ['Red color', 'Large frame', 'Heat tolerant', 'Good converter'],
      healthConcerns: ['Leg problems', 'Udder health management'],
      productionCapacity: '8-10 liters/day milk, heat tolerant',
      treatmentTips: ['Regular hoof and leg examinations', 'Maintain clean and dry resting areas', 'Immediate treatment of minor scratches to prevent infection'],
    },
    'Red Sindhi': {
      characteristics: ['Red color', 'Compact frame', 'Heat resistant', 'Good meat quality'],
      healthConcerns: ['Lower milk production', 'Management sensitivity'],
      productionCapacity: '6-8 liters/day milk, good meat',
      treatmentTips: ['Optimize nutrition for milk yield', 'Consistent handling routines to reduce stress', 'Monitor body condition score (BCS)'],
    },
    Crossbreed: {
      characteristics: ['Variable characteristics', 'Hybrid vigor', 'Adaptable'],
      healthConcerns: ['Depend on parent breeds'],
      productionCapacity: 'Highly variable, generally high productivity',
      treatmentTips: ['Tailor treatment plan to dominant parent breed traits', 'Maintain rigorous general health protocol', 'Consult veterinarian for specific susceptibilities'],
    },
  };

  return (
    breedDatabase[breedName] || {
      characteristics: ['Unknown characteristics'],
      healthConcerns: ['Consult veterinarian'],
      productionCapacity: 'Variable',
      treatmentTips: ['Consult local veterinarian for comprehensive care plan'],
    }
  );
}

export function getSoilInformation(
  soilType: string
): {
  recommendations: { crop: string; reason: string; duration: string }[];
  managementTips: string[];
} {
  const soilDatabase: {
    [key: string]: {
      recommendations: { crop: string; reason: string; duration: string }[];
      managementTips: string[];
    };
  } = {
    'Loamy': {
      recommendations: [
        { crop: 'Wheat', reason: 'Balanced nutrients and good drainage.', duration: '4-6 months' },
        { crop: 'Cotton', reason: 'Retains moisture well for deep roots.', duration: '6-8 months' },
        { crop: 'Sugarcane', reason: 'High organic matter supports growth.', duration: '12-18 months' }
      ],
      managementTips: ['Maintain organic matter with compost.', 'Regular crop rotation.', 'Optimize irrigation.']
    },
    'Sandy': {
      recommendations: [
        { crop: 'Watermelon', reason: 'Prefers warm, well-drained soil.', duration: '3 months' },
        { crop: 'Peanuts', reason: 'Loose texture allows for pod growth.', duration: '4-5 months' },
        { crop: 'Carrots', reason: 'Easy root penetration in loose soil.', duration: '3-4 months' }
      ],
      managementTips: ['Increase watering frequency.', 'Add organic mulch.', 'Use slow-release fertilizers.']
    },
    'Clay': {
      recommendations: [
        { crop: 'Paddy (Rice)', reason: 'Holds water exceptionally well.', duration: '4-5 months' },
        { crop: 'Broccoli', reason: 'High nutrient retention beneficial.', duration: '3 months' },
        { crop: 'Cabbage', reason: 'Strong root system for heavy soil.', duration: '3 months' }
      ],
      managementTips: ['Improve drainage.', 'Avoid tilling when wet.', 'Add gypsum to improve structure.']
    },
    'Silty': {
      recommendations: [
        { crop: 'Corn', reason: 'Highly fertile and holds moisture.', duration: '3-4 months' },
        { crop: 'Tomatoes', reason: 'Good texture for root development.', duration: '3-4 months' },
        { crop: 'Lettuce', reason: 'Fast growth in fertile silt.', duration: '2 months' }
      ],
      managementTips: ['Prevent compaction.', 'Use cover crops.', 'Monitor moisture levels closely.']
    },
    'Peaty': {
      recommendations: [
        { crop: 'Blueberries', reason: 'Thrives in acidic, organic soil.', duration: 'Perennial' },
        { crop: 'Onions', reason: 'High organic content supports bulb size.', duration: '4 months' },
        { crop: 'Potatoes', reason: 'Acidic preference and easy harvesting.', duration: '3-4 months' }
      ],
      managementTips: ['Manage acidity with lime if needed.', 'Ensure proper drainage.', 'Monitor for excessive moisture.']
    },
    'Saline': {
      recommendations: [
        { crop: 'Barley', reason: 'Highest salt tolerance among cereals.', duration: '4 months' },
        { crop: 'Date Palm', reason: 'Extremely tolerant to high salinity.', duration: 'Years' },
        { crop: 'Spinach', reason: 'Moderately tolerant to salt.', duration: '2 months' }
      ],
      managementTips: ['Leach excess salts with fresh water.', 'Use salt-tolerant varieties.', 'Improve soil flushing.']
    }
  };

  return (
    soilDatabase[soilType] || {
      recommendations: [{ crop: 'Consult expert', reason: 'Unknown soil type', duration: 'N/A' }],
      managementTips: ['Soil testing recommended'],
    }
  );
}

// Fetch Government Agricultural Advisories
export const fetchGovernmentAdvisories = async () => {
  try {
    // Mock government advisory data
    const advisories = [
      {
        title: 'Monsoon Preparation Guide for Farmers',
        content:
          'Prepare your fields for monsoon by ensuring proper drainage, soil testing, and seed selection. Recommended crops: Rice, Maize, Pulses.',
        source: 'Ministry of Agriculture & Farmers Welfare',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'government_advisory',
      },
      {
        title: 'Pest Management During Dry Season',
        content:
          'Common pests during dry season include locusts and stem borers. Recommended control measures: Integrated pest management, regular monitoring.',
        source: 'ICAR - Indian Council of Agricultural Research',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'government_advisory',
      },
      {
        title: 'Soil Health Management',
        content:
          'Conduct soil testing every 2 years. Use organic matter, maintain proper pH levels, and practice crop rotation for better soil health.',
        source: 'National Soil Health Card Scheme',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'government_advisory',
      },
    ];

    return advisories;
  } catch (error) {
    console.error('Advisory fetch error:', error);
    return [];
  }
};

// Fetch Research Articles on Agricultural Practices
export const fetchResearchArticles = async () => {
  try {
    const articles = [
      {
        title: 'Impact of Climate Change on Crop Yields',
        content:
          'Recent research shows 15-20% variation in yields due to climate changes. Adopting climate-resilient varieties can mitigate risks.',
        source: 'CGIAR Research Programs',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'research',
      },
      {
        title: 'Precision Farming Techniques for Small Holdings',
        content:
          'Small farmers can increase productivity by 30-40% using precision farming, drip irrigation, and targeted fertilizer application.',
        source: 'International Water Management Institute',
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'research',
      },
      {
        title: 'Sustainable Livestock Management',
        content:
          'Implement rotational grazing, breed selection, and health monitoring to improve cattle productivity and sustainability.',
        source: 'FAO - Food and Agriculture Organization',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'research',
      },
    ];

    return articles;
  } catch (error) {
    console.error('Research fetch error:', error);
    return [];
  }
};
