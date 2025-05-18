import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactInfo = [
  {
    name: 'Email',
    description: 'info@otelrez.com',
    icon: Mail,
  },
  {
    name: 'Telefon',
    description: '+90 (212) 123 45 67',
    icon: Phone,
  },
  {
    name: 'Adres',
    description: 'Levent, İstanbul',
    icon: MapPin,
  },
  {
    name: 'Çalışma Saatleri',
    description: 'Pazartesi - Cuma: 09:00 - 18:00',
    icon: Clock,
  },
];

export default function Iletisim() {
  const [formData, setFormData] = useState({
    ad: '',
    email: '',
    konu: '',
    mesaj: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented here
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">İletişim</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz.
            En kısa sürede size dönüş yapacağız.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {contactInfo.map((item) => (
            <div key={item.name} className="border-l border-gray-200 pl-6">
              <dt className="font-semibold text-gray-900">{item.name}</dt>
              <dd className="mt-2 flex items-center gap-x-3 text-gray-600">
                <item.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                {item.description}
              </dd>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="ad" className="block text-sm font-semibold leading-6 text-gray-900">
                  Ad Soyad
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="ad"
                    id="ad"
                    value={formData.ad}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="konu" className="block text-sm font-semibold leading-6 text-gray-900">
                  Konu
                </label>
                <div className="mt-2.5">
                  <select
                    name="konu"
                    id="konu"
                    value={formData.konu}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Seçiniz</option>
                    <option value="genel">Genel Bilgi</option>
                    <option value="rezervasyon">Rezervasyon</option>
                    <option value="sikayet">Şikayet</option>
                    <option value="oneri">Öneri</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="mesaj" className="block text-sm font-semibold leading-6 text-gray-900">
                  Mesaj
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="mesaj"
                    id="mesaj"
                    rows={4}
                    value={formData.mesaj}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 