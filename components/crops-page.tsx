'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Leaf, AlertTriangle, ShieldCheck, CheckCircle, AlertCircle, Search, Globe, Target, Activity, Cpu, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { detectCropDisease, getDiseaseInformation } from '@/lib/api-services';
import { addCropRecord, getCropRecords } from '@/lib/db';
import { useLanguage } from '@/components/language-provider';

interface DiseaseResult {
  disease: string;
  confidence: number;
  severity: string;
  treatments: string[];
  preventionMeasures: string[];
}

interface CropRecord {
  id?: number | string;
  timestamp: number;
  cropName: string;
  diseaseName: string;
  confidence: number;
  treatment: string;
  severity: string;
  notes: string;
}

const CropsPage = () => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [diseaseResult, setDiseaseResult] = useState<DiseaseResult | null>(null);
  const [records, setRecords] = useState<CropRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CropRecord | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const data = await getCropRecords();
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

  const handleDetect = async () => {
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

          console.log('MobileNet predictions:', predictions);

          const validKeywords = ['plant', 'flower', 'fruit', 'vegetable', 'leaf', 'tree', 'crop', 'pot', 'strawberry', 'apple', 'orange', 'lemon', 'banana', 'daisy', 'rose', 'grass', 'garden', 'produce', 'food', 'mushroom', 'pepper', 'cabbage', 'corn', 'cucumber', 'squash', 'pumpkin', 'tomato', 'bean', 'salad', 'broccoli', 'cauliflower', 'zucchini', 'fig', 'pineapple', 'grape', 'lemon', 'head cabbage', 'bell pepper', 'earthstar', 'acorn'];

          const isPlant = predictions.some(p =>
            validKeywords.some(kw => p.className.toLowerCase().includes(kw))
          );

          if (!isPlant) {
            setDiseaseResult({
              disease: 'Invalid Image Detected',
              confidence: predictions[0].probability,
              severity: 'error',
              treatments: ['Please upload an image of a plant, crop, or fruit.'],
              preventionMeasures: ['Ensure the subject is well-lit and clearly visible.', 'Avoid uploading pictures of animals, people, vehicles, or unrelated objects.'],
            });
            setLoading(false);
            return;
          }
        } catch (tfError) {
          console.error("TensorFlow classification failed:", tfError);
        }

        const result = await detectCropDisease(base64);

        if (result) {
          setDiseaseResult(result);

          // Save to database
          await addCropRecord({
            timestamp: Date.now(),
            cropName: 'Active Crop',
            diseaseName: result.disease,
            confidence: result.confidence,
            treatment: result.treatments[0] || 'Consult expert',
            severity: result.severity,
            notes: `Auto-diagnosed botanical intelligence report. High confidence: ${(result.confidence * 100).toFixed(1)}%.`,
          });

          // Reload records
          await loadRecords();
        }
        setLoading(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error detecting disease:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-12 relative overflow-hidden">
      {/* Background blobs for Crops page */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-farm-emerald/10 rounded-full blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-farm-green/10 rounded-full blur-[120px] -z-10 animate-blob animation-delay-2000" />

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
              Crop <span className="text-farm-emerald drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Diagnostics</span>
            </h1>
            <p className="text-xl text-muted-foreground font-bold tracking-tight opacity-70">
              Deterministic vision-transformers for instant botanical health analysis.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        {!diseaseResult && !selectedRecord && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            <Card className="glass rounded-[3.5rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-farm-emerald/5 rounded-bl-full -z-10" />

              <div className="text-center">
                <label className="block mb-10 group cursor-pointer">
                  <div className="border-4 border-dashed border-farm-emerald/30 rounded-[2.5rem] p-20 group-hover:border-farm-emerald/60 transition-all duration-500 group-hover:bg-farm-emerald/5">
                    <div className="w-20 h-20 bg-farm-emerald/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Upload className="w-10 h-10 text-farm-emerald" />
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
                      <div className="absolute -inset-4 bg-farm-emerald/20 blur-2xl -z-10 rounded-[3rem] animate-pulse" />
                    </div>
                    <br />
                    <Button
                      size="lg"
                      onClick={handleDetect}
                      disabled={loading}
                      className="px-16 py-8 rounded-[2rem] bg-farm-emerald hover:bg-farm-emerald brightness-110 text-white font-black text-2xl transition-all duration-500 hover:scale-110 shadow-[0_20px_40px_-5px_rgba(16,185,129,0.5)] flex items-center gap-4 mx-auto"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t('crops.upload.analyzing')}</span>
                        </div>
                      ) : (
                        <>
                          <Search className="w-6 h-6" />
                          <span>Analyze Crop</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Disease Detection Alert */}
        {diseaseResult && !selectedRecord && (
          <div className="animate-in fade-in zoom-in duration-700">
            <Card className={`glass rounded-[3.5rem] p-12 mb-12 border-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden ${diseaseResult.severity === 'error' ? 'border-red-500 bg-red-500/5' :
                diseaseResult.severity === 'high' ? 'border-red-500 bg-red-500/5' :
                  diseaseResult.severity === 'medium' ? 'border-farm-sun bg-farm-sun/5' :
                    'border-farm-emerald bg-farm-emerald/5'
              }`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-current/5 rounded-bl-full -z-10" />

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDiseaseResult(null);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="mb-10 glass border-white/20 hover:bg-white/10 rounded-2xl px-6 py-6 font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> {t('crops.result.uploadAnother')}
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Result Info */}
                <div className="space-y-8">
                  <div className={`p-10 rounded-[3rem] border-2 shadow-inner ${diseaseResult.severity === 'error' || diseaseResult.severity === 'high' ? 'bg-red-500/10 border-red-500/20' :
                      diseaseResult.severity === 'medium' ? 'bg-farm-sun/10 border-farm-sun/20' :
                        'bg-farm-emerald/10 border-farm-emerald/20'
                    }`}>
                    <div className={`inline-block px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest mb-6 ${diseaseResult.severity === 'error' || diseaseResult.severity === 'high' ? 'bg-red-500/20 text-red-500' :
                        diseaseResult.severity === 'medium' ? 'bg-farm-sun/20 text-farm-sun' :
                          'bg-farm-emerald/20 text-farm-emerald'
                      }`}>
                      Diagnostic Result
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter mb-8 leading-none">
                      {diseaseResult.disease === 'Healthy' ? 'Pristine' : diseaseResult.disease}
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10">
                          <Activity className={`w-6 h-6 ${diseaseResult.severity === 'error' || diseaseResult.severity === 'high' ? 'text-red-500' :
                              diseaseResult.severity === 'medium' ? 'text-farm-sun' :
                                'text-farm-emerald'
                            }`} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">Health Status</p>
                          <p className="text-xl font-black text-foreground">
                            {diseaseResult.disease === 'Healthy' ? 'Optimal Growth' : diseaseResult.severity.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10">
                          <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{t('crops.result.confidence')}</p>
                          <p className="text-xl font-black text-foreground">{(diseaseResult.confidence * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Treatments */}
                  <div className="glass rounded-[3rem] p-10 border-white/10">
                    <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-4">
                      <ShieldCheck className="w-8 h-8 text-farm-emerald" />
                      {diseaseResult.disease === 'Healthy' ? 'Preservation Plan' : 'Remediation Protocol'}
                    </h3>
                    <ul className="space-y-6">
                      {diseaseResult.treatments.map((tr, i) => (
                        <li key={i} className="flex items-start gap-5 glass p-6 rounded-[2rem] border-white/10 hover:bg-white/5 transition-colors group">
                          <div className={`mt-1.5 w-4 h-4 rounded-full shrink-0 group-hover:scale-125 transition-transform ${diseaseResult.severity === 'error' || diseaseResult.severity === 'high' ? 'bg-red-500' :
                              diseaseResult.severity === 'medium' ? 'bg-farm-sun' :
                                'bg-farm-emerald'
                            }`} />
                          <span className="text-foreground font-bold text-lg leading-snug">{tr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Preview Image in Result */}
                {preview && (
                  <div className="relative group flex items-center justify-center h-full">
                    <div className={`absolute -inset-4 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 ${diseaseResult.severity === 'error' || diseaseResult.severity === 'high' ? 'bg-red-500/20' :
                        diseaseResult.severity === 'medium' ? 'bg-farm-sun/20' :
                          'bg-farm-emerald/20'
                      }`} />
                    <img
                      src={preview}
                      alt="Crop Analysis"
                      className="w-full rounded-[4rem] shadow-2xl border-4 border-white/10 h-auto group-hover:scale-[1.02] transition-transform duration-700 object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Prevention Measures */}
        {diseaseResult && !selectedRecord && (
          <div className="animate-in slide-in-from-bottom-10 duration-700 delay-200">
            <Card className="glass rounded-[4rem] p-12 mb-12 border-2 border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-blue-500 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">AI Prevention Strategies</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diseaseResult.preventionMeasures.map((measure, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[2.5rem] border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-500 cursor-pointer group shadow-lg flex items-center gap-6"
                    onClick={() => {
                      setSelectedRecord({
                        id: idx,
                        timestamp: Date.now(),
                        cropName: 'Active Crop',
                        diseaseName: diseaseResult.disease,
                        confidence: diseaseResult.confidence,
                        treatment: measure,
                        severity: diseaseResult.severity,
                        notes: `Long-term preventive intelligence for ${diseaseResult.disease}. Implementing this strategy will significantly improve future yields.`,
                      });
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center border border-white/10 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-500">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-foreground font-black text-xl group-hover:text-blue-500 transition-colors leading-tight flex-1">
                      {measure}
                    </p>
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
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-farm-emerald/10 rounded-full blur-[80px] -z-10" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRecord(null)}
                className="mb-12 glass border-white/20 hover:bg-white/10 rounded-2xl px-8 py-6 font-black text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Analysis
              </Button>
              <h2 className="text-7xl font-black text-foreground tracking-tighter mb-12 leading-none">{selectedRecord.diseaseName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="glass p-10 rounded-[3rem] border-white/10 bg-farm-emerald/5">
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-4">Severity</p>
                  <p className="text-4xl font-black text-farm-emerald tracking-tighter uppercase">{selectedRecord.severity}</p>
                </Card>
                <Card className="glass p-10 rounded-[3rem] border-white/10 bg-blue-500/5">
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-4">Confidence</p>
                  <p className="text-4xl font-black text-blue-500 tracking-tighter">{(selectedRecord.confidence * 100).toFixed(1)}%</p>
                </Card>
                <Card className="glass p-10 rounded-[3rem] border-white/10 bg-farm-sun/5">
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-4">Last Updated</p>
                  <p className="text-4xl font-black text-farm-sun tracking-tighter">
                    {new Date(selectedRecord.timestamp).toLocaleDateString()}
                  </p>
                </Card>
              </div>
              <div className="glass p-10 rounded-[3.5rem] border-2 border-farm-emerald/20 bg-farm-emerald/10">
                <h3 className="text-2xl font-black text-farm-emerald mb-6 flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8" /> Implementation Details
                </h3>
                <p className="text-2xl text-foreground/80 font-bold leading-relaxed tracking-tight mb-8">{selectedRecord.treatment}</p>
                <p className="text-xl text-muted-foreground font-bold leading-relaxed opacity-70 italic">{selectedRecord.notes}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Historical Records */}
        {records.length > 0 && !diseaseResult && !selectedRecord && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Card className="glass rounded-[4rem] p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-2 border-white/10">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-farm-emerald rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">Diagnostic History</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {records.slice(0, 9).map((record, idx) => (
                  <Card
                    key={idx}
                    className="glass p-8 rounded-[3rem] cursor-pointer hover:shadow-2xl transition-all border-2 border-white/5 hover:border-farm-emerald/40 hover:-translate-y-4 hover:scale-[1.02] duration-500 group relative overflow-hidden"
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-farm-emerald/5 rounded-bl-full -z-10 group-hover:bg-farm-emerald/10 transition-colors" />
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mb-1">
                          {new Date(record.timestamp).toLocaleDateString()}
                        </p>
                        <p className="font-black text-foreground text-3xl tracking-tighter group-hover:text-farm-emerald transition-colors">{record.diseaseName}</p>
                      </div>
                      <AlertCircle className={`w-6 h-6 group-hover:scale-125 transition-transform ${record.severity === 'high' ? 'text-red-500' :
                          record.severity === 'medium' ? 'text-farm-sun' :
                            'text-farm-emerald'
                        }`} />
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                      <span className={`inline-block px-4 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase ${record.severity === 'high' ? 'bg-red-500/10 text-red-500' :
                          record.severity === 'medium' ? 'bg-farm-sun/10 text-farm-sun' :
                            'bg-farm-emerald/10 text-farm-emerald'
                        }`}>
                        {record.severity}
                      </span>
                      <span className="text-xs font-black text-muted-foreground">{(record.confidence * 100).toFixed(0)}% Match</span>
                    </div>
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

export default CropsPage;
