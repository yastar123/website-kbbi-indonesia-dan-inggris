import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Mail, Phone, MapPin, Send } from "lucide-react";
import { Link } from "wouter";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Pesan terkirim",
        description: data.message,
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Gagal mengirim pesan",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Form tidak lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </a>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-slate-600">
            Ada pertanyaan atau saran? Kami senang mendengar dari Anda!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>
                  Hubungi kami melalui informasi berikut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary w-5 h-5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-slate-600">admin@kamusku.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary w-5 h-5" />
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-slate-600">+62 21 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary w-5 h-5" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-slate-600">Jakarta, Indonesia</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jam Operasional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span className="text-slate-600">09:00 - 17:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="text-slate-600">09:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="text-slate-600">Tutup</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tentang KamusKu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  KamusKu adalah platform kamus online yang menyediakan akses mudah dan cepat 
                  ke definisi kata dalam bahasa Indonesia (KBBI) dan bahasa Inggris. 
                  Kami berkomitmen untuk menyediakan informasi yang akurat dan bermanfaat 
                  bagi semua pengguna.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>
                Isi formulir di bawah ini dan kami akan merespons secepat mungkin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tuliskan pesan, pertanyaan, atau saran Anda di sini..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    "Mengirim..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
