import { BaseCard } from '@/components/auth/base-card';
import { RegisterForm } from '@/components/auth/register-form';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('registerPage');

  return {
    title: t('title'),
  };
}

export default async function RegisterPage() {
  const t = await getTranslations('registerPage');

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <H1>{t('title')}</H1>
      <div className="w-full max-w-sm">
        <BaseCard description={t('description')}>
          <RegisterForm />
        </BaseCard>
      </div>
    </div>
  );
}
