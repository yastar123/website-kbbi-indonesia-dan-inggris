import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, BookOpen } from "lucide-react";
import type { Dictionary } from "@shared/schema";

interface SearchResultsProps {
  results: Dictionary[] | null;
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">
            Kata tidak ditemukan
          </h3>
          <p className="text-slate-500">
            Maaf, kata yang Anda cari tidak ditemukan dalam kamus. 
            Silakan coba kata lain atau periksa ejaan Anda.
          </p>
        </CardContent>
      </Card>
    );
  }

  const playPronunciation = (pronunciation: string) => {
    // In a real app, this would use text-to-speech API
    console.log("Playing pronunciation:", pronunciation);
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <Card key={result.id} className="overflow-hidden">
          <CardContent className="p-6">
            {/* Word Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {result.word}
                  </h2>
                  <div className="flex items-center space-x-4 text-slate-600 mb-4">
                    <Badge variant="secondary">{result.type}</Badge>
                    {result.pronunciation && (
                      <>
                        <span className="text-sm">{result.pronunciation}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playPronunciation(result.pronunciation!)}
                          className="p-1 h-auto"
                        >
                          <Volume2 className="w-4 h-4 text-primary" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {result.dictionary_type}
                </Badge>
              </div>
            </div>

            {/* Definition */}
            <div className="mb-6">
              <div className="flex items-start space-x-3">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-1">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-slate-900 mb-3 text-lg leading-relaxed">
                    {result.definition}
                  </p>
                  
                  {result.example && (
                    <div className="mb-4">
                      <p className="text-slate-600 italic text-sm">
                        <span className="font-medium">Contoh: </span>
                        "{result.example}"
                      </p>
                    </div>
                  )}

                  {/* Synonyms */}
                  {result.synonyms && result.synonyms.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500 font-medium">Sinonim:</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {result.synonyms.map((synonym, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {synonym}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
