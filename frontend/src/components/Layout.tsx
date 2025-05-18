import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">
          <div className="bg-white shadow-lg rounded-lg p-8 sm:p-10">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 