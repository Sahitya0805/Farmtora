'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Leaf, AlertTriangle, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';
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
        const result = await detectCropDisease(base64);

        if (result) {
          setDiseaseResult(result);

          // Save to database
          await addCropRecord({
            timestamp: Date.now(),
            cropName: 'Unknown Crop',
            diseaseName: result.disease,
            confidence: result.confidence,
            treatment: result.treatments[0] || 'Consult expert',
            severity: result.severity,
            imageData: base64.substring(0, 100), // Store truncated for DB space
            notes: `Detected with ${(result.confidence * 100).toFixed(1)}% confidence`,
          });

          // Reload records
          await loadRecords();
        }
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('Error detecting disease:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full bg-white hover:bg-gray-100 text-gray-800 border-gray-200">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-accent tracking-tight">{t('crops.title')}</h1>
            <p className="text-gray-600 font-medium tracking-wide">{t('crops.subtitle')}</p>
          </div>
        </div>

        {/* Upload Section */}
        {!diseaseResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <div className="text-center">
              <label className="block mb-6">
                <div className="border-2 border-dashed border-accent rounded-lg p-12 cursor-pointer hover:border-accent/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-accent mb-4" />
                    <p className="mb-2 text-lg font-medium text-gray-800">
                      {t('crops.upload.title')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t('crops.upload.desc')}
                    </p>
                  </div>
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
                    onClick={handleDetect}
                    disabled={loading}
                    className="w-full md:w-auto bg-accent hover:bg-accent/90"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('crops.upload.analyzing')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5" />
                        {t('crops.upload.button')}
                      </div>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Disease Detection Alert */}
        {diseaseResult && !selectedRecord && (
          <Card className={`relative overflow-hidden p-8 mb-8 shadow-xl border-2 ${diseaseResult.severity === 'high' ? 'bg-red-50 border-red-500' :
            diseaseResult.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-green-50 border-green-500'
            }`}>
            {/* Background Graphic */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -z-10 ${diseaseResult.severity === 'high' ? 'bg-red-500/10' :
              diseaseResult.severity === 'medium' ? 'bg-yellow-500/10' :
                'bg-green-500/10'
              }`}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDiseaseResult(null);
                setSelectedFile(null);
                setPreview(null);
              }}
              className="mb-6 relative z-10 bg-white/50 backdrop-blur-sm"
            >
              ← {t('crops.result.uploadAnother')}
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-full ${diseaseResult.severity === 'high' ? 'bg-red-100 animate-pulse' :
                diseaseResult.severity === 'medium' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                {diseaseResult.severity === 'high' ? (
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                ) : diseaseResult.severity === 'medium' ? (
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
              </div>
              <div>
                <h2 className={`text-3xl font-bold tracking-tight ${diseaseResult.severity === 'high' ? 'text-red-600' :
                  diseaseResult.severity === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                  {diseaseResult.severity === 'high' ? t('crops.result.critical') :
                    diseaseResult.severity === 'medium' ? t('crops.result.attention') :
                      t('crops.result.healthy')}
                </h2>
                <p className={`font-medium ${diseaseResult.severity === 'high' ? 'text-red-800/80' :
                  diseaseResult.severity === 'medium' ? 'text-yellow-800/80' :
                    'text-green-800/80'
                  }`}>
                  {t('crops.result.identified')} <strong>{diseaseResult.disease}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {/* Disease Info Panel */}
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border ${diseaseResult.severity === 'high' ? 'border-red-100' :
                diseaseResult.severity === 'medium' ? 'border-yellow-100' :
                  'border-green-100'
                }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{diseaseResult.disease}</h3>
                    <p className="text-gray-600 text-sm">Automated visual diagnostics report.</p>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <span className={`inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider border ${diseaseResult.severity === 'high' ? 'bg-red-100 text-red-700 border-red-200' :
                      diseaseResult.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                        'bg-green-100 text-green-700 border-green-200'
                      }`}>
                      Severity: {diseaseResult.severity}
                    </span>
                    <span className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm border border-gray-200">
                      Confidence: {(diseaseResult.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className={`rounded-xl p-5 border ${diseaseResult.severity === 'high' ? 'bg-red-50/50 border-red-100' :
                  diseaseResult.severity === 'medium' ? 'bg-yellow-50/50 border-yellow-100' :
                    'bg-green-50/50 border-green-100'
                  }`}>
                  <h4 className={`font-bold mb-3 flex items-center gap-2 ${diseaseResult.severity === 'high' ? 'text-red-800' :
                    diseaseResult.severity === 'medium' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                    <ShieldCheck className="w-5 h-5" />
                    {diseaseResult.severity === 'low' ? t('crops.result.statusInfo') : t('crops.result.quickAction')}
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${diseaseResult.severity === 'high' ? 'bg-red-500' :
                        diseaseResult.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      />
                      <span className="text-gray-800 font-medium text-sm leading-relaxed">
                        {diseaseResult.treatments[0]}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Preview Image */}
              {preview && (
                <div className="h-full">
                  <img
                    src={preview}
                    alt="Disease sample"
                    className="w-full h-full object-cover rounded-2xl shadow-md border-4 border-white/50"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Treatments */}
        {diseaseResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">{t('crops.result.treatments')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseaseResult.treatments.map((treatment, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-green-50/50 border border-green-100 hover:shadow-md transition-shadow relative overflow-hidden group"
                  onClick={() => {
                    setSelectedRecord({
                      id: idx,
                      timestamp: Date.now(),
                      cropName: 'Unknown Crop',
                      diseaseName: diseaseResult.disease,
                      confidence: diseaseResult.confidence,
                      treatment,
                      severity: diseaseResult.severity,
                      notes: `Treatment option for ${diseaseResult.disease}`,
                    });
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center min-w-[32px] h-8 bg-white rounded-full text-green-600 font-bold border border-green-200">
                      {idx + 1}
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed pt-1 flex-1">
                      {treatment}
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-500/0 to-green-500/5 group-hover:to-green-500/10 rounded-bl-full transition-colors" />
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Prevention Measures */}
        {diseaseResult && !selectedRecord && (
          <Card className="bg-white p-8 mb-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-accent mb-6">Prevention & Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseaseResult.preventionMeasures.map((measure, idx) => (
                <Card
                  key={idx}
                  className="bg-green-50 p-4 border-l-4 border-accent hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedRecord({
                      id: idx,
                      timestamp: Date.now(),
                      cropName: 'Unknown Crop',
                      diseaseName: diseaseResult.disease,
                      confidence: diseaseResult.confidence,
                      treatment: measure,
                      severity: diseaseResult.severity,
                      notes: `Prevention measure for ${diseaseResult.disease}`,
                    });
                  }}
                >
                  <p className="text-gray-700 font-semibold hover:text-accent transition-colors">
                    {measure}
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
            <h2 className="text-3xl font-bold text-accent mb-4">{selectedRecord.treatment}</h2>
            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{selectedRecord.notes}</p>
              <p className="text-gray-600">
                <strong>Disease:</strong> {selectedRecord.diseaseName}
              </p>
              <p className="text-gray-600">
                <strong>Severity:</strong> {selectedRecord.severity}
              </p>
              <p className="text-gray-600">
                <strong>Confidence:</strong> {(selectedRecord.confidence * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="text-lg font-semibold text-primary mb-2">Implementation Details</h3>
              <p className="text-gray-700">
                For best results with this treatment or prevention measure, apply consistently and monitor crop health regularly. Consult with local agricultural experts for personalized advice.
              </p>
            </div>
          </Card>
        )}

        {/* Historical Records */}
        {records.length > 0 && !diseaseResult && !selectedRecord && (
          <Card className="bg-white p-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-accent mb-6">Detection History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {records.slice(0, 9).map((record, idx) => (
                <Card
                  key={idx}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 cursor-pointer hover:shadow-lg transition-all border-0 hover:scale-105"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(record.timestamp).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-accent">{record.diseaseName}</p>
                    </div>
                    <AlertCircle className={`w-5 h-5 ${record.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Confidence: {(record.confidence * 100).toFixed(0)}%
                  </p>
                  <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs font-semibold rounded">
                    {record.severity}
                  </span>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div >
  );
};

export default CropsPage;
