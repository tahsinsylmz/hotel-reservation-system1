import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AnaSayfa from './pages/AnaSayfa';
import Kayit from './pages/Kayit';
import Giris from './pages/Giris';
import Profil from './pages/Profil';
import Oteller from './pages/Oteller';
import OtelDetay from './pages/OtelDetay';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import GizlilikPolitikasi from './pages/GizlilikPolitikasi';
import Dashboard from './pages/admin/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<AnaSayfa />} />
        <Route path="kayit" element={<Kayit />} />
        <Route path="giris" element={<Giris />} />
        <Route path="oteller" element={<Oteller />} />
        <Route path="oteller/:id" element={<OtelDetay />} />
        <Route path="hakkimizda" element={<Hakkimizda />} />
        <Route path="iletisim" element={<Iletisim />} />
        <Route path="gizlilik-politikasi" element={<GizlilikPolitikasi />} />
        <Route
          path="profil"
          element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
}
