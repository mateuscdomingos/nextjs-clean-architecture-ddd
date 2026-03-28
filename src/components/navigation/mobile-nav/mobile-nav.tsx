'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Store,
  Home,
  LayoutDashboard,
  LogIn,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { LanguageSwitcher } from '../language-switcher';
import { useTranslations } from 'next-intl';
import { ThemeSwitcher } from '../theme-switcher';

export function MobileNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const t = useTranslations('components.navigation');
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 bg-background p-0 border-r border-border/50"
      >
        <div className="bg-secondary/80 p-5 border-b border-border/20">
          <SheetTitle className="flex items-center gap-2 text-primary">
            <Store className="h-6 w-6" />
            <span className="font-bold tracking-tight">CoffeeStock</span>
          </SheetTitle>
        </div>

        <SheetDescription asChild className="text-primary">
          <div className="px-3 py-6">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary/50 hover:text-primary transition-all"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>

              {isAuthenticated ? (
                <Link
                  href="/stores"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary/50 hover:text-primary transition-all"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  {t('myStores')}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary/50 hover:text-primary transition-all"
                  >
                    <LogIn className="h-5 w-5" />
                    {t('login')}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary/50 hover:text-primary transition-all"
                  >
                    <UserPlus className="h-5 w-5" />
                    {t('createAccount')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        </SheetDescription>

        <div className="absolute bottom-0 w-full p-6 border-t border-border/30 bg-secondary/20">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3">
            {t('preferences')}
          </p>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
