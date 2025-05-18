import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  BedDouble,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const stats = [
  {
    name: 'Toplam Oda',
    value: '24',
    change: '+2',
    trend: 'up',
    icon: BedDouble,
  },
  {
    name: 'Müsait Oda',
    value: '12',
    change: '-3',
    trend: 'down',
    icon: BedDouble,
  },
  {
    name: 'Aktif Rezervasyon',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Calendar,
  },
  {
    name: 'Bugünkü Giriş',
    value: '3',
    change: '0',
    trend: 'up',
    icon: Calendar,
  },
];

const recentReservations = [
  {
    id: 1,
    guest: 'Ahmet Yılmaz',
    room: '101 - Standart Oda',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    status: 'onaylandı',
  },
  {
    id: 2,
    guest: 'Mehmet Demir',
    room: '201 - Deluxe Oda',
    checkIn: '2024-03-16',
    checkOut: '2024-03-20',
    status: 'beklemede',
  },
  {
    id: 3,
    guest: 'Ayşe Kaya',
    room: '102 - Standart Oda',
    checkIn: '2024-03-14',
    checkOut: '2024-03-15',
    status: 'iptal edildi',
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz, {user?.ad}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Otel yönetim panelinizden tüm işlemlerinizi gerçekleştirebilirsiniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-50">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        stat.trend === 'up'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Son Rezervasyonlar</h2>
        </div>
        <div className="divide-y">
          {recentReservations.map((reservation) => (
            <div key={reservation.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {reservation.guest}
                  </p>
                  <p className="text-sm text-gray-600">{reservation.room}</p>
                  <p className="text-sm text-gray-500">
                    {reservation.checkIn} - {reservation.checkOut}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reservation.status === 'onaylandı'
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'beklemede'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {reservation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 