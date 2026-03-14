'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Sprout, Thermometer, Droplets, Activity, History, ChevronRight, BarChart3, Clock, AlertTriangle, ShieldCheck, Search, Globe, Target, Cpu, Layers, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { analyzeSoil } from '@/lib/api-services';
import { addSoilRecord, getSoilRecords } from '@/lib/db';
import { useLanguage } from '@/components/language-provider';

interface SoilResult {
    soilType: string;
    confidence: number;
    metrics: {
        moisture: number;
        nitrogen: number;
        phosphorus: number;
        potassium: number;
        ph: number;
    };
    recommendations: { crop: string; reason: string; duration: string }[];
    managementTips: string[];
    invalidImage?: {
        name: string;
        confidence: number;
        severity: string;
        description: string;
        treatments: string[];
    };
}

interface SoilRecord {
    id?: string;
    timestamp: number;
    soilType: string;
    confidence: number;
    moisture: number;
    ph: number;
    notes: string;
    imageData?: string;
}

const SoilPage = () => {
    const { t } = useLanguage();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [soilResult, setSoilResult] = useState<SoilResult | null>(null);
    const [records, setRecords] = useState<SoilRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [timeFrame, setTimeFrame] = useState<number>(6); // Default 6 months

    const timeOptions = [3, 6, 9, 12, 24, 36];

    useEffect(() => {
        loadRecords();
    }, []);

    const loadRecords = async () => {
        const data = await getSoilRecords();
        setRecords(data);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        try {
            setLoading(true);
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64 = e.target?.result as string;

                try {
                    const img = new Image();
                    img.src = base64;
                    await new Promise((resolve) => { img.onload = resolve; });

                    await import('@tensorflow/tfjs');
                    const mobilenet = await import('@tensorflow-models/mobilenet');
                    const model = await mobilenet.load();
                    const predictions = await model.classify(img);

                    console.log('MobileNet Soil predictions:', predictions);

                    const validKeywords = ['soil', 'dirt', 'sand', 'clay', 'mud', 'ground', 'earth', 'land', 'terrain', 'field', 'agriculture', 'nature', 'landscape', 'mountain', 'hill', 'valley', 'slope', 'cliff', 'rock', 'stone', 'gravel', 'texture', 'profile', 'bedrock', 'organic', 'compost', 'humus', 'garden', 'farm', 'arable', 'topsoil', 'subsoil', 'silt', 'peaty', 'saline', 'loamy'];

                    const isSoil = predictions.some(p =>
                        validKeywords.some(kw => p.className.toLowerCase().includes(kw))
                    );

                    if (!isSoil) {
                        setSoilResult({
                            soilType: 'Invalid Image Detected',
                            confidence: predictions[0].probability,
                            metrics: { moisture: 0, nitrogen: 0, phosphorus: 0, potassium: 0, ph: 0 },
                            recommendations: [],
                            managementTips: [],
                            invalidImage: {
                                name: 'Non-Soil Subject',
                                confidence: predictions[0].probability,
                                severity: 'error',
                                description: 'The uploaded image does not appear to contain soil. AI diagnostics require a clear image of soil for accurate analysis.',
                                treatments: ['Take a new photo with the soil clearly visible.', 'Avoid uploading pictures of people, vehicles, or unrelated objects.']
                            }
                        });
                        setLoading(false);
                        return;
                    }
                } catch (tfError) {
                    console.error("TensorFlow classification failed:", tfError);
                }

                const result = await analyzeSoil(base64);

                if (result) {
                    setSoilResult(result);
                    await addSoilRecord({
                        timestamp: Date.now(),
                        soilType: result.soilType,
                        confidence: result.confidence,
                        moisture: result.metrics.moisture,
                        ph: result.metrics.ph,
                        notes: `Pedological intelligence report. Identified ${result.soilType} with ${(result.confidence * 100).toFixed(1)}% accuracy.`,
                        imageData: base64.substring(0, 100),
                    });
                    await loadRecords();
                }
                setLoading(false);
            };
            reader.readAsDataURL(selectedFile);
        } catch (error) {
            console.error('Error analyzing soil:', error);
            setLoading(false);
        }
    };

    const reset = () => {
        setSoilResult(null);
        setSelectedFile(null);
        setPreview(null);
    };

    return (
        <div className="min-h-screen bg-background p-4 md:p-12 relative overflow-hidden">
            {/* Background blobs for Soil page */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-farm-soil/10 rounded-full blur-[120px] -z-10 animate-blob" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-farm-sun/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <Link href="/dashboard">
                            <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 glass border-white/20 hover:bg-white/10 shrink-0">
                                <ArrowLeft className="w-6 h-6" />
                            </Button>
                        </Link>
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-4">
                                Soil <span className="text-farm-soil drop-shadow-[0_0_15px_rgba(154,103,77,0.3)]">Intelligence</span>
                            </h1>
                            <p className="text-xl text-muted-foreground font-bold tracking-tight opacity-70">
                                Deep-earth pedological scans for precision nutrient management.
                            </p>
                        </div>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="glass p-2 rounded-[2rem] border-white/10 flex items-center gap-2 self-center md:self-end">
                        <div className="px-5 py-2 flex items-center gap-2 text-muted-foreground font-black text-xs uppercase tracking-widest opacity-60">
                            <Clock className="w-4 h-4" />
                            {t('soil.timeframe')}
                        </div>
                        {timeOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setTimeFrame(opt)}
                                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all duration-500 scale-95 hover:scale-100 ${timeFrame === opt
                                    ? 'bg-farm-soil text-white shadow-[0_10px_20px_-5px_rgba(154,103,77,0.4)]'
                                    : 'text-muted-foreground hover:bg-white/5'
                                    }`}
                            >
                                {opt}m
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Section */}
                {!soilResult && (
                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <Card className="glass rounded-[3.5rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-farm-soil/5 rounded-bl-full -z-10" />
                            <div className="relative z-10 text-center">
                                <label className="block mb-10 group cursor-pointer">
                                    <div className="border-4 border-dashed border-farm-soil/30 rounded-[2.5rem] p-20 group-hover:border-farm-soil/60 transition-all duration-500 group-hover:bg-farm-soil/5">
                                        <div className="w-20 h-20 bg-farm-soil/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                            <Upload className="w-10 h-10 text-farm-soil" />
                                        </div>
                                        <p className="text-3xl font-black text-foreground mb-4 tracking-tighter">
                                            Click to Scan Earth
                                        </p>
                                        <p className="text-lg text-muted-foreground font-bold opacity-70">
                                            Upload high-res soil profile for real-time analysis
                                        </p>
                                        <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                                    </div>
                                </label>

                                {preview && (
                                    <div className="animate-in zoom-in duration-500">
                                        <div className="relative inline-block mb-10">
                                            <img src={preview} alt="Soil Preview" className="max-w-xl mx-auto rounded-[3rem] shadow-2xl border-4 border-white/20 h-auto" />
                                            <div className="absolute -inset-4 bg-farm-soil/20 blur-2xl -z-10 rounded-[3rem] animate-pulse" />
                                        </div>
                                        <br />
                                        <Button
                                            size="lg"
                                            onClick={handleAnalyze}
                                            disabled={loading}
                                            className="px-16 py-8 rounded-[2rem] bg-farm-soil hover:bg-farm-soil brightness-110 text-white font-black text-2xl transition-all duration-500 hover:scale-110 shadow-[0_20px_40px_-5px_rgba(154,103,77,0.5)] flex items-center gap-4 mx-auto"
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Finalizing Scan...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <Search className="w-6 h-6" />
                                                    <span>Run Diagnostics</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {/* Invalid Image Warning */}
                {soilResult?.invalidImage && (
                    <div className="animate-in fade-in zoom-in duration-700">
                        <Card className="glass rounded-[3.5rem] p-12 mb-12 border-4 border-red-500 bg-red-500/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-bl-full -z-10" />

                            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                                <div className="p-6 rounded-[2rem] bg-red-500/20 border-2 border-red-500/40 animate-bounce">
                                    <AlertTriangle className="w-12 h-12 text-red-500" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-5xl font-black text-red-500 tracking-tighter mb-2">
                                        Visual Incongruity Detected
                                    </h2>
                                    <p className="text-xl text-red-500/60 font-bold uppercase tracking-widest">
                                        Subject does not match soil profile
                                    </p>
                                </div>
                            </div>

                            <div className="glass rounded-[3rem] p-10 border-red-500/20 shadow-inner">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black text-red-500 mb-4">{soilResult.invalidImage.name}</h3>
                                        <p className="text-xl text-foreground font-bold leading-relaxed">{soilResult.invalidImage.description}</p>
                                    </div>
                                    <div className="flex flex-col gap-4 min-w-[180px]">
                                        <span className="inline-flex items-center justify-center px-6 py-3 bg-red-500/20 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest border border-red-500/30">
                                            Severity: {soilResult.invalidImage.severity}
                                        </span>
                                        <span className="inline-flex items-center justify-center px-6 py-3 bg-white/5 text-muted-foreground rounded-2xl font-black text-xs border border-white/10 uppercase tracking-widest">
                                            Confidence: {(soilResult.invalidImage.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="glass rounded-[2rem] p-8 border-red-500/10 bg-red-500/5">
                                    <h4 className="text-xl font-black text-red-500 mb-6 flex items-center gap-4">
                                        <ShieldCheck className="w-6 h-6" /> Remediation Protocol:
                                    </h4>
                                    <ul className="space-y-4">
                                        {soilResult.invalidImage.treatments.map((tr, i) => (
                                            <li key={i} className="flex items-start gap-4 glass p-4 rounded-2xl border-white/5">
                                                <div className="mt-1.5 w-3 h-3 rounded-full bg-red-500 shrink-0" />
                                                <span className="text-foreground font-bold text-lg">{tr}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button onClick={reset} className="mt-10 mx-auto block px-12 py-6 rounded-2xl glass border-white/10 hover:bg-white/5 font-black uppercase text-xs tracking-widest text-muted-foreground">
                                Clear Interface
                            </Button>
                        </Card>
                    </div>
                )}

                {/* Results Section */}
                {soilResult && !soilResult.invalidImage && (
                    <div className="space-y-12 animate-in fade-in zoom-in duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Main Analysis Card */}
                            <Card className="lg:col-span-2 glass rounded-[4rem] p-12 border-4 border-farm-soil/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <Button variant="ghost" onClick={reset} className="glass px-6 py-4 rounded-2xl text-muted-foreground hover:text-farm-soil font-black uppercase text-[10px] tracking-widest border-white/10">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('crops.result.uploadAnother')}
                                    </Button>
                                </div>

                                <div className="flex items-start gap-10 mb-12">
                                    <div className="w-24 h-24 bg-farm-soil rounded-[2rem] flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(154,103,77,0.5)] shrink-0 animate-pulse">
                                        <Sprout className="w-12 h-12 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-black text-farm-soil uppercase tracking-[0.3em] mb-2 block opacity-70">
                                            Predominant Horizon
                                        </span>
                                        <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-none mb-2">{soilResult.soilType}</h2>
                                        <div className="flex items-center gap-3">
                                            <div className="h-1 w-12 bg-farm-soil rounded-full" />
                                            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">
                                                Scanner Accuracy: {(soilResult.confidence * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Moisture', value: `${soilResult.metrics.moisture}%`, icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                                        { label: 'Nitrogen', value: `${soilResult.metrics.nitrogen}mg`, icon: Activity, color: 'text-farm-emerald', bg: 'bg-farm-emerald/10' },
                                        { label: 'PH Dynamics', value: soilResult.metrics.ph, icon: Thermometer, color: 'text-farm-sun', bg: 'bg-farm-sun/10' },
                                        { label: 'Phosphorus', value: `${soilResult.metrics.phosphorus}mg`, icon: BarChart3, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                    ].map((stat, i) => (
                                        <div key={i} className={`glass p-8 rounded-[2.5rem] border-white/10 ${stat.bg} hover:scale-105 transition-transform duration-500`}>
                                            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
                                            <p className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Preview Image Card */}
                            <Card className="glass rounded-[4rem] p-4 border-2 border-white/10 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-farm-soil/20 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000 -z-10" />
                                <img src={preview!} alt="Analyzed Soil" className="w-full h-full object-cover rounded-[3rem] shadow-inner shadow-black/40 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                            </Card>
                        </div>

                        {/* Recommendations & Management */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Crop Recommendations */}
                            <div className="space-y-10">
                                <h3 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-6">
                                    <div className="w-3 h-12 bg-farm-soil rounded-full shadow-[0_0_20px_rgba(154,103,77,0.5)]" />
                                    Cultivation Vectors
                                </h3>
                                <div className="space-y-6">
                                    {soilResult.recommendations.map((rec, i) => (
                                        <Card key={i} className="glass p-10 border-white/10 rounded-[3rem] hover:translate-x-4 transition-transform duration-500 border-l-[12px] border-farm-soil shadow-xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-farm-soil/5 rounded-bl-full -z-10 group-hover:bg-farm-soil/10 transition-colors" />
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <p className="text-xs font-black text-farm-soil uppercase tracking-[0.2em] mb-1 opacity-70">Recommended Species</p>
                                                    <h4 className="text-4xl font-black text-foreground tracking-tighter leading-none">{rec.crop}</h4>
                                                </div>
                                                <span className="px-6 py-2 glass border-white/10 text-farm-soil text-[10px] font-black uppercase tracking-widest rounded-full">
                                                    {rec.duration} Cycle
                                                </span>
                                            </div>
                                            <p className="text-xl text-muted-foreground font-bold leading-relaxed opacity-80">{rec.reason}</p>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Management Tips */}
                            <div className="space-y-10">
                                <h3 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-6">
                                    <div className="w-3 h-12 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                                    Substrate Protocol
                                </h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {soilResult.managementTips.map((tip, i) => (
                                        <div key={i} className="flex gap-8 p-10 glass rounded-[3.5rem] border-white/10 items-center hover:bg-white/5 transition-colors group">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-[1.8rem] flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:bg-blue-500 transition-colors duration-500">
                                                <ChevronRight className="w-8 h-8 text-blue-500 group-hover:text-white" />
                                            </div>
                                            <p className="text-xl text-muted-foreground font-bold leading-tight tracking-tight group-hover:text-foreground transition-colors">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* History Section */}
                {records.length > 0 && !soilResult && (
                    <div className="mt-24 space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <h3 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-6">
                            <div className="p-4 bg-farm-soil rounded-2xl shadow-[0_0_20px_rgba(154,103,77,0.4)]">
                                <History className="w-8 h-8 text-white" />
                            </div>
                            Chronological Repository
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {records.map((record, i) => (
                                <Card key={i} className="glass p-8 rounded-[3rem] border-2 border-white/5 hover:border-farm-soil/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-4 hover:scale-[1.02] group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-farm-soil/5 rounded-bl-full -z-10 group-hover:bg-farm-soil/10 transition-colors" />
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-16 h-16 glass border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-farm-soil group-hover:text-white transition-all duration-500 shadow-inner">
                                            <Layers className="w-8 h-8 text-muted-foreground group-hover:text-white" />
                                        </div>
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-loose opacity-50">
                                            {new Date(record.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-3xl font-black text-foreground tracking-tighter leading-tight mb-2 group-hover:text-farm-soil transition-colors">{record.soilType}</h4>
                                    <p className="text-muted-foreground font-bold mb-6 text-sm opacity-60">Moisture: {record.moisture}% | pH: {record.ph}</p>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-farm-soil font-black text-xs uppercase tracking-widest">
                                            Diagnostics <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                        <span className="text-[10px] font-black text-muted-foreground uppercase opacity-40">Pedological Scan</span>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SoilPage;
