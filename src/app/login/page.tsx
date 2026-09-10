'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthUser } from '@/types/sales';
import { ShieldCheck, BarChart3, Navigation, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Guest Guard: Cek sesi supervisor sebelum menampilkan halaman login
  useEffect(() => {
    const rawUser = localStorage.getItem('auth_user');
    if (rawUser) {
      router.replace('/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kredensial login salah. Silakan coba lagi.');
      }

      const sessionData: AuthUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        token: data.accessToken,
      };

      localStorage.setItem('auth_user', JSON.stringify(sessionData));
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Terjadi kendala jaringan saat menghubungi server.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cegah flicker tampilan form saat mengecek status login
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-xs font-medium text-slate-500">Memeriksa Sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-white lg:grid-cols-2">
      {/* Sisi Kiri: Branding & Value Props */}
      <section className="hidden flex-col justify-between bg-slate-900 p-12 lg:flex xl:p-16">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-md shadow-blue-600/20">
            D
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block leading-none">
              Distrilink
            </span>
            <span className="text-[11px] text-slate-400">Sales Automation Platform</span>
          </div>
        </div>

        <div className="max-w-lg space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
              Kelola aktivitas sales dengan lebih jelas dan cepat.
            </h2>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3.5 text-sm text-slate-300">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-blue-400 shrink-0">
                <Navigation className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">Pantau rute plan vs realisasi dengan lebih presisi</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-slate-300">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700 text-blue-400 shrink-0">
                <BarChart3 className="h-4 w-4" />
              </div>
              <p className="font-medium text-white">
                Hitung efektivitas dan nilai order secara otomatis
              </p>
            </div>

            <div className="flex items-center gap-3.5 text-sm text-slate-300">
              <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-blue-400 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-white">Akses aman untuk supervisor dan tim sales</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Distrilink &copy; {new Date().getFullYear()} &bull; Sales Automation Platform
        </p>
      </section>

      {/* Sisi Kanan: Form Presisi & Proporsional */}
      <section className="relative flex min-h-screen items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-20">
        <div className="w-full max-w-[420px]">
          
          {/* Brand Header: Muncul tepat di atas form hanya pada Mobile & Tablet */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white shadow-sm shadow-blue-600/20">
              D
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900 leading-none">
                Distrilink
              </span>
              <span className="text-[11px] text-slate-400">Sales Automation Platform</span>
            </div>
          </div>

          {/* Heading Form */}
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Selamat datang kembali
            </h1>
            <p className="text-sm text-slate-500">
              Masukkan kredensial akun untuk memantau performa tim sales hari ini.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="rounded-lg bg-rose-50 p-3.5 text-xs font-medium text-rose-700 border border-rose-200">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Username</label>
              <Input
                type="text"
                placeholder="Masukkan username akun"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 px-3.5 text-sm bg-slate-50/50 border-slate-200 focus-visible:bg-white focus-visible:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Input
                type="password"
                placeholder="Masukkan password akun"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 px-3.5 text-sm bg-slate-50/50 border-slate-200 focus-visible:bg-white focus-visible:ring-blue-600"
              />
            </div>

            <Button
              type="submit"
              className="h-11 w-full bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-sm transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memverifikasi Akun...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Masuk ke Dashboard
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}