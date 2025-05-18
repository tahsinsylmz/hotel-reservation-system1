import React from 'react';
import { Building2, Star, MapPin } from 'lucide-react';

// Temporary mock data
const mockOteller = [
  {
    id: 1,
    ad: 'Grand Hotel',
    aciklama: 'Lüks ve konforlu bir tatil deneyimi için mükemmel seçim.',
    adres: 'Antalya, Türkiye',
    yildiz: 5,
    fiyat: 1500,
    resim: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 2,
    ad: 'Seaside Resort',
    aciklama: 'Deniz manzaralı, modern ve şık bir tatil deneyimi.',
    adres: 'Bodrum, Türkiye',
    yildiz: 4,
    fiyat: 1200,
    resim: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
  },
];

export default function Oteller() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Oteller</h1>
        <p className="mt-2 text-gray-600">En iyi otelleri keşfedin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockOteller.map((otel) => (
          <div
            key={otel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48">
              <img
                src={otel.resim}
                alt={otel.ad}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                ₺{otel.fiyat}/gece
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{otel.ad}</h3>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-gray-600">{otel.yildiz}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{otel.adres}</span>
              </div>
              <p className="mt-4 text-gray-600 line-clamp-2">{otel.aciklama}</p>
              <button className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                Detayları Gör
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
