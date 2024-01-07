import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import { useState } from 'react';

export default function Feeds() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<any>([]);

  const list = api.recipes.list.useQuery();
  const { data } = list;

  const handleSearch = () => {
    console.log(search, 'search');
    const filteredData = data?.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()),
    );

    setRecipes(filteredData);
  };

  return (
    <>
      <ul
        role="list"
        className="w-[80vw] divide-y divide-gray-100 rounded-2xl bg-[var(--background)]"
      >
        <li className="flex p-5">
          <input
            type="text"
            placeholder="Search for recipes"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
          />
          <button className="mx-2" onClick={handleSearch}>
            Search
          </button>
        </li>
        {data?.map((recipe) => (
          <li key={recipe.id} className="flex justify-between gap-x-6  p-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {recipe.title}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  author: {recipe.user.email}
                </p>
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center">
              <p className="truncate text-sm leading-6 text-gray-900">
                Ingredients: {recipe.ingredients}
              </p>

              <p className="truncate text-sm leading-6 text-gray-900">
                Instructions: {recipe.instructions}
              </p>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="truncate text-sm leading-6 text-gray-900">
                Servings: {recipe.servings}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
