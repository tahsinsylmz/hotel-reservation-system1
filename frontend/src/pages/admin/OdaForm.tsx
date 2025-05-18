import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { odaService } from '../../services/api';
import { toast } from 'react-toastify';

interface OdaFormData {
  ad: string;
  aciklama: string;
  fiyat: number;
  kapasite: number;
  resim: string;
  durum: 'AKTIF' | 'PASIF';
  otelId: number;
}

export default function OdaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<OdaFormData>({
    ad: '',
    aciklama: '',
    fiyat: 0,
    kapasite: 1,
    resim: '',
    durum: 'AKTIF',
    otelId: 0,
  });

  useEffect(() => {
    if (id) {
      fetchOda();
    }
  }, [id]);

  const fetchOda = async () => {
    setLoading(true);
    try {
      const data = await odaService.getById(Number(id));
      setFormData({
        ad: data.ad,
        aciklama: data.aciklama,
        fiyat: data.fiyat,
        kapasite: data.kapasite,
        resim: data.resim,
        durum: data.durum,
        otelId: data.otelId,
      });
    } catch (error) {
      toast.error('Oda bilgileri yüklenirken bir hata oluştu');
      navigate('/admin/odalar');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (id) {
        await odaService.update(Number(id), formData);
        toast.success('Oda başarıyla güncellendi');
      } else {
        await odaService.create(formData);
        toast.success('Oda başarıyla oluşturuldu');
      }
      navigate('/admin/odalar');
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
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
      [name]: name === 'fiyat' || name === 'kapasite' || name === 'otelId' ? Number(value) : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            {id ? 'Oda Düzenle' : 'Yeni Oda Ekle'}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {id
              ? 'Mevcut oda bilgilerini güncelleyin'
              : 'Yeni bir oda eklemek için aşağıdaki formu doldurun'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="ad" className="block text-sm font-medium text-gray-700">
              Oda Adı
            </label>
            <input
              type="text"
              id="ad"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="aciklama" className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              id="aciklama"
              name="aciklama"
              value={formData.aciklama}
              onChange={handleChange}
              rows={3}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="fiyat" className="block text-sm font-medium text-gray-700">
                Fiyat (₺)
              </label>
              <input
                type="number"
                id="fiyat"
                name="fiyat"
                value={formData.fiyat}
                onChange={handleChange}
                min="0"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="kapasite" className="block text-sm font-medium text-gray-700">
                Kapasite
              </label>
              <input
                type="number"
                id="kapasite"
                name="kapasite"
                value={formData.kapasite}
                onChange={handleChange}
                min="1"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resim" className="block text-sm font-medium text-gray-700">
              Resim URL
            </label>
            <input
              type="url"
              id="resim"
              name="resim"
              value={formData.resim}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="durum" className="block text-sm font-medium text-gray-700">
              Durum
            </label>
            <select
              id="durum"
              name="durum"
              value={formData.durum}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="AKTIF">Aktif</option>
              <option value="PASIF">Pasif</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/odalar')}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  {id ? 'Güncelleniyor...' : 'Oluşturuluyor...'}
                </>
              ) : (
                id ? 'Güncelle' : 'Oluştur'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 