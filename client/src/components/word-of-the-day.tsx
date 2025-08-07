import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Volume2 } from "lucide-react";

export default function WordOfTheDay() {
  const todayWord = {
    word: "serendipitas",
    type: "kata benda",
    pronunciation: "/se·ren·di·pi·tas/",
    definition: "Kemampuan seseorang untuk membuat penemuan yang berguna atau menyenangkan secara tidak sengaja",
    example: "Penemuan penicillin adalah hasil dari serendipitas Fleming yang luar biasa",
    synonyms: ["kebetulan beruntung", "temuan tak terduga"],
    dictionary_type: "kbbi",
    date: new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const playPronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(todayWord.word);
      utterance.lang = 'id-ID';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Kata Hari Ini
          </div>
          <Badge className="bg-blue-100 text-blue-800 border-0">
            {todayWord.dictionary_type.toUpperCase()}
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-600">{todayWord.date}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-slate-900">{todayWord.word}</h3>
            <button
              onClick={playPronunciation}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Putar pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <span className="italic">{todayWord.type}</span>
            <span className="font-mono text-blue-700">{todayWord.pronunciation}</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Arti:</h4>
          <p className="text-slate-700 leading-relaxed">{todayWord.definition}</p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Contoh:</h4>
          <p className="text-slate-600 italic bg-white p-3 rounded-md border-l-4 border-blue-400">
            "{todayWord.example}"
          </p>
        </div>

        {todayWord.synonyms && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Sinonim:</h4>
            <div className="flex flex-wrap gap-2">
              {todayWord.synonyms.map((synonym, index) => (
                <Badge key={index} variant="outline" className="bg-white border-blue-300 text-blue-700">
                  {synonym}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}