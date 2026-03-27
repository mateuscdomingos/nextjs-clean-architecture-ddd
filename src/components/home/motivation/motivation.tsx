import { getTranslations } from 'next-intl/server';

export async function Motivation() {
  const t = await getTranslations('homePage.motivation');

  return (
    <section className="py-20 px-6 bg-muted/50 border-y">
      <div className="max-w-5xl mx-auto items-center">
        <h2 className="text-3xl text-center font-bold mb-12">{t('title')}</h2>
        <p className="text-lg leading-relaxed">{t('description')}</p>
      </div>
    </section>
  );
}
