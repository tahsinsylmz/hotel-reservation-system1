import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (data: {
    ad: string;
    soyad: string;
    email: string;
    telefon: string;
    password: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const odaService = {
  getAll: async () => {
    const response = await api.get('/odalar');
    return response.data;
  },
  getAvailable: async (params: {
    girisTarihi?: string;
    cikisTarihi?: string;
    kisiSayisi?: number;
  }) => {
    const response = await api.get('/odalar/musait', { params });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/odalar/${id}`);
    return response.data;
  },
  create: async (data: {
    ad: string;
    aciklama: string;
    fiyat: number;
    kapasite: number;
    durum: 'AKTIF' | 'PASIF';
    resim: string;
    otelId: number;
  }) => {
    const response = await api.post('/odalar', data);
    return response.data;
  },
  update: async (
    id: number,
    data: {
      ad?: string;
      aciklama?: string;
      fiyat?: number;
      kapasite?: number;
      durum?: 'AKTIF' | 'PASIF';
      resim?: string;
      otelId?: number;
    }
  ) => {
    const response = await api.put(`/odalar/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/odalar/${id}`);
    return response.data;
  },
};

export const rezervasyonService = {
  getAll: async () => {
    const response = await api.get('/rezervasyonlar');
    return response.data;
  },
  getUserRezervasyonlar: async () => {
    const response = await api.get('/rezervasyonlar/kullanici');
    return response.data;
  },
  create: async (data: {
    odaId: number;
    girisTarihi: string;
    cikisTarihi: string;
    kisiSayisi: number;
    notlar?: string;
  }) => {
    const response = await api.post('/rezervasyonlar', data);
    return response.data;
  },
  updateStatus: async (id: number, durum: 'ONAYLANDI' | 'IPTAL_EDILDI') => {
    const response = await api.put(`/rezervasyonlar/${id}/durum`, { durum });
    return response.data;
  },
  iptalEt: async (id: number) => {
    const response = await api.put(`/rezervasyonlar/${id}/iptal`);
    return response.data;
  },
};

export const otelService = {
  getAll: async () => {
    const response = await api.get('/oteller');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/oteller/${id}`);
    return response.data;
  },
  create: async (data: {
    ad: string;
    aciklama: string;
    adres: string;
    sehir: string;
    resim: string;
  }) => {
    const response = await api.post('/oteller', data);
    return response.data;
  },
  update: async (
    id: number,
    data: {
      ad?: string;
      aciklama?: string;
      adres?: string;
      sehir?: string;
      resim?: string;
    }
  ) => {
    const response = await api.put(`/oteller/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/oteller/${id}`);
    return response.data;
  },
};

export default api; 