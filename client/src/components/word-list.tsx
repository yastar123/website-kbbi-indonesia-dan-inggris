import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Edit, Trash2, Search } from "lucide-react";
import type { Dictionary } from "@shared/schema";

interface WordListProps {
  onEditWord: (word: Dictionary) => void;
}

export default function WordList({ onEditWord }: WordListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { data: dictionaries = [], isLoading } = useQuery<Dictionary[]>({
    queryKey: ["/api/admin/dictionaries", { search: searchFilter, type: typeFilter }],
    staleTime: 5000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/dictionaries/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Kata berhasil dihapus",
        description: "Kata telah dihapus dari database",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dictionaries"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal menghapus kata",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = (word: Dictionary) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kata "${word.word}"?`)) {
      deleteMutation.mutate(word.id);
    }
  };

  const getDictionaryTypeColor = (type: string) => {
    switch (type) {
      case 'kbbi':
        return 'bg-blue-100 text-blue-800';
      case 'english':
        return 'bg-green-100 text-green-800';
      case 'tesaurus':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Daftar Kata</CardTitle>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Cari kata..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Semua Kamus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non">Semua Kamus</SelectItem>
                <SelectItem value="kbbi">KBBI</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="tesaurus">Tesaurus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {dictionaries.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            Tidak ada kata yang ditemukan
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Kata
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Jenis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Kamus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Definisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {dictionaries.map((word) => (
                  <tr key={word.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{word.word}</div>
                        {word.pronunciation && (
                          <div className="text-sm text-slate-500">{word.pronunciation}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">{word.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getDictionaryTypeColor(word.dictionary_type)}>
                        {word.dictionary_type.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-xs truncate">
                        {word.definition}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditWord(word)}
                          className="text-primary hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(word)}
                          disabled={deleteMutation.isPending}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {dictionaries.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-between items-center text-sm text-slate-500">
              <span>Menampilkan {dictionaries.length} kata</span>
              <span>Total dalam database</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
