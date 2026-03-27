/* eslint-disable react/jsx-no-comment-textnodes */
import { getTranslations } from 'next-intl/server';
import { Main } from '@/components/home/main';
import { Motivation } from '@/components/home/motivation';
import { Architecture } from '@/components/home/architecture';
import { Footer } from '@/components/home/footer';
import { Stack } from '@/components/home/stack';
import { CICD } from '@/components/home/cicd';

export default async function HomePage() {
  const t = await getTranslations('homePage');

  return (
    <main className="min-h-screen">
      <Main />
      <Motivation />
      <Architecture />
      <Stack />
      <CICD />
      <Footer />
    </main>
  );
}
