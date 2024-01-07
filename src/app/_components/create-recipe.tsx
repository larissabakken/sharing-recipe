'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc/react';

export default function CreateRecipe() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createPost = api.recipes.create.useMutation({
    onSuccess: () => {
      router.push('/dashboard');
    },
  });
  const onSubmit = async (data: any) => {
    try {
      createPost.mutate({
        userId: '4e33ce56-508a-45a2-952b-5cf6adfdd274',
        title: data.title,
        ingredients: data.ingredients,
        servings: data.servings,
        instructions: data.instructions,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-4 w-[80vw] rounded-2xl bg-[var(--background)] p-4 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Add your recipe
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Share your recipe with the world!
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Recipe name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register('title', { required: true })}
                  type="text"
                  id="title"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                />
                {errors.title && (
                  <span className="text-error text-sm italic">
                    The name is required!*
                  </span>
                )}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Ingredients
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <textarea
                  {...register('ingredients', { required: true })}
                  id="ingredients"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                />
                {errors.ingredients && (
                  <span className="text-error text-sm italic">
                    The ingredients is required!*
                  </span>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                How many people does it serve?
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  {...register('servings', { required: true })}
                  type="text"
                  id="servings"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                />
                {errors.servings && (
                  <span className="text-error text-sm italic">
                    The servings is required!*
                  </span>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Steps to prepare
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <textarea
                  {...register('instructions', { required: true })}
                  id="ingredients"
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                />
                {errors.instructions && (
                  <span className="text-error text-sm italic">
                    The ingredients is required!*
                  </span>
                )}
              </dd>
            </div>
          </dl>
          <button className="bg-[var(--primary-color)]" type="submit">
            CREATE AND SHARE
          </button>
        </div>
      </form>
    </div>
  );
}
