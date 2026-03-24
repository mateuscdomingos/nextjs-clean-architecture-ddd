import { BaseCard } from '@/components/auth/base-card';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { AddProductForm } from '@/components/product/add-product-form';
import { H1 } from '@/components/ui/h1';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('newProductPage');

  return {
    title: t('title'),
  };
}

export default async function NewProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: storeId } = await props.params;
  const t = await getTranslations('newProductPage');

  const steps = [
    { label: t('stores'), href: '/stores' },
    { label: t('inventory'), href: `/stores/${storeId}/inventory` },
    { label: t('newProduct') },
  ];

  return (
    <div>
      <Breadcrumb items={steps} />
      <div className="flex flex-col w-full items-center justify-center">
        <H1>{t('title')}</H1>
        <BaseCard description={t('description')}>
          <AddProductForm />
        </BaseCard>
      </div>
    </div>
  );
}
