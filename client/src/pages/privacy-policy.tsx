import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Kebijakan Privasi</h1>
          
          <div className="prose max-w-none text-slate-600">
            <p className="text-slate-500 mb-6">Terakhir diperbarui: 1 Januari 2024</p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Informasi yang Kami Kumpulkan</h2>
              <p className="mb-4">
                Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti saat Anda:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Menggunakan fitur pencarian kamus</li>
                <li>Menghubungi kami melalui formulir kontak</li>
                <li>Berinteraksi dengan fitur-fitur situs web kami</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Bagaimana Kami Menggunakan Informasi</h2>
              <p className="mb-4">
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Menyediakan dan meningkatkan layanan kamus</li>
                <li>Menganalisis penggunaan situs untuk peningkatan fitur</li>
                <li>Merespons pertanyaan dan permintaan Anda</li>
                <li>Mengirim informasi yang relevan tentang layanan kami</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Berbagi Informasi</h2>
              <p className="mb-4">
                Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga 
                tanpa persetujuan Anda, kecuali dalam keadaan berikut:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Ketika diperlukan oleh hukum</li>
                <li>Untuk melindungi hak dan keamanan kami atau orang lain</li>
                <li>Dengan penyedia layanan tepercaya yang membantu mengoperasikan situs web kami</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Keamanan Data</h2>
              <p className="mb-4">
                Kami menerapkan berbagai langkah keamanan untuk melindungi informasi pribadi Anda. 
                Namun, tidak ada sistem yang 100% aman, dan kami tidak dapat menjamin keamanan absolut.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Cookies</h2>
              <p className="mb-4">
                Situs web kami menggunakan cookies untuk meningkatkan pengalaman pengguna. 
                Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser Anda.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Hak Anda</h2>
              <p className="mb-4">
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
                <li>Meminta koreksi atau penghapusan informasi pribadi Anda</li>
                <li>Menolak pemrosesan informasi pribadi Anda</li>
                <li>Menarik persetujuan yang telah diberikan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Perubahan Kebijakan</h2>
              <p className="mb-4">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. 
                Perubahan akan diberitahukan melalui situs web ini.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Hubungi Kami</h2>
              <p className="mb-4">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
              </p>
              <div className="bg-slate-100 p-4 rounded-lg">
                <p>Email: admin@kamusku.com</p>
                <p>Telepon: +62 21 1234 5678</p>
                <p>Alamat: Jakarta, Indonesia</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
