import React from 'react';
import { Building2, Users, Award, Globe } from 'lucide-react';

const stats = [
  { id: 1, name: 'Aktif Otel', value: '500+' },
  { id: 2, name: 'Mutlu Müşteri', value: '100K+' },
  { id: 3, name: 'Başarılı Rezervasyon', value: '1M+' },
  { id: 4, name: 'Şehir', value: '81' },
];

const features = [
  {
    name: 'Geniş Otel Ağı',
    description:
      'Türkiye\'nin 81 ilinde, 500\'den fazla otel ile hizmetinizdeyiz. Her bütçeye ve zevke uygun konaklama seçenekleri sunuyoruz.',
    icon: Building2,
  },
  {
    name: 'Müşteri Odaklı',
    description:
      'Müşteri memnuniyeti bizim için her şeyden önemli. 7/24 müşteri desteği ve kişiselleştirilmiş hizmet anlayışımızla yanınızdayız.',
    icon: Users,
  },
  {
    name: 'Güvenilir Hizmet',
    description:
      '10 yılı aşkın tecrübemiz ve güvenilir altyapımızla, rezervasyonlarınızı güvenle gerçekleştiriyoruz.',
    icon: Award,
  },
  {
    name: 'Kolay Erişim',
    description:
      'Mobil uygulamamız ve kullanıcı dostu web sitemiz ile rezervasyonlarınızı istediğiniz yerden, istediğiniz zaman yapabilirsiniz.',
    icon: Globe,
  },
];

export default function Hakkimizda() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Türkiye'nin En İyi Otel Rezervasyon Platformu
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              2013 yılından bu yana, Türkiye'nin dört bir yanındaki misafirlerimize en iyi konaklama deneyimini sunmak için çalışıyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Rakamlarla Biz
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              10 yılı aşkın tecrübemizle, Türkiye'nin en büyük otel rezervasyon platformuyuz.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-50 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Neden Biz?</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Size En İyi Hizmeti Sunmak İçin Çalışıyoruz
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Müşteri memnuniyeti odaklı yaklaşımımız ve yenilikçi çözümlerimizle, konaklama deneyiminizi en üst seviyeye çıkarıyoruz.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hemen Rezervasyon Yapın
            <br />
            Size Özel Fırsatları Kaçırmayın
          </h2>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="/oteller"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Otelleri Keşfet
            </a>
            <a href="/iletisim" className="text-sm font-semibold leading-6 text-white">
              Bize Ulaşın <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 