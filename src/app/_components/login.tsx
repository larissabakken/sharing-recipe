'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      router.push('/system');
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
        <div className="flex justify-center">
          <Image src="/logo.jpeg" alt="RecipeHub" width={150} height={150} />
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
            type="text"
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
          Login
        </button>
      </form>
      <div>
        <p className="mt-4 text-center text-sm text-gray-400">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?{' '}
          <a
            href="/register"
            className="font-semibold text-blue-500 hover:text-blue-600"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
