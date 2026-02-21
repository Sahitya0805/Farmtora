'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cloud, Leaf, AlertTriangle, BookOpen, ArrowRight, MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { fetchWeatherData, searchLocations, reverseGeocode } from '@/lib/api-services';
import { useLanguage } from '@/components/language-provider';

interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
}

const Dashboard = () => {
  const { t, setLanguage } = useLanguage();
  const [backgroundIndex, setBackgroundIndex] = useState(0); // Keep for dynamic background
  const [weatherData, setWeatherData] = useState<any>(null); // Changed to any as per diff

  // Geolocation and Search State
  const [locationName, setLocationName] = useState('Locating...'); // Changed initial value
  const [currentCoords, setCurrentCoords] = useState<{ lat: number, lon: number } | null>(null); // New state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [multiLocationsWeather, setMultiLocationsWeather] = useState<any[]>([]);

  // Cities for the multi-location widget
  const defaultCities = [ // Renamed to multiLocations in the new useEffect, but keeping original name for consistency
    { name: 'Delhi, India', lat: 28.6139, lon: 77.2090 },
    { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore, India', lat: 12.9716, lon: 77.5946 },
    { name: 'Kolkata, India', lat: 22.5726, lon: 88.3639 }
  ];

  // Dynamic weather-based backgrounds (simplified for Portal theme)
  const backgrounds = [
    {
      condition: 'Clear sky',
      match: ['Clear sky', 'Mainly clear'],
      emoji: '☀️',
    },
    {
      condition: 'Cloudy',
      match: ['Partly cloudy', 'Overcast', 'Foggy', 'Foggy with rime'],
      emoji: '☁️',
    },
    {
      condition: 'Rainy',
      match: ['Light drizzle', 'Moderate drizzle', 'Dense drizzle', 'Slight rain', 'Moderate rain', 'Heavy rain', 'Slight rain showers', 'Moderate rain showers', 'Violent rain showers'],
      emoji: '🌧️',
    },
    {
      condition: 'Snow',
      match: ['Slight snow', 'Moderate snow', 'Heavy snow', 'Snow grains', 'Slight snow showers', 'Heavy snow showers'],
      emoji: '❄️',
    },
    {
      condition: 'Thunderstorm',
      match: ['Thunderstorm', 'Thunderstorm with hail', 'Thunderstorm with large hail'],
      emoji: '⛈️',
    },
    {
      condition: 'Default',
      match: [],
      emoji: '🌍',
    },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        const results = await searchLocations(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Fetch weather when coordinates change
  useEffect(() => {
    const getInitialWeather = async () => {
      if (currentCoords) {
        const data = await fetchWeatherData(currentCoords.lat, currentCoords.lon);
        if (data) {
          setWeatherData(data.current);

          // Update background based on new weather data
          const conditionLower = data.current.condition.toLowerCase();
          let bgIndex = backgrounds.findIndex(bg =>
            bg.match && bg.match.some(m => m.toLowerCase() === conditionLower)
          );

          if (bgIndex === -1) {
            if (conditionLower.includes('cloud') || conditionLower.includes('fog')) bgIndex = 1;
            else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) bgIndex = 2;
            else if (conditionLower.includes('snow')) bgIndex = 3;
            else if (conditionLower.includes('thunder')) bgIndex = 4;
            else bgIndex = 0; // Clear fallback
          }
          setBackgroundIndex(bgIndex);
        }
      }
    };
    getInitialWeather();
  }, [currentCoords]);

  // Handle Initial Geolocation and Multi-Location Weather
  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentCoords({ lat: latitude, lon: longitude });

            // Try to get a readable name and state
            const locationData = await reverseGeocode(latitude, longitude);
            if (locationData && locationData.name) {
              setLocationName(locationData.name);
              // Auto-switch language based on state ONLY if user hasn't manually set it
              const userSavedLang = localStorage.getItem('farmerApp_lang');
              if (!userSavedLang) {
                if (locationData.state === 'Karnataka') {
                  setLanguage('kn');
                } else {
                  setLanguage('en'); // Default to English for other states
                }
              }
            } else {
              setLocationName(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            // Fallback to default (Bangalore) if permission denied or error
            setCurrentCoords({ lat: 12.9716, lon: 77.5946 });
            setLocationName('Bangalore, India');
          }
        );
      } else {
        // Geolocation not supported, fallback to default
        setCurrentCoords({ lat: 12.9716, lon: 77.5946 });
        setLocationName('Bangalore, India');
      }
    };

    getUserLocation();

    // Fetch data for multi-location weather widget
    const getMultiLocationWeather = async () => {
      const results = await Promise.all(
        defaultCities.map(async (loc) => { // Using defaultCities here
          const data = await fetchWeatherData(loc.lat, loc.lon);
          return {
            name: loc.name,
            temp: data ? Math.round(data.current.temperature) : '--',
            cond: data ? data.current.condition : 'Unknown',
          };
        })
      );
      setMultiLocationsWeather(results);
    };

    getMultiLocationWeather();
  }, []); // Empty dependency array to run once on mount

  const handleSelectLocation = async (result: any) => {
    setLocationName(`${result.name}${result.country ? `, ${result.country}` : ''}`);
    setCurrentCoords({ lat: result.latitude, lon: result.longitude });
    setSearchQuery('');
    setSearchResults([]);
  };

  const currentBg = backgrounds[backgroundIndex];

  return (
    <div
      className="min-h-screen transition-all duration-500 ease-in-out flex flex-col items-center justify-start pt-8 pb-16 px-4 sm:px-8 bg-slate-50"
    >
      <div className="relative z-10 max-w-7xl w-full">

        {/* Top Nav / Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden flex items-center justify-center p-1 shrink-0">
              <img src="/logo.jpg" alt="Farmtora Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{t('app.title')}</h1>
            </div>
          </div>

          <div className="relative w-full md:w-96 z-50">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 transition-colors group-focus-within:text-orange-500" />
              <input
                type="text"
                placeholder="Search global locations..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

            {searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden shadow-lg border-2 border-slate-200 bg-white max-h-60 overflow-y-auto rounded-xl">
                {searchResults.map((res) => (
                  <div
                    key={`${res.id}-${res.latitude}-${res.longitude}`}
                    className="px-6 py-4 hover:bg-slate-50 cursor-pointer flex items-center gap-4 border-b border-slate-100 last:border-0 transition-colors"
                    onClick={() => handleSelectLocation(res)}
                  >
                    <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">{res.name}</p>
                      <p className="text-xs text-slate-500">
                        {res.admin1 ? res.admin1 + ', ' : ''}{res.country}
                      </p>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main Weather Hero (Spans 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-white border-2 border-slate-200 p-8 shadow-sm rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <div className="text-[10rem] leading-none">{currentBg.emoji}</div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8 text-slate-600 bg-slate-100 w-fit px-4 py-2 rounded-full border border-slate-200">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-sm tracking-wide">{locationName}</span>
                </div>

                {weatherData ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 mb-8">
                    <div>
                      <p className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-sm">Current Temp</p>
                      <h2 className="text-7xl sm:text-8xl font-black text-slate-800 tracking-tighter">
                        {weatherData.temperature}°
                      </h2>
                    </div>
                    <div className="h-20 w-px bg-slate-200 hidden sm:block mx-4" />
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-xs">Condition</p>
                        <p className="text-2xl font-semibold text-slate-800">{weatherData.condition}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-xs">Humidity</p>
                        <p className="text-2xl font-semibold text-blue-500">{weatherData.humidity}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse h-40 bg-slate-100 rounded-xl mb-8 w-full max-w-md" />
                )}

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-slate-800 font-semibold mb-4 text-lg">{t('dashboard.multiWeather')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {multiLocationsWeather.length > 0 ? (
                      multiLocationsWeather.map((loc, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-slate-100 transition-colors cursor-pointer">
                          <p className="text-slate-500 text-xs font-bold mb-2 truncate uppercase" title={loc.name}>
                            {loc.name.split(',')[0]}
                          </p>
                          <div className="flex items-end justify-between">
                            <span className="text-xl font-black text-slate-800">{loc.temp}°</span>
                            <span className="text-xs font-semibold text-blue-500">{loc.cond}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      [1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bento Box Grid Right Side (Spans 4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

            {/* Quick Actions / Bento Items */}
            <Link href="/weather" className="group h-full">
              <Card className="bg-white border-2 border-slate-200 p-6 h-full rounded-xl hover:border-blue-400 transition-all duration-300 hover:shadow-md relative overflow-hidden">
                <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-blue-500/10 rounded-full group-hover:scale-125 transition-transform" />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors group-hover:translate-x-1" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">{t('feature.weather.title')}</h3>
                <p className="text-sm text-slate-500 font-medium relative z-10">{t('feature.weather.desc')}</p>
              </Card>
            </Link>

            <Link href="/crops" className="group h-full">
              <Card className="bg-white border-2 border-slate-200 p-6 h-full rounded-xl hover:border-green-400 transition-all duration-300 hover:shadow-md relative overflow-hidden">
                <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-green-500/10 rounded-full group-hover:scale-125 transition-transform" />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="p-3 bg-green-50 rounded-xl text-green-500">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors group-hover:translate-x-1" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">{t('feature.crop.title')}</h3>
                <p className="text-sm text-slate-500 font-medium relative z-10">{t('feature.crop.desc')}</p>
              </Card>
            </Link>

            <div className="sm:col-span-2 lg:col-span-1 grid grid-cols-2 gap-6">
              <Link href="/cattle" className="group h-full">
                <Card className="bg-white border-2 border-slate-200 p-5 h-full rounded-xl hover:border-orange-400 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 bg-orange-50 rounded-lg text-orange-500 w-fit mb-3">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{t('nav.cattle')}</h3>
                </Card>
              </Link>
              <Link href="/farm-data" className="group h-full">
                <Card className="bg-white border-2 border-slate-200 p-5 h-full rounded-xl hover:border-purple-400 transition-all duration-300 hover:shadow-md">
                  <div className="p-2.5 bg-purple-50 rounded-lg text-purple-500 w-fit mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{t('nav.dashboard')}</h3>
                </Card>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
