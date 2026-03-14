'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cloud, Leaf, AlertTriangle, BookOpen, ArrowRight, MapPin, Search, TrendingUp, Droplets, Activity, Cpu, Layers, ShieldCheck, Zap, Heart, Sprout, TreePine, Mountain } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { searchLocations } from '@/lib/api-services';
import { useLanguage } from '@/components/language-provider';

const Dashboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSelectLocation = async (result: any) => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const cropPoints = [
    "Optimal wheat sowing time approaching.",
    "Monitor for early signs of rust disease.",
    "Apply nitrogen-based fertilizer this week.",
    "Expected yield: +15% vs last season."
  ];
  const cattlePoints = [
    "Vaccination schedule due for calves.",
    "Increase fodder intake due to weather.",
    "Monitor milk yield drop in Cow #45.",
    "Schedule veterinary checkup for week 12."
  ];
  const soilPoints = [
    "Current soil moisture: 45% (optimal).",
    "Nitrogen levels slightly below average.",
    "Soil pH is 6.5, ideal for most crops.",
    "Soil temperature is conducive for growth."
  ];

  const cropPieData = [
    { name: 'Wheat', value: 45, color: '#4f46e5' },
    { name: 'Rice', value: 30, color: '#6366f1' },
    { name: 'Corn', value: 25, color: '#818cf8' }
  ];
  const cattlePieData = [
    { name: 'Healthy', value: 80, color: '#f97316' },
    { name: 'Monitoring', value: 15, color: '#fb923c' },
    { name: 'At Risk', value: 5, color: '#fdba74' }
  ];
  const soilPieData = [
    { name: 'Clay', value: 40, color: '#b45309' },
    { name: 'Silt', value: 35, color: '#d97706' },
    { name: 'Sand', value: 25, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-12 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-farm-green/10 rounded-full blur-[150px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-farm-soil/10 rounded-full blur-[150px] -z-10 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-farm-sun/5 rounded-full blur-[120px] -z-10 animate-blob animation-delay-4000" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="flex items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-2">
                Operational <span className="text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">{t('nav.dashboard')}</span>
              </h1>
              <p className="text-lg text-muted-foreground font-bold tracking-tight opacity-70">
                Aggregated botanical and livestock intelligence synchronization.
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-[400px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Query global agricultural nodes..."
              className="w-full pl-16 pr-6 py-6 glass border-white/10 rounded-3xl text-foreground font-bold placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            )}

            {searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-4 glass overflow-hidden shadow-2xl border-white/10 z-50 rounded-[2.5rem] animate-in slide-in-from-top-4 duration-500">
                {searchResults.map((res) => (
                  <div
                    key={`${res.id}-${res.latitude}-${res.longitude}`}
                    className="px-8 py-6 hover:bg-farm-emerald/10 cursor-pointer flex items-center gap-6 border-b border-white/5 last:border-0 transition-colors group"
                    onClick={() => handleSelectLocation(res)}
                  >
                    <MapPin className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
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

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Crop Matrix */}
          <Card className="glass rounded-[4rem] p-10 border-4 border-indigo-600/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-foreground tracking-tighter">Botanical Index</h3>
            </div>

            <div className="h-64 w-full mb-10 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-4xl font-black text-indigo-600">85%</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Efficiency</p>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cropPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {cropPieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', borderRadius: '1.5rem', border: 'none', color: '#fff', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-indigo-600/5">
              <h4 className="flex items-center gap-3 font-black text-indigo-600 text-xs uppercase tracking-[0.3em] mb-6">
                <Zap className="w-4 h-4" /> Live Insights
              </h4>
              <ul className="space-y-6">
                {cropPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 transition-all hover:translate-x-2 group/item">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-1.5 shadow-[0_0_10px_rgba(79,70,229,0.5)] group-hover/item:scale-125 transition-transform" />
                    <span className="text-lg text-foreground font-bold leading-tight opacity-80 group-hover/item:opacity-100 transition-opacity">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/crops" className="mt-8 flex items-center justify-center gap-4 py-4 glass border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
              Full Diagnostic <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          {/* Cattle Matrix */}
          <Card className="glass rounded-[4rem] p-10 border-4 border-orange-500/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-foreground tracking-tighter">Livestock Vitality</h3>
            </div>

            <div className="h-64 w-full mb-10 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-4xl font-black text-orange-500">92%</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Vitality</p>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cattlePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {cattlePieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', borderRadius: '1.5rem', border: 'none', color: '#fff', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-orange-500/5">
              <h4 className="flex items-center gap-3 font-black text-orange-500 text-xs uppercase tracking-[0.3em] mb-6">
                <ShieldCheck className="w-4 h-4" /> Health Alerts
              </h4>
              <ul className="space-y-6">
                {cattlePoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 transition-all hover:translate-x-2 group/item">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_10px_rgba(249,115,22,0.5)] group-hover/item:scale-125 transition-transform" />
                    <span className="text-lg text-foreground font-bold leading-tight opacity-80 group-hover/item:opacity-100 transition-opacity">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/cattle" className="mt-8 flex items-center justify-center gap-4 py-4 glass border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
              Cattle Management <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          {/* Soil Matrix */}
          <Card className="glass rounded-[4rem] p-10 border-4 border-amber-600/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/40">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-foreground tracking-tighter">Soil Comparison</h3>
            </div>

            <div className="h-64 w-full mb-10 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-4xl font-black text-amber-600">7.2</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">Avg pH</p>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={soilPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {soilPieData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', borderRadius: '1.5rem', border: 'none', color: '#fff', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="glass rounded-[2.5rem] p-8 border-white/5 bg-amber-600/5">
              <h4 className="flex items-center gap-3 font-black text-amber-600 text-xs uppercase tracking-[0.3em] mb-6">
                <Cpu className="w-4 h-4" /> Nutrient Matrix
              </h4>
              <ul className="space-y-6">
                {soilPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-4 transition-all hover:translate-x-2 group/item">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-600 mt-1.5 shadow-[0_0_10px_rgba(180,83,9,0.5)] group-hover/item:scale-125 transition-transform" />
                    <span className="text-lg text-foreground font-bold leading-tight opacity-80 group-hover/item:opacity-100 transition-opacity">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/soil" className="mt-8 flex items-center justify-center gap-4 py-4 glass border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] text-amber-600 hover:bg-amber-600 hover:text-white transition-all">
              Substrate Analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>

        {/* Global Performance Summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 animate-in slide-in-from-bottom-10 duration-1000">
          {[
            { label: 'Forecast', value: 'Rain Incoming', icon: Cloud, color: 'text-blue-400' },
            { label: 'Growth Delta', value: '+12.4%', icon: TrendingUp, color: 'text-farm-emerald' },
            { label: 'Water Balance', value: 'Optimal', icon: Droplets, color: 'text-cyan-400' },
            { label: 'Sync Status', value: 'Real-time', icon: Activity, color: 'text-purple-400' }
          ].map((item, i) => (
            <Card key={i} className="glass p-8 rounded-[3rem] border-white/10 flex items-center gap-6 hover:scale-105 transition-transform duration-500 shadow-lg">
              <div className={`w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center ${item.color} shadow-inner`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">{item.label}</p>
                <p className={`text-xl font-black ${item.color} leading-none`}>{item.value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
