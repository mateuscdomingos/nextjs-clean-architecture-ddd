import { BaseCard } from '@/components/auth/base-card';
import { LoginForm } from '@/components/auth/login-form';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('loginPage');

  return {
    title: t('title'),
  };
}

export default async function LoginPage() {
  const t = await getTranslations('loginPage');

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <H1>{t('title')}</H1>
      <div className="w-full max-w-sm">
        <BaseCard description={t('description')}>
          <LoginForm />
        </BaseCard>
      </div>
    </div>
  );
}
