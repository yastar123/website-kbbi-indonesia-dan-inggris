import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DictionaryForm from "@/components/dictionary-form";
import WordList from "@/components/word-list";
import { Settings, Book, Users, FileText, BarChart3, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("dictionary");
  const [editingWord, setEditingWord] = useState(null);

  const handleEditWord = (word: any) => {
    setEditingWord(word);
  };

  const handleWordSaved = () => {
    setEditingWord(null);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Settings className="text-primary w-6 h-6" />
              <span className="font-bold text-xl text-slate-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-600">{user?.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dictionary" className="flex items-center">
              <Book className="w-4 h-4 mr-2" />
              Manajemen Kamus
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Pengguna
            </TabsTrigger>
            <TabsTrigger value="sitemap" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              XML Sitemap
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dictionary" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <DictionaryForm 
                  editingWord={editingWord}
                  onWordSaved={handleWordSaved}
                />
              </div>
              <div className="lg:col-span-2">
                <WordList onEditWord={handleEditWord} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pengguna</CardTitle>
                <CardDescription>
                  Kelola akun admin dan pengguna sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Fitur manajemen pengguna akan segera hadir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sitemap" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>XML Sitemap</CardTitle>
                <CardDescription>
                  Generate dan kelola XML sitemap untuk SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    XML Sitemap otomatis dibuat berdasarkan kata-kata di database. 
                    Sitemap dapat diakses di URL berikut:
                  </p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <code className="text-sm text-slate-800">
                      {window.location.origin}/sitemap.xml
                    </code>
                  </div>
                  <Button asChild>
                    <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Lihat Sitemap
                    </a>
                  </Button>
                  <div className="text-sm text-slate-500 space-y-1">
                    <p>• Sitemap mencakup halaman utama dan semua kata dalam kamus</p>
                    <p>• Update otomatis setiap kali ada penambahan/perubahan kata</p>
                    <p>• Submit sitemap ini ke Google Search Console untuk indexing yang lebih baik</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Kata KBBI</CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127,036</div>
                  <p className="text-xs text-muted-foreground">+12 dari kemarin</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kata English</CardTitle>
                  <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89,421</div>
                  <p className="text-xs text-muted-foreground">+8 dari kemarin</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pencarian Hari Ini</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+15% dari kemarin</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Statistik Pencarian</CardTitle>
                <CardDescription>
                  Analytics dan metrik penggunaan kamus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Fitur analytics detail akan segera hadir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
