'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { AuthUser } from '@/types/sales';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('auth_user');
    if (!rawUser) {
      router.replace('/login');
      return;
    }

    try {
      setUser(JSON.parse(rawUser));
    } catch {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-8 backdrop-blur-md">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-xs shadow-blue-600/20">
          D
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-sm font-bold tracking-tight text-slate-900 leading-none">
              Distrilink
            </span>
            
          </div>
          <span className="text-[11px] text-slate-400">
            Sales Automation Platform 
          </span>
        </div>
      </div>

      {/* Profil Supervisor & Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        {user && (
          <div className="flex items-center gap-2.5">
            {/* Avatar Icon Lucide */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600">
              <User className="h-4 w-4" />
            </div>

            <div className="hidden text-left sm:block">
              <span className="block text-xs font-semibold text-slate-900 leading-tight">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
        )}

        <div className="h-4 w-px bg-slate-200" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="h-8 px-2.5 text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Keluar</span>
        </Button>
      </div>
    </header>
  );
}