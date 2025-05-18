import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
console.log("🔥 Gerçek Kayit sayfası yüklendi");


export default function Kayit() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    sifre: '',
    sifreTekrar: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.sifre !== formData.sifreTekrar) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    try {
      await register({
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.email,
        telefon: formData.telefon,
        password: formData.sifre,
      });
      navigate('/giris');
    } catch (err) {
      setError('Kayıt işlemi sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Yeni Hesap Oluştur</h2>
            <p className="mt-2 text-sm text-gray-600">
              Zaten hesabınız var mı?{' '}
              <Link to="/giris" className="font-medium text-indigo-600 hover:text-indigo-500">
                Giriş yapın
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ad" className="block text-sm font-medium text-gray-700">Ad</label>
                <input
                  id="ad"
                  name="ad"
                  type="text"
                  value={formData.ad}
                  onChange={handleChange}
                  required
                  placeholder="Adınız"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="soyad" className="block text-sm font-medium text-gray-700">Soyad</label>
                <input
                  id="soyad"
                  name="soyad"
                  type="text"
                  value={formData.soyad}
                  onChange={handleChange}
                  required
                  placeholder="Soyadınız"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ornek@email.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">Telefon</label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                value={formData.telefon}
                onChange={handleChange}
                required
                placeholder="05XX XXX XX XX"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="sifre" className="block text-sm font-medium text-gray-700">Şifre</label>
              <input
                id="sifre"
                name="sifre"
                type="password"
                value={formData.sifre}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="sifreTekrar" className="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
              <input
                id="sifreTekrar"
                name="sifreTekrar"
                type="password"
                value={formData.sifreTekrar}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
            >
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
