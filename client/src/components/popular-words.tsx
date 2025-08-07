import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface PopularWord {
  word: string;
  category: string;
  searches: number;
}

export default function PopularWords() {
  const popularWords: PopularWord[] = [
    { word: "demokrasi", category: "KBBI", searches: 1234 },
    { word: "beautiful", category: "English", searches: 987 },
    { word: "cantik", category: "Tesaurus", searches: 756 },
    { word: "teknologi", category: "KBBI", searches: 654 },
    { word: "education", category: "English", searches: 543 },
    { word: "bijaksana", category: "Tesaurus", searches: 432 },
    { word: "lingkungan", category: "KBBI", searches: 321 },
    { word: "innovation", category: "English", searches: 298 },
  ];

  const handlePopularWordClick = (word: string) => {
    // Dispatch custom event to trigger search
    const event = new CustomEvent('popularSearch', { detail: word });
    document.dispatchEvent(event);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
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

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
          Kata Populer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularWords.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePopularWordClick(item.word)}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-slate-50 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-900">{item.word}</span>
                <Badge className={`${getCategoryColor(item.category)} border-0 text-xs`}>
                  {item.category}
                </Badge>
              </div>
              <span className="text-xs text-slate-500">{item.searches.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}