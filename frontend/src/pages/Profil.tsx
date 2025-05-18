import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profil() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleText = (rol?: string) => {
    switch (rol) {
      case 'admin':
        return 'Yönetici';
      case 'yonetici':
        return 'Otel Yöneticisi';
      default:
        return 'Müşteri';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Profil Bilgileri</h1>
        <p className="mt-2 text-gray-600">Hesap bilgilerinizi görüntüleyin ve yönetin</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Ad</label>
            <div className="mt-1 text-sm text-gray-900">{user.ad}</div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Soyad</label>
            <div className="mt-1 text-sm text-gray-900">{user.soyad}</div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <div className="mt-1 text-sm text-gray-900">{user.email}</div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Telefon</label>
            <div className="mt-1 text-sm text-gray-900">{user.telefon}</div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Üyelik Tipi</label>
            <div className="mt-1 text-sm text-gray-900">
              {getRoleText(user.rol)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 