import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Book, FileText, Mail, Menu, User } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "KBBI", href: "/?type=kbbi", icon: Book },
    { name: "English", href: "/?type=english", icon: Book },
    { name: "Tesaurus", href: "/?type=tesaurus", icon: Book },
    { name: "Kontak", href: "/contact-us", icon: Mail },
    { name: "Privacy", href: "/privacy-policy", icon: FileText },
    { name: "Terms", href: "/terms-conditions", icon: FileText },
    { name: "Admin", href: "/auth", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary"
                      : "text-slate-600 hover:text-primary"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-primary text-white"
                            : "text-slate-600 hover:text-primary hover:bg-slate-50"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}