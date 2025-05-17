import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function AnaSayfa() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    sehir: '',
    girisTarihi: '',
    cikisTarihi: '',
    kisiSayisi: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/oteller?${new URLSearchParams(searchParams).toString()}`);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover"
          src="/hotel-bg.jpg"
          alt="Otel arka plan"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Hayalinizdeki Tatili Keşfedin
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xl text-gray-300">
          En iyi otellerde unutulmaz bir deneyim için hemen rezervasyon yapın
        </p>
        <form onSubmit={handleSearch} className="mt-12">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="sehir" className="block text-sm font-medium text-gray-700">
                  Şehir
                </label>
                <input
                  type="text"
                  id="sehir"
                  value={searchParams.sehir}
                  onChange={(e) => setSearchParams({ ...searchParams, sehir: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="İstanbul, Ankara..."
                />
              </div>
              <div>
                <label htmlFor="girisTarihi" className="block text-sm font-medium text-gray-700">
                  Giriş Tarihi
                </label>
                <input
                  type="date"
                  id="girisTarihi"
                  value={searchParams.girisTarihi}
                  onChange={(e) => setSearchParams({ ...searchParams, girisTarihi: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="cikisTarihi" className="block text-sm font-medium text-gray-700">
                  Çıkış Tarihi
                </label>
                <input
                  type="date"
                  id="cikisTarihi"
                  value={searchParams.cikisTarihi}
                  onChange={(e) => setSearchParams({ ...searchParams, cikisTarihi: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="kisiSayisi" className="block text-sm font-medium text-gray-700">
                  Kişi Sayısı
                </label>
                <input
                  type="number"
                  id="kisiSayisi"
                  min="1"
                  value={searchParams.kisiSayisi}
                  onChange={(e) => setSearchParams({ ...searchParams, kisiSayisi: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Otel Ara
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 