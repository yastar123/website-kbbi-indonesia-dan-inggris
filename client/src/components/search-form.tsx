import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { Search, Loader2 } from "lucide-react";

interface SearchFormProps {
  onResults: (results: any, query?: string) => void;
}

interface Suggestion {
  word: string;
  type: string;
  dictionary_type: string;
}

export default function SearchForm({ onResults }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [dictionaryType, setDictionaryType] = useState("kbbi");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get suggestions
  const { data: suggestions = [] } = useQuery<Suggestion[]>({
    queryKey: ["/api/suggestions", query, dictionaryType],
    queryFn: async () => {
      const res = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}&type=${dictionaryType}`);
      return res.json();
    },
    enabled: query.length >= 2,
    staleTime: 5000,
  });

  // Handle search
  const handleSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query;
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);

    try {
      const res = await apiRequest("GET", `/api/search?query=${encodeURIComponent(searchTerm)}&dictionary_type=${dictionaryType}`);
      const results = await res.json();
      onResults(results, searchTerm);
    } catch (error) {
      console.error("Search error:", error);
      onResults([], searchTerm);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.word);
    setShowSuggestions(false);
    handleSearch(suggestion.word);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length >= 2);
  };

  // Handle popular search events
  useEffect(() => {
    const handlePopularSearch = (e: any) => {
      const word = e.detail;
      setQuery(word);
      handleSearch(word);
    };

    document.addEventListener('popularSearch', handlePopularSearch);
    return () => document.removeEventListener('popularSearch', handlePopularSearch);
  }, [dictionaryType]);

  // Handle clicks outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSubmit} className="flex">
        <Select value={dictionaryType} onValueChange={setDictionaryType}>
          <SelectTrigger className="w-40 rounded-r-none border-r-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kbbi">KBBI</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="tesaurus">Tesaurus</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Masukkan kata yang ingin dicari..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(query.length >= 2)}
            className="rounded-none border-x-0 text-lg"
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-b-lg shadow-lg z-40 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                >
                  <span className="font-medium">{suggestion.word}</span>
                  <span className="text-slate-500 ml-2 text-sm">{suggestion.type}</span>
                  <span className="text-xs text-slate-400 ml-2 uppercase">
                    {suggestion.dictionary_type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="rounded-l-none px-8"
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
}