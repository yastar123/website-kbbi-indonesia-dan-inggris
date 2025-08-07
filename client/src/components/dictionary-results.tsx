import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, Type, BookOpen, Hash } from "lucide-react";

interface DictionaryEntry {
  id: string;
  word: string;
  type: string;
  pronunciation?: string;
  definition: string;
  example?: string;
  synonyms?: string[];
  dictionary_type: string;
}

interface DictionaryResultsProps {
  results: DictionaryEntry[];
  query: string;
}

export default function DictionaryResults({ results, query }: DictionaryResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-600 mb-2">
          Kata "{query}" tidak ditemukan
        </h3>
        <p className="text-slate-500">
          Coba periksa ejaan atau gunakan kata kunci yang berbeda.
        </p>
      </div>
    );
  }

  const getDictionaryTypeLabel = (type: string) => {
    switch (type) {
      case "kbbi":
        return "KBBI";
      case "english":
        return "English";
      case "tesaurus":
        return "Tesaurus";
      default:
        return type.toUpperCase();
    }
  };

  const getDictionaryTypeColor = (type: string) => {
    switch (type) {
      case "kbbi":
        return "bg-blue-100 text-blue-800";
      case "english":
        return "bg-green-100 text-green-800";
      case "tesaurus":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const playPronunciation = (word: string) => {
    // Use Web Speech API for pronunciation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'id-ID'; // Indonesian
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-slate-600 mb-4">
        Ditemukan {results.length} hasil untuk "<strong>{query}</strong>"
      </div>

      {results.map((result) => (
        <Card key={result.id} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {result.word}
                </CardTitle>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  {result.type && (
                    <div className="flex items-center gap-1">
                      <Type className="w-4 h-4" />
                      <span className="italic">{result.type}</span>
                    </div>
                  )}
                  {result.pronunciation && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => playPronunciation(result.word)}
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        title="Putar pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="font-mono">{result.pronunciation}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Badge className={`${getDictionaryTypeColor(result.dictionary_type)} border-0`}>
                {getDictionaryTypeLabel(result.dictionary_type)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Definition */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Arti
              </h4>
              <p className="text-slate-700 leading-relaxed">{result.definition}</p>
            </div>

            {/* Example */}
            {result.example && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Contoh</h4>
                <p className="text-slate-600 italic bg-slate-50 p-3 rounded-lg border-l-4 border-primary">
                  "{result.example}"
                </p>
              </div>
            )}

            {/* Synonyms */}
            {result.synonyms && result.synonyms.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Sinonim</h4>
                <div className="flex flex-wrap gap-2">
                  {result.synonyms.map((synonym, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50">
                      {synonym}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}