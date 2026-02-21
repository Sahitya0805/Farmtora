'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Heart, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
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
        const result = await identifyCattleBreed(base64);

        if (result) {
          setBreedResult(result);

          // Save to database
          await addCattleRecord({
            timestamp: Date.now(),
            breed: result.breed,
            age: 3,
            healthStatus: 'Good',
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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">{t('cattle.title')}</h1>
            <p className="text-gray-600">{t('cattle.subtitle')}</p>
          </div>
        </div>

        {/* Upload Section */}
        {!breedResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <div className="text-center">
              <label className="block mb-6">
                <div className="border-2 border-dashed border-secondary rounded-lg p-12 cursor-pointer hover:border-secondary/70 transition-colors">
                  <Upload className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {t('crops.upload.title')}
                  </p>
                  <p className="text-gray-600">{t('crops.upload.desc')}</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </label>

              {preview && (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-md mx-auto mb-6 rounded-lg shadow-md h-auto"
                  />
                  <Button
                    size="lg"
                    onClick={handleIdentify}
                    disabled={loading}
                    className="w-full md:w-auto bg-secondary hover:bg-secondary/90"
                  >
                    {loading ? t('crops.upload.analyzing') : t('crops.upload.button')}
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Breed Identification Results */}
        {breedResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setBreedResult(null);
                setSelectedFile(null);
                setPreview(null);
              }}
              className="mb-6"
            >
              ← {t('crops.result.uploadAnother')}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Breed Info */}
              <div>
                <div className="mb-6 p-4 rounded-lg bg-orange-50 border-l-4 border-secondary">
                  <h2 className="text-3xl font-bold text-secondary mb-3">{breedResult.breed}</h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <strong>{t('cattle.origin')}:</strong> {breedResult.origin}
                    </p>
                    <p className="text-gray-700">
                      <strong>{t('crops.result.confidence')}:</strong> {(breedResult.confidence * 100).toFixed(1)}%
                    </p>
                    <p className="text-gray-700">
                      <strong>{t('cattle.production')}:</strong> {breedResult.productionCapacity}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-blue-50 p-4 border-0">
                    <p className="text-sm text-gray-600 mb-1">{t('cattle.characteristics')}</p>
                    <p className="text-2xl font-bold text-primary">{breedResult.characteristics.length}</p>
                  </Card>
                  <Card className="bg-red-50 p-4 border-0">
                    <p className="text-sm text-gray-600 mb-1">{t('cattle.healthPoints')}</p>
                    <p className="text-2xl font-bold text-red-600">{breedResult.healthConcerns.length}</p>
                  </Card>
                </div>
              </div>

              {/* Preview Image */}
              {preview && (
                <div>
                  <img
                    src={preview}
                    alt="Cattle"
                    className="w-full rounded-lg shadow-md h-auto"
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Disease Alert Section */}
        {breedResult?.diseaseDetected && !selectedRecord && (
          <Card className="bg-red-50 p-8 mb-8 shadow-xl border-2 border-red-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -z-10" />

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full animate-pulse">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-red-600 tracking-tight">{t('cattle.healthAlert')}</h2>
                <p className="text-red-800/80 font-medium">{t('cattle.urgent')}</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-red-100">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{breedResult.diseaseDetected.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{breedResult.diseaseDetected.description}</p>
                </div>
                <div className="flex flex-col gap-2 min-w-[140px]">
                  <span className="inline-flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-xl font-bold text-sm uppercase tracking-wider border border-red-200">
                    Severity: {breedResult.diseaseDetected.severity}
                  </span>
                  <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm border border-gray-200">
                    Confidence: {(breedResult.diseaseDetected.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Recommended Immediate Actions:
                </h4>
                <ul className="space-y-3">
                  {breedResult.diseaseDetected.treatments.map((tr, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span className="text-gray-800 font-medium">{tr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Characteristics */}
        {breedResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-secondary mb-6">{t('cattle.characteristics')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {breedResult.characteristics.map((char, idx) => (
                <Card
                  key={idx}
                  className="bg-green-50 p-4 border-l-4 border-secondary hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedRecord({
                      id: idx,
                      timestamp: Date.now(),
                      breed: breedResult.breed,
                      age: 0,
                      healthStatus: 'Unknown',
                      weight: 0,
                      lastVaccine: '',
                      notes: `Characteristic: ${char}`,
                    });
                  }}
                >
                  <p className="text-gray-700 font-semibold hover:text-secondary transition-colors">
                    {char}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Health Concerns */}
        {breedResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-red-600">{t('cattle.healthPoints')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {breedResult.healthConcerns.map((concern, idx) => (
                <Card
                  key={idx}
                  className="bg-red-50 p-4 border-l-4 border-red-600 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedRecord({
                      id: idx,
                      timestamp: Date.now(),
                      breed: breedResult.breed,
                      age: 0,
                      healthStatus: concern,
                      weight: 0,
                      lastVaccine: '',
                      notes: `Health Concern: ${concern}. Regular monitoring and preventive care recommended.`,
                    });
                  }}
                >
                  <p className="text-gray-700 font-semibold hover:text-red-600 transition-colors">
                    {concern}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Treatment Tips */}
        {breedResult && !selectedRecord && breedResult.treatmentTips && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-emerald-600">{t('cattle.treatmentTips')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breedResult.treatmentTips.map((tip, idx) => (
                <Card
                  key={idx}
                  className="bg-emerald-50 p-5 border-l-4 border-emerald-500 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedRecord({
                      id: String(idx + 100) as any, // offset id
                      timestamp: Date.now(),
                      breed: breedResult.breed,
                      age: 0,
                      healthStatus: 'Proactive Care',
                      weight: 0,
                      lastVaccine: '',
                      notes: `Care Tip: ${tip}. Incorporate this into your regular farm management routine.`,
                    });
                  }}
                >
                  <p className="text-gray-800 font-medium hover:text-emerald-700 transition-colors">
                    {tip}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Detailed Record View */}
        {selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRecord(null)}
              className="mb-6"
            >
              ← Back
            </Button>
            <h2 className="text-3xl font-bold text-secondary mb-4">{selectedRecord.breed}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-blue-50 p-4 border-0">
                <p className="text-sm text-gray-600 mb-1">Health Status</p>
                <p className="text-2xl font-bold text-primary">{selectedRecord.healthStatus}</p>
              </Card>
              <Card className="bg-green-50 p-4 border-0">
                <p className="text-sm text-gray-600 mb-1">Last Updated</p>
                <p className="text-lg font-bold text-accent">
                  {new Date(selectedRecord.timestamp).toLocaleDateString()}
                </p>
              </Card>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-primary mb-2">Details</h3>
              <p className="text-gray-700">{selectedRecord.notes}</p>
            </div>
          </Card>
        )}

        {/* Historical Records */}
        {records.length > 0 && !breedResult && !selectedRecord && (
          <Card className="bg-white p-8 shadow-lg border-0">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-secondary">Your Cattle Herd</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {records.slice(0, 9).map((record, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 cursor-pointer hover:shadow-lg transition-all border-0 hover:scale-105"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-secondary text-lg">{record.breed}</p>
                    </div>
                    <Heart className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Status: {record.healthStatus}
                  </p>
                  {record.weight > 0 && (
                    <span className="inline-block px-2 py-1 bg-secondary/20 text-secondary text-xs font-semibold rounded">
                      {record.weight} kg
                    </span>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CattlePage;
