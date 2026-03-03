import { auth } from '@/auth';
import { StoreCard } from '@/components/stores/store-card';
import { AddButton } from '@/components/ui/button';
import { H1 } from '@/components/ui/h1';
import { StoreUseCaseFactory } from '@/infra/factories/StoreUseCaseFactory';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function StoresPage() {
  const t = await getTranslations('storesPage');
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/login');
  }

  const getStores = StoreUseCaseFactory.makeGetStoresByUser();
  const stores = await getStores(session.user.id);

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <H1>{t('title')}</H1>
        <AddButton href="/stores/new" title={t('addNewStore')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.props.id} store={{ ...store.props }} />
        ))}
      </div>
    </div>
  );
}
