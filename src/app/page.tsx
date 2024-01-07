import Register from '@/app/_components/register';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // {hello ? hello.greeting : "Loading tRPC query..."}
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-[3rem]">
          Welcome to Sharing Recipes App!
        </h1>
        {/*<Login />*/}
        <Register />
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   // const latestPost = await api.post.getLatest.query();
//
//   return (
//     <div className="w-full max-w-xs">
//       <p>You have no posts yet.</p>
//
//       <CreatePost />
//     </div>
//   );
// }
