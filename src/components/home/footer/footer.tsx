import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Footer() {
  const t = await getTranslations('homePage.footer');

  return (
    <footer className="py-20 px-6 bg-muted border-t text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-muted-foreground leading-relaxed">{t('about')}</p>
        <div className="flex justify-center gap-8">
          <Link
            href="https://www.linkedin.com/in/mateus-cd"
            className="font-bold hover:text-primary transition"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/mateuscdomingos"
            className="font-bold hover:text-primary transition"
          >
            GitHub
          </Link>
        </div>
        <div className="pt-8 text-xs text-muted-foreground/50 font-mono">
          &copy; 2026 NEXTJS-CLEAN-ARCHITECTURE-DDD
        </div>
      </div>
    </footer>
  );
}
