import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <a className="inline-flex items-center text-primary hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </a>
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Syarat dan Ketentuan</h1>
          
          <div className="prose max-w-none text-slate-600">
            <p className="text-slate-500 mb-6">Terakhir diperbarui: 1 Januari 2024</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Penerimaan Syarat</h2>
              <p className="mb-4">
                Dengan mengakses dan menggunakan situs web KamusKu, Anda menyetujui untuk terikat oleh 
                syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat ini, 
                mohon tidak menggunakan layanan kami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Deskripsi Layanan</h2>
              <p className="mb-4">
                KamusKu menyediakan layanan kamus online untuk bahasa Indonesia dan Inggris, 
                termasuk KBBI dan tesaurus. Layanan ini gratis untuk digunakan oleh pengguna umum.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Penggunaan yang Diizinkan</h2>
              <p className="mb-4">
                Anda diizinkan untuk:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Mencari arti kata untuk keperluan pribadi atau edukasi</li>
                <li>Menggunakan informasi dari kamus untuk tujuan non-komersial</li>
                <li>Berbagi link ke definisi kata tertentu</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Penggunaan yang Dilarang</h2>
              <p className="mb-4">
                Anda dilarang untuk:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Menggunakan layanan untuk tujuan ilegal atau tidak etis</li>
                <li>Mencoba mengakses bagian yang tidak diotorisasi dari sistem</li>
                <li>Mengganggu atau merusak layanan dalam bentuk apapun</li>
                <li>Menggunakan data secara komersial tanpa izin tertulis</li>
                <li>Menyebarkan malware atau konten berbahaya lainnya</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Hak Kekayaan Intelektual</h2>
              <p className="mb-4">
                Konten yang tersedia di KamusKu, termasuk definisi, desain, dan fitur, 
                dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. 
                Data KBBI bersumber dari proyek open source yang telah disebutkan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Disclaimer</h2>
              <p className="mb-4">
                Layanan disediakan "sebagaimana adanya" tanpa jaminan apapun. 
                Kami tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Keakuratan atau kelengkapan informasi</li>
                <li>Gangguan atau ketidaktersediaan layanan</li>
                <li>Kerugian yang timbul dari penggunaan layanan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Pembatasan Tanggung Jawab</h2>
              <p className="mb-4">
                Dalam keadaan apapun, KamusKu tidak akan bertanggung jawab atas kerusakan 
                langsung, tidak langsung, insidental, khusus, atau konsekuensial yang 
                timbul dari penggunaan atau ketidakmampuan menggunakan layanan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Perubahan Syarat</h2>
              <p className="mb-4">
                Kami berhak mengubah syarat dan ketentuan ini kapan saja. 
                Perubahan akan berlaku segera setelah dipublikasikan di situs web ini. 
                Penggunaan berkelanjutan setelah perubahan berarti Anda menerima syarat yang baru.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Penghentian</h2>
              <p className="mb-4">
                Kami dapat menghentikan atau menangguhkan akses Anda ke layanan 
                kapan saja tanpa pemberitahuan sebelumnya jika Anda melanggar syarat ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Hukum yang Berlaku</h2>
              <p className="mb-4">
                Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan 
                hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui 
                pengadilan yang berwenang di Jakarta.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
