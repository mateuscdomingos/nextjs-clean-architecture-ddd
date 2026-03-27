import { Code2, Cpu, Globe, ShieldCheck, Zap } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function CICD() {
  const t = await getTranslations('homePage.cicd');

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="space-y-6 grid md:grid-cols-2 gap-2">
            {(
              [
                { id: 'setup', icon: <Zap size={18} /> },
                { id: 'qa', icon: <ShieldCheck size={18} /> },
                { id: 'testing', icon: <Code2 size={18} /> },
                { id: 'build', icon: <Cpu size={18} /> },
                { id: 'deploy', icon: <Globe size={18} /> },
              ] as const
            ).map((step) => (
              <div
                key={step.id}
                className="flex gap-6 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border mb-2"
              >
                <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg">
                    {t(`steps.${step.id}.title`)}
                  </h4>
                  <p className="text-muted-foreground">
                    {t(`steps.${step.id}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
