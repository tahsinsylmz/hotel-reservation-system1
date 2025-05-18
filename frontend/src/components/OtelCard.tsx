import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface OtelCardProps {
  id: number;
  ad: string;
  aciklama: string;
  adres: string;
  resim: string;
  yildiz: number;
  fiyat: number;
}

export default function OtelCard({ id, ad, aciklama, adres, resim, yildiz, fiyat }: OtelCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={resim}
          alt={ad}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-lg font-semibold text-primary-600">₺{fiyat}</span>
          <span className="text-sm text-gray-500">/gece</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
            {ad}
          </h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-600">{yildiz}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{adres}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-6">
          {aciklama}
        </p>

        {/* CTA Button */}
        <Link
          to={`/oteller/${id}`}
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          Detayları Gör
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
} 