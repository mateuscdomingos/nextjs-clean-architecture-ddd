import { Cpu } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function Stack() {
  const t = await getTranslations('homePage.stack');

  return (
    <section className="py-20 px-6 bg-muted/50 border-y">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
          <Cpu className="text-primary" /> {t('title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(
            [
              'next',
              'prisma',
              'auth',
              'ui',
              'forms',
              'tests',
              'i18n',
              'storybook',
            ] as const
          ).map((key) => (
            <div
              key={key}
              className="p-6 rounded-xl bg-background border hover:border-primary/50 transition-colors shadow-sm"
            >
              <h4 className="font-bold text-lg mb-1">
                {t(`items.${key}.title`)}
              </h4>
              <p className="text-sm text-muted-foreground leading-snug">
                {t(`items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
