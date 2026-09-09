'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. Cek apakah ada sesi user tersimpan di localStorage
    const rawUser = localStorage.getItem('auth_user');

    // 2. Arahkan sesuai status autentikasi
    if (rawUser) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-xs font-medium text-slate-500">Mengarahkan...</p>
      </div>
    </div>
  );
}