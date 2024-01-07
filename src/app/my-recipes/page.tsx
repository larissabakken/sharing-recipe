'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';
import Header from '@/app/_components/header';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import EditRecipe from '@/app/_components/edit-recipe';

export default function MyRecipes() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  const list = api.recipes.list.useQuery();
  const { data } = list;

  useEffect(() => {
    list.refetch().then((r) => console.log(r));
  }, [forceUpdate]);

  const deleteRecipe = api.recipes.delete.useMutation({
    onSuccess: () => {
      setForceUpdate((prev) => prev + 1);
    },
  });
  async function handleDelete(id: string) {
    try {
      deleteRecipe.mutate({ id });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditClick = (id: string) => {
    setModal(true);
    setSelectedRecipeId(id);
    setForceUpdate((prev) => prev + 1);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-start justify-center py-4">
        <ul
          role="list"
          className="w-[80vw] divide-y divide-gray-100 rounded-2xl bg-[var(--background)]"
        >
          <li className="p-5">
            <input
              type="text"
              placeholder="Search for recipes"
              name="search"
              className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
            />
          </li>
          {data?.map((recipe) => (
            <li key={recipe.id} className="flex justify-between gap-x-6 p-5">
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
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="truncate text-sm leading-6 text-gray-900">
                  Servings: {recipe.servings}
                </p>
                <div>
                  <button
                    onClick={() => handleEditClick(recipe.id)}
                    className="mx-2 text-sm leading-6 text-gray-50"
                  >
                    <CiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-[var(--background)] text-sm leading-6 text-red-400"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
              {modal && selectedRecipeId === recipe.id && (
                <EditRecipe id={recipe.id} onClose={() => setModal(false)} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
