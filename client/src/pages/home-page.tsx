import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";
import AdSpace from "@/components/ad-space";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Search, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results: any) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  const popularSearches = ["rumah", "love", "beautiful", "kehidupan"];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Search Section */}
        <section className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Kamus Indonesia & Inggris
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Temukan arti kata dalam KBBI dan kamus bahasa Inggris dengan mudah dan cepat
            </p>

            <SearchForm onResults={handleSearchResults} />

            {/* Popular Searches */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-slate-500 text-sm">Pencarian populer:</span>
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => {
                    // Trigger search with popular word
                    const event = new CustomEvent('popularSearch', { detail: search });
                    document.dispatchEvent(event);
                  }}
                  className="text-primary hover:underline text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Results Section */}
          <div className="lg:col-span-3">
            {hasSearched ? (
              <SearchResults results={searchResults} />
            ) : (
              <div className="text-center py-12">
                <Search className="text-slate-300 w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">Mulai pencarian kata</h3>
                <p className="text-slate-500">Masukkan kata yang ingin Anda cari di kotak pencarian di atas</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdSpace />

            {/* Quick Stats */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Statistik Kamus
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Kata KBBI:</span>
                    <span className="font-medium">127,036</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Kata English:</span>
                    <span className="font-medium">89,421</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pencarian hari ini:</span>
                    <span className="font-medium">1,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AdSpace type="sponsor" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
