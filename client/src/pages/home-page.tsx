import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchForm from "@/components/search-form";
import DictionaryResults from "@/components/dictionary-results";
import PopularWords from "@/components/popular-words";
import WordOfTheDay from "@/components/word-of-the-day";
import AdSenseBanner from "@/components/adsense-banner";
import { Book, Search, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchResults = (results: any, query: string = "") => {
    setSearchResults(results);
    setSearchQuery(query);
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
        {hasSearched ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <DictionaryResults results={searchResults} query={searchQuery} />
            </div>
            <div className="space-y-6">
              <AdSenseBanner slot="search-results-sidebar" format="rectangle" />
              <WordOfTheDay />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-8">
              <WordOfTheDay />
              <PopularWords />
              
              {/* Horizontal Ad */}
              <AdSenseBanner 
                slot="homepage-middle" 
                format="horizontal" 
                className="w-full"
              />
              
              {/* Dictionary Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-3 text-blue-600">KBBI</h3>
                  <p className="text-slate-600 text-sm">
                    Kamus Besar Bahasa Indonesia dengan ribuan kata dan definisi resmi.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-3 text-green-600">English Dictionary</h3>
                  <p className="text-slate-600 text-sm">
                    Comprehensive English dictionary with pronunciation and examples.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="font-semibold text-lg mb-3 text-purple-600">Tesaurus</h3>
                  <p className="text-slate-600 text-sm">
                    Temukan sinonim dan antonim untuk memperkaya kosakata Anda.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <AdSenseBanner slot="homepage-sidebar-top" format="rectangle" />
              
              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold text-lg mb-4">Statistik</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Kata:</span>
                    <span className="font-semibold">50,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pencarian Hari Ini:</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Pengguna Aktif:</span>
                    <span className="font-semibold">892</span>
                  </div>
                </div>
              </div>
              
              <AdSenseBanner slot="homepage-sidebar-bottom" format="rectangle" />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
