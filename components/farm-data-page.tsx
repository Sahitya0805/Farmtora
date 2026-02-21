'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { fetchGovernmentAdvisories, fetchResearchArticles } from '@/lib/api-services';
import { addFarmDataRecord, getFarmDataRecords } from '@/lib/db';

interface FarmDataRecord {
  id?: number;
  timestamp: number;
  dataType: string;
  title: string;
  content: string;
  source: string;
  relevance?: number;
}

const FarmDataPage = () => {
  const [advisories, setAdvisories] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [savedData, setSavedData] = useState<FarmDataRecord[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch advisories
      const advisoriesData = await fetchGovernmentAdvisories();
      setAdvisories(advisoriesData);

      // Save to database
      for (const advisory of advisoriesData) {
        await addFarmDataRecord({
          timestamp: Date.now(),
          dataType: 'government_advisory',
          title: advisory.title,
          content: advisory.content,
          source: advisory.source,
          relevance: 0.9,
        });
      }

      // Fetch articles
      const articlesData = await fetchResearchArticles();
      setArticles(articlesData);

      // Save to database
      for (const article of articlesData) {
        await addFarmDataRecord({
          timestamp: Date.now(),
          dataType: 'research',
          title: article.title,
          content: article.content,
          source: article.source,
          relevance: 0.85,
        });
      }

      // Load all saved data
      const allData = await getFarmDataRecords();
      setSavedData(allData);
    } catch (error) {
      console.error('Error loading farm data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Agricultural Database</h1>
            <p className="text-gray-600">Government advisories, research articles, and best practices</p>
          </div>
        </div>

        {!selectedItem && (
          <Tabs defaultValue="advisories" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="advisories" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Advisories</span>
              </TabsTrigger>
              <TabsTrigger value="research" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Research</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
            </TabsList>

            {/* Advisories Tab */}
            <TabsContent value="advisories">
              <div className="space-y-4">
                {advisories.map((advisory, idx) => (
                  <Card
                    key={idx}
                    className="bg-white p-6 shadow-md border-l-4 border-primary hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => setSelectedItem({ ...advisory, type: 'advisory' })}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-primary flex-1">{advisory.title}</h3>
                      <Award className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{advisory.content}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{advisory.source}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(advisory.date).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research">
              <div className="space-y-4">
                {articles.map((article, idx) => (
                  <Card
                    key={idx}
                    className="bg-white p-6 shadow-md border-l-4 border-accent hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                    onClick={() => setSelectedItem({ ...article, type: 'research' })}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-accent flex-1">{article.title}</h3>
                      <BookOpen className="w-5 h-5 text-accent flex-shrink-0 ml-4" />
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">{article.source}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(article.date).toLocaleDateString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Saved Data Tab */}
            <TabsContent value="saved">
              {savedData.length > 0 ? (
                <div className="space-y-4">
                  {savedData.map((item, idx) => (
                    <Card
                      key={idx}
                      className="bg-white p-6 shadow-md border-l-4 border-secondary hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-secondary flex-1">{item.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${item.dataType === 'government_advisory'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-accent/20 text-accent'
                          }`}>
                          {item.dataType === 'government_advisory' ? 'Advisory' : 'Research'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{item.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">{item.source}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white p-8 text-center shadow-md border-0">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No saved data yet. Browse advisories and articles to save them.</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Detailed View */}
        {selectedItem && (
          <Card className="bg-white p-8 shadow-lg border-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedItem(null)}
              className="mb-6"
            >
              ← Back
            </Button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {selectedItem.type === 'advisory' ? (
                  <Award className="w-6 h-6 text-primary" />
                ) : (
                  <BookOpen className="w-6 h-6 text-accent" />
                )}
                <span className={`px-3 py-1 text-xs font-semibold rounded ${selectedItem.type === 'advisory'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-accent/20 text-accent'
                  }`}>
                  {selectedItem.type === 'advisory' ? 'Government Advisory' : 'Research Article'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-primary mb-3">{selectedItem.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <p>Source: {selectedItem.source}</p>
                <p>Published: {new Date(selectedItem.date || selectedItem.timestamp).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {selectedItem.content}
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-blue-50 p-6 border-0">
                <h3 className="text-lg font-bold text-primary mb-3">Relevance to Farming</h3>
                <p className="text-gray-700">
                  This information is highly relevant to agricultural practices in India. Regular updates on weather,
                  disease management, and sustainable farming are essential for maximizing yields.
                </p>
              </Card>

              <Card className="bg-green-50 p-6 border-0">
                <h3 className="text-lg font-bold text-accent mb-3">How to Apply</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Review the recommendations carefully</li>
                  <li>• Implement changes gradually</li>
                  <li>• Monitor results and adjust as needed</li>
                  <li>• Share with neighboring farmers</li>
                </ul>
              </Card>
            </div>

            {/* Related Information */}
            <Card className="bg-amber-50 p-6 border-l-4 border-secondary">
              <h3 className="text-lg font-bold text-secondary mb-3">Additional Resources</h3>
              <p className="text-gray-700 mb-4">
                For more information on this topic, consult with:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Local agricultural extension officers</li>
                <li>• Ministry of Agriculture & Farmers Welfare</li>
                <li>• Indian Council of Agricultural Research (ICAR)</li>
                <li>• State agriculture departments</li>
                <li>• Experienced farmers in your region</li>
              </ul>
            </Card>
          </Card>
        )}

        {loading && (
          <Card className="bg-white p-8 shadow-lg border-0 text-center">
            <p className="text-gray-600">Loading agricultural data...</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmDataPage;
