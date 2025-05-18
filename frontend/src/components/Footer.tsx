import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const footerSections = [
  {
    title: 'Şirket',
    links: [
      { name: 'Hakkımızda', path: '/hakkimizda' },
      { name: 'İletişim', path: '/iletisim' },
      { name: 'Kariyer', path: '/kariyer' },
    ],
  },
  {
    title: 'Destek',
    links: [
      { name: 'Yardım Merkezi', path: '/yardim' },
      { name: 'Güvenlik', path: '/guvenlik' },
      { name: 'Gizlilik Politikası', path: '/gizlilik-politikasi' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { name: 'Kullanım Koşulları', path: '/kullanim-kosullari' },
      { name: 'KVKK', path: '/kvkk' },
      { name: 'Çerez Politikası', path: '/cerez-politikasi' },
    ],
  },
];

const contactInfo = [
  { icon: Mail, text: 'info@otelrez.com' },
  { icon: Phone, text: '+90 (555) 123 45 67' },
  { icon: MapPin, text: 'İstanbul, Türkiye' },
  { icon: Clock, text: '7/24 Hizmet' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <Building2 className="h-8 w-8 text-indigo-500 group-hover:text-indigo-400 transition-colors duration-200" />
              <span className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-200">
                OtelRez
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Türkiye'nin en güvenilir otel rezervasyon platformu. En iyi fiyat garantisi ve 7/24 müşteri desteği.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-white font-semibold text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">İletişim</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {currentYear} OtelRez. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 