import React, { useState, useEffect } from 'react';
import { rezervasyonService } from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Rezervasyon {
  id: number;
  girisTarihi: string;
  cikisTarihi: string;
  toplamFiyat: number;
  durum: 'BEKLEMEDE' | 'ONAYLANDI' | 'IPTAL_EDILDI';
  musteri: {
    ad: string;
    soyad: string;
    email: string;
    telefon: string;
  };
  oda: {
    ad: string;
    otel: {
      ad: string;
    };
  };
}

export default function RezervasyonListesi() {
  const [rezervasyonlar, setRezervasyonlar] = useState<Rezervasyon[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'TUMU' | 'BEKLEMEDE' | 'ONAYLANDI' | 'IPTAL_EDILDI'>('TUMU');

  useEffect(() => {
    fetchRezervasyonlar();
  }, []);

  const fetchRezervasyonlar = async () => {
    try {
      const data = await rezervasyonService.getAll();
      setRezervasyonlar(data);
    } catch (error) {
      toast.error('Rezervasyonlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDurumDegistir = async (id: number, yeniDurum: 'ONAYLANDI' | 'IPTAL_EDILDI') => {
    try {
      await rezervasyonService.updateStatus(id, yeniDurum);
      setRezervasyonlar((prev) =>
        prev.map((rez) =>
          rez.id === id ? { ...rez, durum: yeniDurum } : rez
        )
      );
      toast.success('Rezervasyon durumu güncellendi');
    } catch (error) {
      toast.error('Rezervasyon durumu güncellenirken bir hata oluştu');
    }
  };

  const filteredRezervasyonlar = rezervasyonlar.filter((rez) => {
    if (filter === 'TUMU') return true;
    return rez.durum === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Rezervasyonlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Tüm rezervasyonların listesi. Rezervasyon durumlarını güncelleyebilirsiniz.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="TUMU">Tümü</option>
            <option value="BEKLEMEDE">Beklemede</option>
            <option value="ONAYLANDI">Onaylandı</option>
            <option value="IPTAL_EDILDI">İptal Edildi</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Müşteri
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Oda
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Tarih
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Toplam
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Durum
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">İşlemler</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredRezervasyonlar.map((rezervasyon) => (
                    <tr key={rezervasyon.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="font-medium text-gray-900">
                          {rezervasyon.musteri.ad} {rezervasyon.musteri.soyad}
                        </div>
                        <div className="text-gray-500">{rezervasyon.musteri.email}</div>
                        <div className="text-gray-500">{rezervasyon.musteri.telefon}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="font-medium text-gray-900">{rezervasyon.oda.otel.ad}</div>
                        <div className="text-gray-500">{rezervasyon.oda.ad}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>
                          {format(new Date(rezervasyon.girisTarihi), 'd MMMM yyyy', {
                            locale: tr,
                          })}
                        </div>
                        <div>
                          {format(new Date(rezervasyon.cikisTarihi), 'd MMMM yyyy', {
                            locale: tr,
                          })}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ₺{rezervasyon.toplamFiyat.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            rezervasyon.durum === 'ONAYLANDI'
                              ? 'bg-green-100 text-green-800'
                              : rezervasyon.durum === 'BEKLEMEDE'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rezervasyon.durum === 'ONAYLANDI'
                            ? 'Onaylandı'
                            : rezervasyon.durum === 'BEKLEMEDE'
                            ? 'Beklemede'
                            : 'İptal Edildi'}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        {rezervasyon.durum === 'BEKLEMEDE' && (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDurumDegistir(rezervasyon.id, 'ONAYLANDI')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => handleDurumDegistir(rezervasyon.id, 'IPTAL_EDILDI')}
                              className="text-red-600 hover:text-red-900"
                            >
                              İptal Et
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 