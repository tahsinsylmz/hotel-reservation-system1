import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AnaSayfa from './pages/AnaSayfa';
import Giris from './pages/Giris';
import Kayit from './pages/Kayit';
import MusteriPanel from './pages/MusteriPanel';
import OtelYoneticiPanel from './pages/OtelYoneticiPanel';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<AnaSayfa />} />
              <Route path="/giris" element={<Giris />} />
              <Route path="/kayit" element={<Kayit />} />
              <Route
                path="/musteri-panel"
                element={
                  <PrivateRoute role="MUSTERI">
                    <MusteriPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/otel-yonetici-panel"
                element={
                  <PrivateRoute role="OTEL_YONETICISI">
                    <OtelYoneticiPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin-panel"
                element={
                  <PrivateRoute role="ADMIN">
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;