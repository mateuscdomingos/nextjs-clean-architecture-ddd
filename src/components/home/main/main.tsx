import { ArrowRight, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function Main() {
  const t = await getTranslations('homePage.main');

  return (
    <section className="py-24 px-6 text-center space-y-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold tracking-tighter mb-4">
          Coffee Stock
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.rich('subtitle', {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <div className="flex justify-center gap-4 mt-10">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 md:px-8 md:py-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform"
          >
            {t('getStarted')} <ArrowRight size={18} />
          </Link>
          <Link
            href="https://github.com/mateuscdomingos/nextjs-clean-architecture-ddd"
            className="inline-flex items-center gap-2 md:px-8 md:py-4 px-6 py-3 border rounded-full font-bold hover:bg-muted transition-colors"
          >
            <Github size={20} /> GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
