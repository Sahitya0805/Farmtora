'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Cloud, Droplets, Wind, Eye, Gauge, Search, MapPin, Sun, CloudRain, CloudLightning, Snowflake, CloudFog, Navigation, Clock, Calendar, ThermometerSun, Wind as WindIcon, Umbrella, Sunrise, Sunset } from 'lucide-react';
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
    weatherCode: number;
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

  const applyFallbackLocation = () => {
    const fallbackLocation = 'Pune, India';
    const fallbackCoords = { lat: 18.5204, lon: 73.8567 };

    setLocation(fallbackLocation);
    setCoords(fallbackCoords);
    localStorage.setItem('farmerApp_location', fallbackLocation);
    localStorage.setItem('farmerApp_lat', fallbackCoords.lat.toString());
    localStorage.setItem('farmerApp_lon', fallbackCoords.lon.toString());
    const userSavedLang = localStorage.getItem('farmerApp_lang');
    if (!userSavedLang) setLanguage('en');
  };

  useEffect(() => {
    const initLocation = () => {
      const savedLocation = localStorage.getItem('farmerApp_location');
      const savedLat = localStorage.getItem('farmerApp_lat');
      const savedLon = localStorage.getItem('farmerApp_lon');

      if (savedLocation && savedLat && savedLon) {
        setLocation(savedLocation);
        setCoords({ lat: parseFloat(savedLat), lon: parseFloat(savedLon) });
        return;
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              setCoords({ lat: latitude, lon: longitude });

              const locationData = await reverseGeocode(latitude, longitude);
              if (locationData && locationData.name) {
                setLocation(locationData.name);

                const userSavedLang = localStorage.getItem('farmerApp_lang');
                if (!userSavedLang) {
                  if (locationData.state === 'Karnataka') {
                    setLanguage('kn');
                  } else {
                    setLanguage('en');
                  }
                }

                localStorage.setItem('farmerApp_location', locationData.name);
                localStorage.setItem('farmerApp_lat', latitude.toString());
                localStorage.setItem('farmerApp_lon', longitude.toString());
              } else {
                setLocation('Current Location');
                applyFallbackLocation();
              }
            } catch (err) {
              console.warn('Reverse geocode failed, using fallback location:', err);
              applyFallbackLocation();
            }
          },
          (error) => {
            console.warn('Error getting location:', error);
            applyFallbackLocation();
          },
          { timeout: 10000, maximumAge: 600000, enableHighAccuracy: false }
        );
      } else {
        console.warn('Geolocation is not available in this browser, using fallback location.');
        applyFallbackLocation();
      }
    };

    initLocation();
  }, [setLanguage]);

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
          try {
            const { latitude, longitude } = position.coords;
            setCoords({ lat: latitude, lon: longitude });

            const locationData = await reverseGeocode(latitude, longitude);
            if (locationData && locationData.name) {
              setLocation(locationData.name);
              localStorage.setItem('farmerApp_location', locationData.name);
              localStorage.setItem('farmerApp_lat', latitude.toString());
              localStorage.setItem('farmerApp_lon', longitude.toString());

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
          } catch (err) {
            console.warn('Error reverse-geocoding on handleGetLocation, using fallback', err);
            applyFallbackLocation();
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.warn("Error getting location:", error);
          applyFallbackLocation();
          setLoading(false);
          alert('Could not retrieve your location. Check browser settings.');
        },
        { timeout: 10000, maximumAge: 600000, enableHighAccuracy: false }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(coords.lat, coords.lon);

        if (data) {
          setWeatherData(data);

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
    if (code === 0 || code === 1) return <Sun className={`${className} text-farm-sun animate-spin-slow`} />;
    if (code === 2 || code === 3) return <Cloud className={`${className} text-blue-400 animate-pulse`} />;
    if (code === 45 || code === 48) return <CloudFog className={`${className} text-gray-400 animate-pulse`} />;
    if (code >= 51 && code <= 67) return <CloudRain className={`${className} text-blue-500 animate-bounce`} />;
    if (code >= 71 && code <= 86) return <Snowflake className={`${className} text-cyan-300 animate-spin-slow`} />;
    if (code >= 95) return <CloudLightning className={`${className} text-purple-500 animate-pulse`} />;
    return <Cloud className={`${className} text-gray-300`} />;
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-12 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-farm-sun/5 rounded-full blur-[120px] -z-10 animate-blob animation-delay-4000" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Link href="/dashboard">
              <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 glass border-white/20 hover:bg-white/10 shrink-0 transition-transform hover:scale-110">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-4">
                Meteorological <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">Vanguard</span>
              </h1>
              <p className="text-xl text-muted-foreground font-bold tracking-tight opacity-70">
                Hyper-local climate intelligence for deterministic farm planning.
              </p>
            </div>
          </div>

          {/* Search Bar & GPS */}
          <div className="relative w-full md:w-auto flex items-center gap-4 group">
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder={t('weather.search')}
                className="w-full pl-16 pr-6 py-6 glass border-white/10 rounded-2xl text-foreground font-bold placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-blue-400/20 transition-all shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <Button
              variant="outline"
              className="w-16 h-16 glass border-white/10 rounded-2xl hover:bg-blue-400/10 shadow-xl transition-all hover:scale-110"
              onClick={handleGetLocation}
            >
              <Navigation className="w-6 h-6 text-blue-400" />
            </Button>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-4 glass overflow-hidden shadow-2xl border-white/10 z-50 rounded-3xl animate-in slide-in-from-top-4 duration-500">
                {searchResults.map((res) => (
                  <div
                    key={`${res.id}-${res.latitude}-${res.longitude}`}
                    className="px-8 py-6 hover:bg-white/5 cursor-pointer flex items-center gap-6 border-b border-white/5 last:border-0 transition-colors group"
                    onClick={() => handleSelectLocation(res)}
                  >
                    <MapPin className="w-6 h-6 text-blue-400 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-black text-foreground text-xl">{res.name}</p>
                      <p className="text-sm font-bold text-muted-foreground opacity-60">
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
          <div className="space-y-24 animate-in fade-in zoom-in duration-1000 mt-8">
            {/* Current Weather Hero */}
            <Card className="glass rounded-[4rem] p-12 md:p-16 border-4 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />

              <div className="flex flex-col lg:flex-row justify-between items-center gap-16 relative z-10">
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border-white/10 text-blue-400 mb-10 shadow-lg hover:bg-farm-emerald/10 transition-colors">
                    <MapPin className="w-5 h-5" />
                    <span className="font-black text-sm uppercase tracking-widest">{location}</span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <h2 className="text-[8rem] md:text-[10rem] font-black text-foreground tracking-tighter leading-none drop-shadow-2xl">
                      {Math.round(weatherData.current.temperature)}°
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon(weatherData.current.weatherCode || 0, "w-16 h-16")}
                        <p className="text-4xl md:text-5xl font-black text-blue-400 tracking-tighter">{weatherData.current.condition}</p>
                      </div>
                      <p className="text-xl text-muted-foreground font-black uppercase tracking-[0.4em] opacity-40">Synchronized Reality</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full lg:w-[450px]">
                  {[
                    { label: 'Humidity', value: `${weatherData.current.humidity}%`, icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                    { label: 'Windspeed', value: `${weatherData.current.windSpeed}km/h`, icon: Wind, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    { label: 'UV Flux', value: weatherData.current.uvIndex.toFixed(1), icon: Eye, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'Precip', value: `${weatherData.current.precipitation}mm`, icon: Gauge, color: 'text-farm-soil', bg: 'bg-farm-soil/10' },
                  ].map((stat, i) => (
                    <Card key={i} className={`p-6 rounded-[2.5rem] glass border-white/10 ${stat.bg} hover:bg-farm-emerald/10 hover:scale-110 transition-all duration-500 shadow-xl overflow-hidden`}>
                      <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60 truncate">{stat.label}</p>
                      <p className={`text-2xl md:text-3xl font-black ${stat.color} tracking-tighter leading-none truncate`}>{stat.value}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* 7-Day Multi-Vector Forecast */}
            <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
              <h3 className="text-5xl font-black text-foreground tracking-tighter flex items-center gap-6">
                <div className="p-5 bg-blue-400 rounded-3xl shadow-[0_0_25px_rgba(96,165,250,0.5)]">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                Future Climate Vectors
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
                {weatherData.daily?.time?.slice(0, 7).map((dateStr: string, index: number) => {
                  const dayLabel = index === 0 ? 'Today' : getDayName(dateStr);
                  const maxTemp = Math.round(weatherData.daily.temperature_2m_max[index]);
                  const minTemp = Math.round(weatherData.daily.temperature_2m_min[index]);
                  const code = weatherData.daily.weather_code[index];
                  const precip = weatherData.daily.precipitation_sum[index];

                  return (
                    <Card
                      key={dateStr}
                      className={`glass p-8 rounded-[3rem] border-2 transition-all duration-500 hover:-translate-y-4 hover:scale-[1.05] group shadow-xl ${index === 0 ? 'border-blue-400/50 bg-blue-400/5' : 'border-white/5 hover:border-blue-400/30'
                        }`}
                    >
                      <div className="text-center">
                        <p className={`font-black text-xl mb-6 tracking-tight ${index === 0 ? 'text-blue-400' : 'text-muted-foreground opacity-60'}`}>
                          {dayLabel.slice(0, 3)}
                        </p>
                        <div className="flex justify-center mb-8 group-hover:scale-125 transition-transform duration-700">
                          {getWeatherIcon(code, "w-16 h-16")}
                        </div>

                        <div className="space-y-6">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-40">Peak</p>
                              <p className="text-3xl font-black text-foreground">{maxTemp}°</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-40">Base</p>
                              <p className="text-xl font-black text-muted-foreground">{minTemp}°</p>
                            </div>
                          </div>

                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-farm-sun rounded-full" style={{ width: '100%' }} />
                          </div>

                          {precip > 0 && (
                            <div className="flex items-center justify-center gap-2 px-3 py-1.5 glass rounded-xl border-white/10">
                              <Umbrella className="w-4 h-4 text-blue-400" />
                              <span className="text-xs font-black text-blue-400 tracking-tighter">{precip}mm</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Atmospheric Depth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Card className="glass p-10 rounded-[3.5rem] border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-farm-sun/5 rounded-bl-full group-hover:bg-farm-sun/10 transition-colors" />
                <Sunrise className="w-12 h-12 text-farm-sun mb-8" />
                <h4 className="text-2xl font-black text-foreground mb-2">Solar Ingress</h4>
                <p className="text-muted-foreground font-bold text-lg opacity-60 mb-6">Optimized photosynthetic windows for crop absorption.</p>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-black text-farm-sun">06:12 AM</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-30">Eastern Vector</span>
                </div>
              </Card>

              <Card className="glass p-10 rounded-[3.5rem] border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full group-hover:bg-orange-500/10 transition-colors" />
                <Sunset className="w-12 h-12 text-orange-500 mb-8" />
                <h4 className="text-2xl font-black text-foreground mb-2">Solar Egress</h4>
                <p className="text-muted-foreground font-bold text-lg opacity-60 mb-6">Transition to nocturnal reclamation and nutrient cycle.</p>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-black text-orange-500">06:48 PM</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-30">Western Vector</span>
                </div>
              </Card>

              <Card className="glass p-10 rounded-[3.5rem] bg-blue-400/10 border-blue-400/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-bl-full group-hover:bg-blue-400/20 transition-colors" />
                <WindIcon className="w-12 h-12 text-blue-400 mb-8" />
                <h4 className="text-2xl font-black text-foreground mb-2">Aero Dynamics</h4>
                <p className="text-muted-foreground font-bold text-lg opacity-60 mb-6">Current laminar flow vectors and pollination efficiency.</p>
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-black text-blue-400">Stable</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-30">Laminar Flow</span>
                </div>
              </Card>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col justify-center items-center h-[60vh] gap-8">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
              <div className="absolute inset-0 bg-blue-400/20 blur-2xl animate-pulse" />
            </div>
            <p className="text-2xl font-black text-foreground tracking-widest uppercase opacity-40 animate-pulse">Syncing Climate Matrix...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
