import React from 'react';
import {
  Users,
  Hotel,
  BedDouble,
  Calendar,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const stats = [
  {
    name: 'Toplam Kullanıcı',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    name: 'Toplam Otel',
    value: '45',
    change: '+5%',
    trend: 'up',
    icon: Hotel,
  },
  {
    name: 'Toplam Oda',
    value: '234',
    change: '+8%',
    trend: 'up',
    icon: BedDouble,
  },
  {
    name: 'Aktif Rezervasyon',
    value: '89',
    change: '-3%',
    trend: 'down',
    icon: Calendar,
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'rezervasyon',
    user: 'Ahmet Yılmaz',
    hotel: 'Grand Hotel',
    date: '2024-03-15',
    status: 'onaylandı',
  },
  {
    id: 2,
    type: 'yeni_otel',
    user: 'Mehmet Demir',
    hotel: 'Seaside Resort',
    date: '2024-03-14',
    status: 'beklemede',
  },
  {
    id: 3,
    type: 'iptal',
    user: 'Ayşe Kaya',
    hotel: 'City Hotel',
    date: '2024-03-13',
    status: 'iptal edildi',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Sistem genelinde özet bilgiler ve son aktiviteler
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

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Son Aktiviteler</h2>
        </div>
        <div className="divide-y">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600">{activity.hotel}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'onaylandı'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'beklemede'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {activity.status}
                  </span>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 