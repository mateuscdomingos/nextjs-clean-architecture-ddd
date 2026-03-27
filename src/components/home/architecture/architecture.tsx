import { Code2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function Architecture() {
  const t = await getTranslations('homePage.architecture');

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Code2 className="text-primary" /> {t('title')}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 p-6 rounded-xl font-mono md:text-sm text-xs text-zinc-300 shadow-2xl border border-zinc-800">
            <ul className="space-y-1">
              <li>📂 src</li>
              <li>
                &nbsp;&nbsp;📂 app{' '}
                <span className="text-zinc-500">{t('folders.app')}</span>
              </li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;📂 actions{' '}
                <span className="text-zinc-500">{t('folders.actions')}</span>
              </li>
              <li>
                &nbsp;&nbsp;📂 core{' '}
                <span className="text-zinc-500">{t('folders.core')}</span>
              </li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;📂 domain{' '}
                <span className="text-zinc-500">{t('folders.domain')}</span>
              </li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;📂 ports{' '}
                <span className="text-zinc-500">{t('folders.ports')}</span>
              </li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;📂 use-cases{' '}
                <span className="text-zinc-500">{t('folders.useCases')}</span>
              </li>
              <li>
                &nbsp;&nbsp;📂 infra{' '}
                <span className="text-zinc-500">{t('folders.infra')}</span>
              </li>
              <li>
                &nbsp;&nbsp;📂 lib{' '}
                <span className="text-zinc-500">{t('folders.lib')}</span>
              </li>
              <li>
                &nbsp;&nbsp;📂 test{' '}
                <span className="text-zinc-500">{t('folders.test')}</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 py-4">
            {(
              [
                { id: 'core', label: 'src/core' },
                { id: 'infra', label: 'src/infra' },
                { id: 'lib', label: 'src/lib' },
              ] as const
            ).map((item, idx) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {idx + 1}
                </div>
                <p>
                  <span className="font-bold">{item.label}:</span>{' '}
                  {t(`highlights.${item.id}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
