import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { odaService, rezervasyonService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Oda {
  id: number;
  ad: string;
  aciklama: string;
  fiyat: number;
  kapasite: number;
  resim: string;
  otel: {
    ad: string;
    adres: string;
    sehir: string;
  };
}

export default function Rezervasyon() {
  const { odaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [oda, setOda] = useState<Oda | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    girisTarihi: '',
    cikisTarihi: '',
    kisiSayisi: 1,
    notlar: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/giris');
      return;
    }
    fetchOda();
  }, [odaId, user]);

  const fetchOda = async () => {
    try {
      const data = await odaService.getById(Number(odaId));
      setOda(data);
    } catch (error) {
      toast.error('Oda bilgileri yüklenirken bir hata oluştu');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await rezervasyonService.create({
        odaId: Number(odaId),
        ...formData,
      });
      toast.success('Rezervasyon başarıyla oluşturuldu');
      navigate('/profil');
    } catch (error) {
      toast.error('Rezervasyon oluşturulurken bir hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'kisiSayisi' ? Number(value) : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!oda) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div>
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src={oda.resim}
              alt={oda.ad}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl font-bold">{oda.ad}</h1>
              <p className="mt-2 text-lg opacity-90">{oda.otel.ad}</p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Oda Özellikleri</h2>
              <p className="mt-2 text-gray-600">{oda.aciklama}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Otel Bilgileri</h2>
              <div className="mt-2 space-y-2 text-gray-600">
                <p>{oda.otel.ad}</p>
                <p>{oda.otel.adres}</p>
                <p>{oda.otel.sehir}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Rezervasyon Yap</h2>
              <p className="mt-1 text-sm text-gray-500">
                Lütfen rezervasyon bilgilerinizi girin
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="girisTarihi" className="block text-sm font-medium text-gray-700">
                    Giriş Tarihi
                  </label>
                  <input
                    type="date"
                    id="girisTarihi"
                    name="girisTarihi"
                    value={formData.girisTarihi}
                    onChange={handleChange}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="cikisTarihi" className="block text-sm font-medium text-gray-700">
                    Çıkış Tarihi
                  </label>
                  <input
                    type="date"
                    id="cikisTarihi"
                    name="cikisTarihi"
                    value={formData.cikisTarihi}
                    onChange={handleChange}
                    min={formData.girisTarihi || format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="kisiSayisi" className="block text-sm font-medium text-gray-700">
                  Kişi Sayısı
                </label>
                <select
                  id="kisiSayisi"
                  name="kisiSayisi"
                  value={formData.kisiSayisi}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {[...Array(oda.kapasite)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Kişi
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notlar" className="block text-sm font-medium text-gray-700">
                  Notlar (Opsiyonel)
                </label>
                <textarea
                  id="notlar"
                  name="notlar"
                  value={formData.notlar}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Toplam Fiyat</p>
                  <p>₺{oda.fiyat.toLocaleString()}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Fiyatlar vergiler dahil değildir
                </p>
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Rezervasyon Yapılıyor...
                      </>
                    ) : (
                      'Rezervasyon Yap'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 