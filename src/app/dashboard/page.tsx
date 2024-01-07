'use client';
import Header from '@/app/_components/header';
import Feeds from '@/app/_components/feeds';
import CreateRecipe from '@/app/_components/create-recipe';

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-end text-white">
        <div>
          <CreateRecipe />
        </div>
        <div>
          <Feeds />
        </div>
      </main>
    </div>
  );
}
