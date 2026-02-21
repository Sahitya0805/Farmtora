'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cloud, Droplets, Wind, Eye, Gauge, Search, MapPin, Sun, CloudRain, CloudLightning, Snowflake, CloudFog, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { fetchWeatherData, searchLocations, reverseGeocode } from '@/lib/api-services';
import { addWeatherRecord, getWeatherRecords } from '@/lib/db';
import { useLanguage } from '@/components/language-provider';

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    precipitation: number;
    uvIndex: number;
  };
  daily?: any;
  timezone?: string;
}

const WeatherPage = () => {
  const { t, setLanguage } = useLanguage();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Pune, India');
  const [coords, setCoords] = useState({ lat: 18.5204, lon: 73.8567 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const initLocation = () => {
      // 1. Try to load from localStorage on mount
      const savedLocation = localStorage.getItem('farmerApp_location');
      const savedLat = localStorage.getItem('farmerApp_lat');
      const savedLon = localStorage.getItem('farmerApp_lon');

      if (savedLocation && savedLat && savedLon) {
        setLocation(savedLocation);
        setCoords({ lat: parseFloat(savedLat), lon: parseFloat(savedLon) });
        return; // Prioritize explicit user selection
      }

      // 2. Fallback to Geolocation API if no saved preference
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ lat: latitude, lon: longitude });

            // Try to get a readable name and state
            const locationData = await reverseGeocode(latitude, longitude);
            if (locationData && locationData.name) {
              setLocation(locationData.name);
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
              setLocation('Current Location');
            }
          },
          (error) => {
            console.error("Error getting location:", error);
            // Fallback to default (Pune) if permission denied
            setCoords({ lat: 18.5204, lon: 73.8567 });
            setLocation('Pune, India');
          }
        );
      }
    };

    initLocation();
  }, []);

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

  const handleSelectLocation = (result: any) => {
    const newLocation = `${result.name}, ${result.admin1 ? result.admin1 + ', ' : ''}${result.country}`;
    setLocation(newLocation);
    setCoords({ lat: result.latitude, lon: result.longitude });
    setSearchQuery('');
    setSearchResults([]);

    localStorage.setItem('farmerApp_location', newLocation);
    localStorage.setItem('farmerApp_lat', result.latitude.toString());
    localStorage.setItem('farmerApp_lon', result.longitude.toString());
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });

          // Try to get a readable name and state
          const locationData = await reverseGeocode(latitude, longitude);
          if (locationData && locationData.name) {
            setLocation(locationData.name);
            localStorage.setItem('farmerApp_location', locationData.name);
            localStorage.setItem('farmerApp_lat', latitude.toString());
            localStorage.setItem('farmerApp_lon', longitude.toString());

            // Auto-switch language based on state ONLY if user hasn't manually set it
            const userSavedLang = localStorage.getItem('farmerApp_lang');
            if (!userSavedLang) {
              if (locationData.state === 'Karnataka') {
                setLanguage('kn');
              } else {
                setLanguage('en');
              }
            }
          } else {
            const fallbackName = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
            setLocation(fallbackName);
            localStorage.setItem('farmerApp_location', fallbackName);
            localStorage.setItem('farmerApp_lat', latitude.toString());
            localStorage.setItem('farmerApp_lon', longitude.toString());
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert('Could not retrieve your location. Check browser settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        // Fetch from API using dynamic coordinates
        const data = await fetchWeatherData(coords.lat, coords.lon);

        if (data) {
          setWeatherData(data);

          // Save to database
          await addWeatherRecord({
            timestamp: Date.now(),
            location,
            temperature: data.current.temperature,
            humidity: data.current.humidity,
            windSpeed: data.current.windSpeed,
            condition: data.current.condition,
            precipitation: data.current.precipitation,
            uvIndex: data.current.uvIndex,
          });
        }

        // Load historical records
        const historicalRecords = await getWeatherRecords(location);
        setRecords(historicalRecords);
      } catch (error) {
        console.error('Error loading weather:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [coords, location]);

  const getWeatherIcon = (code: number, className: string = "w-6 h-6") => {
    if (code === 0 || code === 1) return <Sun className={`${className} text-yellow-500`} />;
    if (code === 2 || code === 3 || code === 45 || code === 48) return <CloudFog className={`${className} text-gray-400`} />;
    if (code >= 51 && code <= 67) return <CloudRain className={`${className} text-blue-500`} />;
    if (code >= 71 && code <= 86) return <Snowflake className={`${className} text-cyan-500`} />;
    if (code >= 95) return <CloudLightning className={`${className} text-purple-500`} />;
    return <Cloud className={`${className} text-gray-400`} />; // Default fallback
  };

  // Helper to format date into short day name
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8 selection:bg-accent/30">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-gray-100 text-gray-800 border-gray-200">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-accent tracking-tight">{t('weather.title')}</h1>
              <p className="text-gray-600 font-medium tracking-wide">{t('weather.subtitle')}</p>
            </div>
          </div>

          {/* Search Bar & GPS */}
          <div className="relative w-full md:w-auto flex items-center gap-2 z-50">
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-accent" />
              <input
                type="text"
                placeholder={t('weather.search')}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

            <Button
              variant="outline"
              className="p-0 w-14 h-14 bg-white border-gray-200 rounded-2xl hover:bg-green-50 shadow-sm transition-all focus:ring-2 focus:ring-accent"
              title="Locate Me"
              onClick={handleGetLocation}
            >
              <Navigation className="w-5 h-5 text-accent" />
            </Button>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden shadow-xl border border-gray-100 bg-white max-h-60 overflow-y-auto rounded-2xl">
                {searchResults.map((res) => (
                  <div
                    key={`${res.id}-${res.latitude}-${res.longitude}`}
                    className="px-6 py-4 hover:bg-green-50 cursor-pointer flex items-center gap-4 border-b border-gray-100 last:border-0 transition-colors"
                    onClick={() => handleSelectLocation(res)}
                  >
                    <MapPin className="w-5 h-5 text-accent shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{res.name}</p>
                      <p className="text-xs text-gray-500">
                        {res.admin1 ? res.admin1 + ', ' : ''}{res.country}
                      </p>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>

        {weatherData && (
          <div className="space-y-8">
            {/* Current Weather Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Main Current Hero */}
              <div className="lg:col-span-8">
                <Card className="bg-white border-0 p-8 shadow-lg rounded-3xl h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-8 text-accent bg-green-50 w-fit px-4 py-2 rounded-full border border-green-100">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium text-sm tracking-wide">{location}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                      <div>
                        <h2 className="text-8xl sm:text-9xl font-bold text-gray-800 tracking-tight">
                          {weatherData.current.temperature}°
                        </h2>
                      </div>
                      <div className="h-24 w-px bg-gray-200 hidden sm:block mx-2" />
                      <div className="space-y-3">
                        <p className="text-3xl font-semibold text-accent">{weatherData.current.condition}</p>
                        <p className="text-gray-600 font-medium tracking-wide">
                          {t('weather.currentLocal')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Metrics Grid */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-6">
                <Card className="bg-white border-0 rounded-3xl p-6 hover:shadow-xl transition-shadow shadow-md flex flex-col justify-between">
                  <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-500 mb-4">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{t('weather.humidity')}</p>
                    <p className="text-3xl font-bold text-gray-800">{weatherData.current.humidity}%</p>
                  </div>
                </Card>

                <Card className="bg-white border-0 rounded-3xl p-6 hover:shadow-xl transition-shadow shadow-md flex flex-col justify-between">
                  <div className="p-3 bg-gray-50 w-fit rounded-xl text-gray-600 mb-4">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{t('weather.wind')}</p>
                    <p className="text-3xl font-bold text-gray-800">{weatherData.current.windSpeed} <span className="text-lg text-gray-500">km/h</span></p>
                  </div>
                </Card>

                <Card className="bg-white border-0 rounded-3xl p-6 hover:shadow-xl transition-shadow shadow-md flex flex-col justify-between">
                  <div className="p-3 bg-purple-50 w-fit rounded-xl text-purple-500 mb-4">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{t('weather.uv')}</p>
                    <p className="text-3xl font-bold text-gray-800">{weatherData.current.uvIndex.toFixed(1)}</p>
                  </div>
                </Card>

                <Card className="bg-white border-0 rounded-3xl p-6 hover:shadow-xl transition-shadow shadow-md flex flex-col justify-between">
                  <div className="p-3 bg-emerald-50 w-fit rounded-xl text-accent mb-4">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wider">{t('weather.precip')}</p>
                    <p className="text-3xl font-bold text-gray-800">{weatherData.current.precipitation} <span className="text-lg text-gray-500">mm</span></p>
                  </div>
                </Card>
              </div>
            </div>

            {/* 7-Day Forecast Section */}
            {weatherData.daily && weatherData.daily.time && (
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{t('weather.7day')}</h3>
                  <div className="h-px bg-gray-200 flex-1 ml-4" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {weatherData.daily.time.slice(0, 7).map((dateStr: string, index: number) => {
                    // Current day uses index 0, so we label it "Today"
                    const dayLabel = index === 0 ? 'Today' : getDayName(dateStr);
                    const maxTemp = Math.round(weatherData.daily.temperature_2m_max[index]);
                    const minTemp = Math.round(weatherData.daily.temperature_2m_min[index]);
                    const code = weatherData.daily.weather_code[index];
                    const precip = weatherData.daily.precipitation_sum[index];

                    return (
                      <Card
                        key={dateStr}
                        className={`bg-white border-0 rounded-2xl p-5 hover:shadow-xl transition-all shadow-md ${index === 0 ? 'ring-2 ring-accent bg-green-50/50' : ''}`}
                      >
                        <p className={`text-center font-medium mb-4 ${index === 0 ? 'text-accent' : 'text-gray-600'}`}>
                          {dayLabel}
                        </p>
                        <div className="flex justify-center mb-6">
                          {getWeatherIcon(code, "w-10 h-10")}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{t('weather.high')}</span>
                            <span className="text-gray-800 font-bold">{maxTemp}°</span>
                          </div>

                          {/* Visual Gradient Bar for Temp Range representing variation */}
                          <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-300 to-orange-400 rounded-full" style={{ width: '100%' }} />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{t('weather.low')}</span>
                            <span className="text-gray-600 font-bold">{minTemp}°</span>
                          </div>

                          {precip > 0 && (
                            <div className="flex justify-center mt-2">
                              <span className="text-xs text-blue-500 font-medium flex items-center gap-1">
                                <Droplets className="w-3 h-3" /> {precip}mm
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
