import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from '@/trpc/react';

export default function EditRecipe(props: any) {
  const showToast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const { id } = props;
  const cancelButtonRef = useRef(null);

  const { register, handleSubmit } = useForm();

  const getRecipe = api.recipes.getById.useQuery({ id }).data;

  const updateRecipe = api.recipes.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const onSubmit = async (data: any) => {
    try {
      updateRecipe.mutate({
        id: id,
        title: data.title,
        ingredients: data.ingredients,
        servings: data.servings,
        instructions: data.instructions,
      });
      router.refresh();

      setOpen(true);
      props.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edit your recipe
                      </Dialog.Title>
                      <div className="mt-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Recipe name
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register('title')}
                                    type="text"
                                    defaultValue={getRecipe?.title}
                                    id="title"
                                    className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                                  />
                                </dd>
                              </div>

                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Ingredients
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  <textarea
                                    {...register('ingredients')}
                                    defaultValue={getRecipe?.ingredients}
                                    id="ingredients"
                                    className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                                  />
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  How many people does it serve?
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  <input
                                    {...register('servings')}
                                    defaultValue={getRecipe?.servings}
                                    type="text"
                                    id="servings"
                                    className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                                  />
                                </dd>
                              </div>
                              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                  Steps to prepare
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                  <textarea
                                    {...register('instructions')}
                                    defaultValue={getRecipe?.instructions}
                                    id="ingredients"
                                    className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
                                  />
                                </dd>
                              </div>
                            </dl>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-[var(--primary-color)] px-3 py-2 text-sm font-semibold text-white sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => props.onClose()}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
