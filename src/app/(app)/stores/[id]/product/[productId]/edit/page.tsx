import { BaseCard } from '@/components/auth/base-card';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { ProductForm } from '@/components/product/product-form';
import { H1 } from '@/components/ui/h1';
import { GetProductByIdUseCaseFactory } from '@/infra/factories/GetProductByIdUseCaseFactory';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('editProductPage');

  return {
    title: t('title'),
  };
}

export default async function EditProductPage(props: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id: storeId, productId } = await props.params;
  const t = await getTranslations('editProductPage');

  const getProductById = GetProductByIdUseCaseFactory.makeGetProductById();
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const steps = [
    { label: t('stores'), href: '/stores' },
    { label: t('inventory'), href: `/stores/${storeId}/inventory` },
    { label: t('editProduct') },
  ];

  return (
    <div>
      <Breadcrumb items={steps} />
      <div className="flex flex-col w-full items-center justify-center">
        <H1>{t('title')}</H1>
        <BaseCard description={t('description')}>
          <ProductForm initialData={product?.props} />
        </BaseCard>
      </div>
    </div>
  );
}
