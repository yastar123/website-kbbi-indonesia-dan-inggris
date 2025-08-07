import { Link } from "wouter";
import { Book, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="text-primary w-8 h-8" />
              <div>
                <span className="font-bold text-xl text-slate-900">KamusKu</span>
                <div className="text-xs text-slate-500 -mt-1">Indonesia • English</div>
              </div>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Platform kamus online terlengkap untuk bahasa Indonesia dan Inggris. 
              Temukan arti kata dengan mudah dan cepat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kamus Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Kamus</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/?type=kbbi" className="text-slate-600 hover:text-primary transition-colors">
                  KBBI
                </Link>
              </li>
              <li>
                <Link href="/?type=english" className="text-slate-600 hover:text-primary transition-colors">
                  English Dictionary
                </Link>
              </li>
              <li>
                <Link href="/?type=tesaurus" className="text-slate-600 hover:text-primary transition-colors">
                  Tesaurus
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors">
                  Kata Populer
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact-us" className="text-slate-600 hover:text-primary transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-600 hover:text-primary transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-slate-600 hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-slate-600 hover:text-primary transition-colors">
                  Sitemap
                </a>
              </li>
              <li>
                <Link href="/auth" className="text-slate-600 hover:text-primary transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 mt-8">
          <div className="text-center text-slate-500">
            <p className="mb-2">
              © {currentYear} KamusKu. Semua hak dilindungi.
            </p>
            <p className="text-sm">
              Data KBBI dari{" "}
              <a 
                href="https://github.com/hanjoyo/kbbi" 
                className="text-primary hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                hanjoyo/kbbi
              </a>
              {" "}dan{" "}
              <a 
                href="https://github.com/victoriasovereigne/tesaurus" 
                className="text-primary hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                victoriasovereigne/tesaurus
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}