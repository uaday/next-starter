'use client';

import type React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, User, Settings, LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuthStore();
  const isMobile = useMobile();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    // Remove cookie for middleware
    document.cookie = 'auth-token=; path=/; max-age=0';
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const NavItems = () => (
    <div className="space-y-1">
      <Link href="/dashboard">
        <Button variant="ghost" className="w-full justify-start">
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/profile">
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </Link>
      <Link href="/settings">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <aside className="w-64 border-r bg-muted/40 p-4 hidden md:block">
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Next.js App</h2>
              <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
            </div>
            <NavItems />
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="mb-6 mt-6">
                    <h2 className="text-xl font-bold">Next.js App</h2>
                    <p className="text-sm text-muted-foreground">Welcome, {user?.name}</p>
                  </div>
                  <NavItems />
                </SheetContent>
              </Sheet>
            )}
            <div className="ml-auto">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
