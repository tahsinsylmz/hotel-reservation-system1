import React from 'react';

const sections = [
  {
    title: 'Kişisel Verilerin Korunması',
    content: `OtelRez olarak, kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verilerinizi işlerken ve korurken en yüksek standartları uyguluyoruz.

    Kişisel verileriniz, yalnızca hizmetlerimizi sunmak ve geliştirmek amacıyla, yasal çerçeve içerisinde ve sizin rızanız dahilinde işlenmektedir.`,
  },
  {
    title: 'Toplanan Veriler',
    content: `Hizmetlerimizi sunarken aşağıdaki kişisel verileri toplayabiliriz:

    • Ad, soyad, e-posta adresi, telefon numarası gibi iletişim bilgileri
    • Rezervasyon bilgileri ve tercihleri
    • Ödeme bilgileri
    • Konum bilgisi
    • Cihaz ve tarayıcı bilgileri
    
    Bu veriler, hizmetlerimizi sunmak, geliştirmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılmaktadır.`,
  },
  {
    title: 'Veri Güvenliği',
    content: `Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:

    • SSL şifreleme teknolojisi
    • Güvenli veri depolama sistemleri
    • Düzenli güvenlik denetimleri
    • Erişim kontrolü ve yetkilendirme
    • Personel eğitimi ve bilinçlendirme
    
    Verileriniz, endüstri standardı güvenlik önlemleriyle korunmaktadır.`,
  },
  {
    title: 'Veri Paylaşımı',
    content: `Kişisel verileriniz, aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:

    • Yasal zorunluluk durumunda
    • Hizmet sağlayıcılarımızla (ödeme işlemcileri, hosting sağlayıcıları vb.)
    • İş ortaklarımızla (oteller, seyahat acenteleri vb.)
    • Açık rızanız olduğunda
    
    Veri paylaşımı, KVKK ve diğer ilgili mevzuata uygun olarak gerçekleştirilir.`,
  },
  {
    title: 'Haklarınız',
    content: `KVKK kapsamında aşağıdaki haklara sahipsiniz:

    • Kişisel verilerinizin işlenip işlenmediğini öğrenme
    • Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
    • Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
    • Kişisel verilerinizin düzeltilmesini veya silinmesini isteme
    • Kişisel verilerinizin aktarıldığı üçüncü kişileri bilme
    
    Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.`,
  },
  {
    title: 'Çerezler ve İzleme',
    content: `Web sitemizde çerezler ve benzer teknolojiler kullanılmaktadır. Bu teknolojiler:

    • Oturum yönetimi
    • Kullanıcı tercihlerinin hatırlanması
    • Analitik ve performans ölçümü
    • Güvenlik ve dolandırıcılık tespiti
    
    için kullanılmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.`,
  },
];

export default function GizlilikPolitikasi() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gizlilik Politikası
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">{section.title}</h2>
                <div className="mt-6 space-y-6 text-base leading-7 text-gray-600">
                  {section.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="rounded-2xl bg-gray-50 p-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">İletişim</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle
              iletişime geçin:
            </p>
            <dl className="mt-8 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="font-semibold text-gray-900">Email:</span>
                </dt>
                <dd>privacy@otelrez.com</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="font-semibold text-gray-900">Telefon:</span>
                </dt>
                <dd>+90 (212) 123 45 67</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="font-semibold text-gray-900">Adres:</span>
                </dt>
                <dd>Levent, İstanbul</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
} 