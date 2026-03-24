import { BaseCard } from '@/components/auth/base-card';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { AddStoreForm } from '@/components/stores/add-store-form';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('newStorePage');

  return {
    title: t('title'),
  };
}

export default async function NewStorePage() {
  const t = await getTranslations('newStorePage');

  const steps = [
    { label: t('stores'), href: '/stores' },
    { label: t('newStore') },
  ];

  return (
    <div>
      <Breadcrumb items={steps} />

      <div className="flex flex-col w-full items-center justify-center">
        <H1>{t('title')}</H1>
        <BaseCard description={t('description')}>
          <AddStoreForm />
        </BaseCard>
      </div>
    </div>
  );
}
