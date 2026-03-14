'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Heart, TrendingUp, AlertTriangle, ShieldCheck, Search, Globe, Target, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { identifyCattleBreed } from '@/lib/api-services';
import { addCattleRecord, getCattleRecords } from '@/lib/db';
import { useLanguage } from '@/components/language-provider';

interface BreedResult {
  breed: string;
  confidence: number;
  origin: string;
  characteristics: string[];
  healthConcerns: string[];
  productionCapacity: string;
  treatmentTips: string[];
  diseaseDetected?: {
    name: string;
    confidence: number;
    severity: string;
    description: string;
    treatments: string[];
  };
}

interface CattleRecord {
  id?: number | string;
  timestamp: number;
  breed: string;
  age: number;
  healthStatus: string;
  weight: number;
  lastVaccine: string;
  notes: string;
  imageData?: string;
}

const CattlePage = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [breedResult, setBreedResult] = useState<BreedResult | null>(null);
  const [records, setRecords] = useState<CattleRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CattleRecord | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const data = await getCattleRecords();
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

  const handleIdentify = async () => {
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

          console.log('MobileNet Cattle predictions:', predictions);

          const validKeywords = ['animal', 'cow', 'cattle', 'bull', 'ox', 'calf', 'heifer', 'livestock', 'mammal', 'bovine', 'dog', 'cat', 'horse', 'sheep', 'goat', 'pig'];

          const isAnimal = predictions.some(p =>
            validKeywords.some(kw => p.className.toLowerCase().includes(kw))
          );

          if (!isAnimal) {
            setBreedResult({
              breed: 'Invalid Image Detected',
              confidence: predictions[0].probability,
              origin: 'Unknown',
              characteristics: ['Please upload an image of cattle or an agricultural animal.'],
              healthConcerns: ['Unable to analyze non-animal images.'],
              productionCapacity: 'N/A',
              treatmentTips: ['Ensure the animal is well-lit and clearly visible in the photo.', 'Avoid uploading pictures of plants, people, vehicles, or unrelated objects.'],
              diseaseDetected: {
                name: 'Non-Cattle Subject',
                confidence: predictions[0].probability,
                severity: 'error',
                description: 'The uploaded image does not appear to contain cattle or any recognized livestock. AI diagnostics require a clear image of the animal.',
                treatments: ['Take a new photo with the cattle centered in the frame.']
              }
            });
            setLoading(false);
            return;
          }
        } catch (tfError) {
          console.error("TensorFlow classification failed:", tfError);
        }

        const result = await identifyCattleBreed(base64);

        if (result) {
          setBreedResult(result);

          // Save to database
          await addCattleRecord({
            timestamp: Date.now(),
            breed: result.breed,
            age: 3,
            healthStatus: result.diseaseDetected ? 'Attention Needed' : 'Good',
            weight: 400,
            lastVaccine: new Date().toISOString().split('T')[0],
            imageData: base64.substring(0, 100),
            notes: `Identified as ${result.breed} with ${(result.confidence * 100).toFixed(1)}% confidence`,
          });

          await loadRecords();
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error identifying breed:', error);
    } finally {
      // setLoading(false) handled conditionally based on async reader execution
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-12 relative overflow-hidden">
      {/* Background blobs for Cattle page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-2xl w-14 h-14 glass border-white/20 hover:bg-white/10 shrink-0">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter mb-4">
              Livestock <span className="text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">Diagnostics</span>
            </h1>
            <p className="text-xl text-muted-foreground font-bold tracking-tight opacity-70">
              Harness deterministic computer vision for elite animal health management.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        {!breedResult && !selectedRecord && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Card className="glass rounded-[3.5rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-bl-full -z-10" />

              <div className="text-center">
                <label className="block mb-10 group cursor-pointer">
                  <div className="border-4 border-dashed border-rose-500/30 rounded-[2.5rem] p-20 group-hover:border-rose-500/60 transition-all duration-500 group-hover:bg-rose-500/5">
                    <div className="w-20 h-20 bg-rose-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Upload className="w-10 h-10 text-rose-500" />
                    </div>
                    <p className="text-3xl font-black text-foreground mb-4 tracking-tighter">
                      {t('crops.upload.title')}
                    </p>
                    <p className="text-lg text-muted-foreground font-bold opacity-70">
                      {t('crops.upload.desc')}
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </label>

                {preview && (
                  <div className="animate-in zoom-in duration-500">
                    <div className="relative inline-block mb-10">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-xl mx-auto rounded-[3rem] shadow-2xl border-4 border-white/20 h-auto"
                      />
                      <div className="absolute -inset-4 bg-rose-500/20 blur-2xl -z-10 rounded-[3rem] animate-pulse" />
                    </div>
                    <br />
                    <Button
                      size="lg"
                      onClick={handleIdentify}
                      disabled={loading}
                      className="px-16 py-8 rounded-[2rem] bg-rose-500 hover:bg-rose-600 text-white font-black text-2xl transition-all duration-500 hover:scale-110 shadow-[0_20px_40px_-5px_rgba(244,63,94,0.5)] flex items-center gap-4 mx-auto"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t('crops.upload.analyzing')}</span>
                        </div>
                      ) : (
                        <>
                          <Search className="w-6 h-6" />
                          <span>Identify Breed</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Breed Identification Results */}
        {breedResult && !selectedRecord && (
          <div className="animate-in fade-in zoom-in duration-700">
            <Card className="glass rounded-[3.5rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBreedResult(null);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="mb-10 glass border-white/20 hover:bg-white/10 rounded-2xl px-6 py-6 font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t('crops.result.uploadAnother')}
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Breed Info */}
                <div className="space-y-8">
                  <div className="p-10 rounded-[3rem] bg-rose-500/10 border-2 border-rose-500/20 shadow-inner">
                    <div className="inline-block px-4 py-1 rounded-full bg-rose-500/20 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-6">
                      Breed Identification Result
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter mb-8 leading-none">{breedResult.breed}</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10">
                          <Globe className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{t('cattle.origin')}</p>
                          <p className="text-xl font-black text-foreground">{breedResult.origin}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10">
                          <Target className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{t('crops.result.confidence')}</p>
                          <p className="text-xl font-black text-foreground">{(breedResult.confidence * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10">
                          <Activity className="w-6 h-6 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{t('cattle.production')}</p>
                          <p className="text-xl font-black text-foreground">{breedResult.productionCapacity}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Cards */}
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="glass border-white/10 p-8 rounded-[2.5rem] bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors group">
                      <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-2">{t('cattle.characteristics')}</p>
                      <p className="text-5xl font-black text-emerald-500 group-hover:scale-110 transition-transform origin-left">{breedResult.characteristics.length}</p>
                    </Card>
                    <Card className="glass border-white/10 p-8 rounded-[2.5rem] bg-rose-500/5 hover:bg-rose-500/10 transition-colors group">
                      <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-2">{t('cattle.healthPoints')}</p>
                      <p className="text-5xl font-black text-rose-500 group-hover:scale-110 transition-transform origin-left">{breedResult.healthConcerns.length}</p>
                    </Card>
                  </div>
                </div>

                {/* Preview Image in Result */}
                {preview && (
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-rose-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                    <img
                      src={preview}
                      alt="Cattle"
                      className="w-full rounded-[4rem] shadow-2xl border-4 border-white/10 h-auto group-hover:scale-[1.02] transition-transform duration-700 object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Disease / Error Alert Section */}
        {breedResult?.diseaseDetected && !selectedRecord && (
          <div className="animate-in slide-in-from-right-10 duration-700">
            <Card className={`p-12 mb-12 shadow-[0_40px_80px_-20px_rgba(244,63,94,0.3)] border-4 relative overflow-hidden rounded-[4rem] ${breedResult.diseaseDetected.severity === 'error' ? 'bg-red-500/10 border-red-500' : 'bg-red-500/5 border-red-500/50'
              }`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-bl-full -z-10" />

              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className={`p-6 rounded-[2.5rem] ${breedResult.diseaseDetected.severity === 'error' ? 'bg-red-500 animate-bounce' : 'bg-red-500 animate-pulse-slow shadow-[0_0_30px_rgba(239,68,68,0.5)]'}`}>
                  <AlertTriangle className="w-12 h-12 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter mb-2">
                    {breedResult.diseaseDetected.severity === 'error' ? 'Invalid Image Detected' : t('cattle.healthAlert')}
                  </h2>
                  <p className="text-xl text-red-500/70 font-black uppercase tracking-widest">
                    {breedResult.diseaseDetected.severity === 'error' ? 'Please upload cattle' : t('cattle.urgent')}
                  </p>
                </div>
              </div>

              <div className="glass rounded-[3rem] p-10 border-white/20">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
                  <div className="flex-1">
                    <h3 className="text-4xl font-black text-foreground mb-4 tracking-tighter">{breedResult.diseaseDetected.name}</h3>
                    <p className="text-xl text-muted-foreground leading-relaxed font-bold opacity-80">{breedResult.diseaseDetected.description}</p>
                  </div>
                  <div className="flex flex-col gap-4 min-w-[200px] w-full lg:w-auto">
                    <span className="inline-flex items-center justify-center px-8 py-4 bg-red-500 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl">
                      Severity: {breedResult.diseaseDetected.severity}
                    </span>
                    <span className="inline-flex items-center justify-center px-8 py-4 glass text-foreground rounded-[1.5rem] font-black text-sm uppercase tracking-widest border border-white/20">
                      Confidence: {(breedResult.diseaseDetected.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="bg-red-500/5 rounded-[2.5rem] p-10 border-2 border-red-500/20">
                  <h4 className="text-2xl font-black text-red-500 mb-8 flex items-center gap-4">
                    <ShieldCheck className="w-8 h-8" />
                    Recommended Immediate Actions:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {breedResult.diseaseDetected.treatments.map((tr, i) => (
                      <li key={i} className="flex items-start gap-5 glass p-6 rounded-[2rem] border-white/10 hover:bg-white/5 transition-colors group">
                        <div className="mt-1.5 w-4 h-4 rounded-full bg-red-500 shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-foreground font-bold text-lg leading-snug">{tr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Characteristics */}
        {breedResult && !selectedRecord && (
          <div className="animate-in slide-in-from-bottom-10 duration-700 delay-200">
            <Card className="glass rounded-[4rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-emerald-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">{t('cattle.characteristics')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breedResult.characteristics.map((char, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-500 cursor-pointer group shadow-lg"
                    onClick={() => {
                      setSelectedRecord({
                        id: idx,
                        timestamp: Date.now(),
                        breed: breedResult.breed,
                        age: 0,
                        healthStatus: 'Information',
                        weight: 0,
                        lastVaccine: '',
                        notes: `Key breed characteristic: ${char}`,
                      });
                    }}
                  >
                    <p className="text-foreground font-black text-xl group-hover:text-emerald-500 transition-colors leading-tight">
                      {char}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Health Concerns */}
        {breedResult && !selectedRecord && (
          <div className="animate-in slide-in-from-bottom-10 duration-700 delay-300">
            <Card className="glass rounded-[4rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-rose-500 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-rose-500 tracking-tighter">{t('cattle.healthPoints')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breedResult.healthConcerns.map((concern, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-500 cursor-pointer group shadow-lg"
                    onClick={() => {
                      setSelectedRecord({
                        id: idx,
                        timestamp: Date.now(),
                        breed: breedResult.breed,
                        age: 0,
                        healthStatus: concern,
                        weight: 0,
                        lastVaccine: '',
                        notes: `Critical health monitoring required for: ${concern}. Consult a veterinarian for a preventive management plan.`,
                      });
                    }}
                  >
                    <p className="text-foreground font-black text-xl group-hover:text-rose-500 transition-colors leading-tight">
                      {concern}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Treatment Tips */}
        {breedResult && !selectedRecord && breedResult.treatmentTips && (
          <div className="animate-in slide-in-from-bottom-10 duration-700 delay-400">
            <Card className="glass rounded-[4rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-emerald-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-emerald-500 tracking-tighter">{t('cattle.treatmentTips')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {breedResult.treatmentTips.map((tip, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-500 cursor-pointer group shadow-lg flex flex-col justify-between"
                  >
                    <p className="text-foreground/90 font-bold text-lg group-hover:text-foreground transition-colors leading-snug mb-6">
                      {tip}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Expert Advice</span>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Detailed Record View */}
        {selectedRecord && (
          <div className="animate-in scale-95 fade-in duration-500">
            <Card className="glass rounded-[4rem] p-16 mb-12 border-2 border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -z-10" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecord(null)}
                className="mb-12 glass border-white/20 hover:bg-white/10 rounded-2xl px-8 py-6 font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Analysis
              </Button>
              <h2 className="text-7xl font-black text-foreground tracking-tighter mb-12 leading-none">{selectedRecord.breed}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="glass p-10 rounded-[3rem] border-white/10 bg-primary/5">
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-4">Health Status</p>
                  <p className="text-4xl font-black text-primary tracking-tighter">{selectedRecord.healthStatus}</p>
                </Card>
                <Card className="glass p-10 rounded-[3rem] border-white/10 bg-emerald-500/5">
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-4">Last Updated</p>
                  <p className="text-4xl font-black text-emerald-500 tracking-tighter">
                    {new Date(selectedRecord.timestamp).toLocaleDateString()}
                  </p>
                </Card>
              </div>
              <div className="glass p-10 rounded-[3.5rem] border-2 border-primary/20 bg-primary/10">
                <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-4">
                  <Activity className="w-8 h-8" /> Analysis Details
                </h3>
                <p className="text-2xl text-foreground/80 font-bold leading-relaxed tracking-tight">{selectedRecord.notes}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Historical Records */}
        {records.length > 0 && !breedResult && !selectedRecord && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Card className="glass rounded-[4rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-2 border-white/10">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-orange-500 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">Your Cattle Herd</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {records.slice(0, 9).map((record, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[3rem] cursor-pointer hover:shadow-2xl transition-all border-2 border-white/5 hover:border-orange-500/40 hover:-translate-y-4 hover:scale-[1.02] duration-500 group relative overflow-hidden"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:bg-orange-500/10 transition-colors" />
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">
                          {new Date(record.timestamp).toLocaleDateString()}
                        </p>
                        <p className="font-black text-foreground text-3xl tracking-tighter group-hover:text-orange-500 transition-colors">{record.breed}</p>
                      </div>
                      <Heart className="w-6 h-6 text-orange-500 group-hover:scale-125 transition-transform" />
                    </div>
                    <p className="text-lg text-muted-foreground font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                      {record.healthStatus}
                    </p>
                    {record.weight > 0 && (
                      <span className="inline-block px-6 py-3 bg-orange-500/20 text-orange-500 text-sm font-black rounded-2xl tracking-widest">
                        {record.weight} KG
                      </span>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CattlePage;
