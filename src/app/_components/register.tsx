'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { api } from '@/trpc/react';

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createPost = api.users.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const onSubmit = async (data: any) => {
    try {
      console.log(data, 'data');
      const res = createPost.mutate({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(res, 'res');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'rounded-md bg-gray-900 bg-opacity-50 p-10 shadow-md lg:px-16 lg:pb-4 lg:pt-8'
        }
      >
        <h1 className="mb-4 text-center text-2xl font-bold">
          You are new here? Register!
        </h1>

        <div className="flex justify-center">
          <Image src="/logo.jpeg" alt="RecipeHub" width={150} height={150} />
        </div>

        <div className="mb-4 w-80">
          <label htmlFor="email" className="mb-2 block text-lg">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            type="name"
            id="name"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
          />
          {errors.name && (
            <span className="text-error text-sm italic">
              The name is required! Insert a valid name.*
            </span>
          )}
        </div>
        <div className="mb-4 w-80">
          <label htmlFor="email" className="mb-2 block text-lg">
            Email
          </label>
          <input
            {...register('email', { required: true })}
            type="email"
            id="email"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
          />
          {errors.email && (
            <span className="text-error text-sm italic">
              The email is required! Insert a valid email.*
            </span>
          )}
        </div>
        <div className="mb-4 w-80">
          <label htmlFor="password" className="mb-2 block text-lg">
            Password
          </label>
          <input
            {...register('password', { required: true })}
            type="password"
            id="password"
            className="w-full rounded-md border border-gray-300 p-2 text-gray-800"
          />
          {errors.password && (
            <span className="text-error text-sm italic">
              The password is required! Insert a valid password.*
            </span>
          )}
        </div>
        <button className="w-full" type="submit">
          register
        </button>
      </form>
    </div>
  );
}
