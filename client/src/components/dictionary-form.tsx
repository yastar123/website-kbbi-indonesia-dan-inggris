import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertDictionarySchema, type InsertDictionary } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from "lucide-react";

interface DictionaryFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DictionaryForm({ initialData, onSuccess, onCancel }: DictionaryFormProps) {
  const [synonymsList, setSynonymsList] = useState<string>(
    initialData?.synonyms ? initialData.synonyms.join(", ") : ""
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertDictionary>({
    resolver: zodResolver(insertDictionarySchema),
    defaultValues: {
      word: initialData?.word || "",
      type: initialData?.type || "",
      pronunciation: initialData?.pronunciation || undefined,
      definition: initialData?.definition || "",
      example: initialData?.example || undefined,
      synonyms: initialData?.synonyms || [],
      dictionary_type: initialData?.dictionary_type || "kbbi",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertDictionary) => {
      const response = await apiRequest("POST", "/api/dictionary", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dictionaries"] });
      toast({
        title: "Berhasil",
        description: "Kata berhasil ditambahkan ke kamus",
      });
      form.reset();
      setSynonymsList("");
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan saat menambahkan kata",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertDictionary) => {
      const response = await apiRequest("PUT", `/api/dictionary/${initialData.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dictionaries"] });
      toast({
        title: "Berhasil",
        description: "Kata berhasil diperbarui",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan saat memperbarui kata",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDictionary) => {
    // Process synonyms
    const synonymsArray = synonymsList
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const formData = {
      ...data,
      synonyms: synonymsArray.length > 0 ? synonymsArray : undefined,
    };

    if (initialData) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {initialData ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {initialData ? "Edit Kata" : "Tambah Kata Baru"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata *</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan kata" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kata</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: kata benda, verb, adjective" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pronunciation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pelafalan</FormLabel>
                    <FormControl>
                      <Input placeholder="/pronunciation/" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dictionary_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kamus *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis kamus" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kbbi">KBBI</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="tesaurus">Tesaurus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Definisi *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan definisi kata" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contoh Penggunaan</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Masukkan contoh penggunaan kata dalam kalimat" 
                      className="min-h-[80px]"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Sinonim</FormLabel>
              <FormControl>
                <Input
                  placeholder="kata1, kata2, kata3 (pisahkan dengan koma)"
                  value={synonymsList}
                  onChange={(e) => setSynonymsList(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Pisahkan setiap sinonim dengan koma
              </FormDescription>
            </FormItem>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Menyimpan..." : initialData ? "Perbarui" : "Tambah Kata"}
              </Button>
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Batal
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}