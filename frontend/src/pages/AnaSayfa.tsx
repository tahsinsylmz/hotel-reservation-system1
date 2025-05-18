import React from 'react';
import Hero from '../components/Hero';
import OtelCard from '../components/OtelCard';

const featuredHotels = [
  {
    id: 1,
    ad: 'Grand Hotel İstanbul',
    aciklama: 'Boğaz manzaralı lüks otel, spa ve restoran hizmetleri',
    fiyat: 2500,
    puan: 4.8,
    resim: '/images/oteller/grand-hotel.jpg',
    konum: 'İstanbul, Beşiktaş',
  },
  {
    id: 2,
    ad: 'Blue Resort Antalya',
    aciklama: 'Deniz manzaralı resort otel, özel plaj ve su sporları',
    fiyat: 1800,
    puan: 4.6,
    resim: '/images/oteller/blue-resort.jpg',
    konum: 'Antalya, Konyaaltı',
  },
  {
    id: 3,
    ad: 'Mountain Lodge Bolu',
    aciklama: 'Doğa ile iç içe konaklama, kayak ve doğa sporları',
    fiyat: 1200,
    puan: 4.7,
    resim: '/images/oteller/mountain-lodge.jpg',
    konum: 'Bolu, Kartalkaya',
  },
];

export default function AnaSayfa() {
  return (
    <div>
      <Hero />
      
      {/* Featured Hotels Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Öne Çıkan Oteller
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              En çok tercih edilen ve en yüksek puanlı otellerimizi keşfedin
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredHotels.map((hotel) => (
              <OtelCard key={hotel.id} {...hotel} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Daha Hızlı Rezervasyon
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Neden Bizi Tercih Etmelisiniz?
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Güvenilir, hızlı ve kolay rezervasyon deneyimi için doğru adrestesiniz.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Güvenli Ödeme',
                  description: 'SSL sertifikalı güvenli ödeme sistemi ile güvenle ödeme yapın.',
                },
                {
                  name: '7/24 Destek',
                  description: 'Müşteri hizmetlerimiz her zaman yanınızda.',
                },
                {
                  name: 'En İyi Fiyat Garantisi',
                  description: 'Aynı otel için daha uygun fiyat bulursanız fark iadesi.',
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 