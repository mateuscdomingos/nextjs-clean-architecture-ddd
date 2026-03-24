import { getTranslations } from 'next-intl/server';
import { AddButton } from '@/components/ui/button';
import { InventoryTable } from '@/components/inventory/table';
import { GetProductByStoreIdUseCaseFactory } from '@/infra/factories/GetProductByStoreIdUseCaseFactory';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

export async function generateMetadata() {
  const t = await getTranslations('inventoryPage');

  return {
    title: t('title'),
  };
}

export default async function InventoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: storeId } = await props.params;
  const t = await getTranslations('inventoryPage');

  const getProducts =
    GetProductByStoreIdUseCaseFactory.makeGetProductByStoreId();
  const products = await getProducts(storeId);
  const productsProps = products.map((product) => product.props);

  const steps = [
    { label: t('stores'), href: '/stores' },
    { label: t('title') },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={steps} />
      <div>
        <div className="flex gap-4 items-center">
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <AddButton
            href={`/stores/${storeId}/product/new`}
            title={'newProduct'}
          />
        </div>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <InventoryTable data={productsProps} />
    </div>
  );
}
