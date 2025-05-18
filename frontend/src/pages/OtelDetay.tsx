import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Waves, Utensils } from 'lucide-react';

export default function OtelDetay() {
  const { id } = useParams();

  // Simulated hotel data
  const otel = {
    id: Number(id),
    ad: 'Grand Hotel',
    aciklama: 'Lüks ve konforlu bir tatil deneyimi için mükemmel seçim.',
    adres: 'Antalya, Türkiye',
    yildiz: 5,
    resim: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
    ozellikler: [
      { icon: Wifi, text: 'Ücretsiz Wi-Fi' },
      { icon: Car, text: 'Ücretsiz Otopark' },
      { icon: Waves, text: 'Açık/Kapalı Havuz' },
      { icon: Utensils, text: 'Restoran' },
    ],
    odalar: [
      {
        id: 1,
        ad: 'Standart Oda',
        aciklama: '2 kişilik, şehir manzaralı',
        fiyat: 1000,
        resim: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
      },
      {
        id: 2,
        ad: 'Deluxe Oda',
        aciklama: '2 kişilik, deniz manzaralı',
        fiyat: 1500,
        resim: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80',
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Hotel Header */}
      <div className="relative h-96">
        <img
          src={otel.resim}
          alt={otel.ad}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold">{otel.ad}</h1>
          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1">{otel.yildiz} Yıldız</span>
            <MapPin className="h-5 w-5 ml-4" />
            <span className="ml-1">{otel.adres}</span>
          </div>
        </div>
      </div>

      {/* Hotel Features */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {otel.ozellikler.map((ozellik, index) => (
          <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow">
            <ozellik.icon className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">{ozellik.text}</span>
          </div>
        ))}
      </div>

      {/* Hotel Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900">Otel Hakkında</h2>
        <p className="mt-4 text-gray-600">{otel.aciklama}</p>
      </div>

      {/* Available Rooms */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Müsait Odalar</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {otel.odalar.map((oda) => (
            <div key={oda.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={oda.resim}
                alt={oda.ad}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{oda.ad}</h3>
                <p className="mt-2 text-gray-600">{oda.aciklama}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₺{oda.fiyat}
                    <span className="text-sm font-normal text-gray-500">/gece</span>
                  </span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                    Rezervasyon Yap
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 