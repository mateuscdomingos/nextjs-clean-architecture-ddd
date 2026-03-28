import Link from 'next/link';
import { buttonVariants } from '../../ui/button';
import { auth } from '@/auth';
import { UserMenu } from '../user-menu';
import { Store } from 'lucide-react';
import { MobileNav } from '../mobile-nav';
import { LanguageSwitcher } from '../language-switcher';
import { getTranslations } from 'next-intl/server';
import { ThemeSwitcher } from '../theme-switcher';

export async function Header() {
  const t = await getTranslations('components.navigation');
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <MobileNav isAuthenticated={isAuthenticated} />
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
          >
            <Store className="h-6 w-6" />
            <span>CoffeeStock</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
          <nav className="hidden md:flex items-center gap-4 mr-2">
            {isAuthenticated ? (
              <Link
                href="/stores"
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'hover:text-primary',
                })}
              >
                {t('myStores')}
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'hover:text-primary',
                  })}
                >
                  {t('login')}
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  {t('createAccount')}
                </Link>
              </div>
            )}
          </nav>

          {isAuthenticated && <UserMenu user={session.user} />}
        </div>
      </div>
    </header>
  );
}
