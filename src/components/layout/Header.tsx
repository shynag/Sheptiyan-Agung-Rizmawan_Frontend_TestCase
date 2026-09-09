'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AuthUser } from '@/types/sales';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // 1. Ambil data sesi dari localStorage
    const rawUser = localStorage.getItem('auth_user');

    // 2. Proteksi rute: jika belum login, lempar ke /login
    if (!rawUser) {
      router.replace('/login');
      return;
    }

    try {
      const parsedUser: AuthUser = JSON.parse(rawUser);
      setUser(parsedUser);
    } catch {
      router.replace('/login');
    }
  }, [router]);

  // 3. Logika logout
  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b bg-white px-6">
      {/* Brand / Logo */}
      <div>
        <h1 className="text-base font-bold text-slate-900">Distrilink SAP</h1>
        <p className="text-xs text-slate-500">Dashboard Analisa Performa Salesman</p>
      </div>

      {/* Profil User & Tombol Keluar */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.image}
              alt={user.firstName}
              className="h-9 w-9 rounded-full border border-slate-200 object-cover bg-slate-100"
            />
            <div className="hidden text-left sm:block">
              <span className="block text-sm font-semibold text-slate-800 leading-tight">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs text-slate-400">{user.email}</span>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          Keluar
        </Button>
      </div>
    </header>
  );
}