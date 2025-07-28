import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsonRpc } from "@/utils/api";
import { Post } from "@/types";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { IoMdArrowRoundBack } from "react-icons/io";

interface User {
  uuid: string;
  age: number;
  gender: string;
  arena: string;
  balance: number;
  bio: string;
  subscription_type: number;
}

export default function UserPosts() {
  const router = useRouter();
  const { uuid } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    async function fetchUserData() {
      setLoading(true);
      try {
        const data = await jsonRpc<{
          user: User;
          recentPosts: Post[];
        }>("/v1/users/get", { user_uuid: uuid });

        setUser(data.user);
        setPosts(data.recentPosts || []);
        setError(null);
        /* eslint-disable @typescript-eslint/no-explicit-any */
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [uuid]);

  if (loading)
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen text-white p-6 max-w-7xl fixed inset-0  mx-auto flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </main>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen text-red-500 p-6 max-w-7xl mx-auto text-center">
          {error}
        </main>
      </>
    );

  if (!user)
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen text-white p-6 max-w-7xl mx-auto text-center">
          User not found.
        </main>
      </>
    );

  const { bio, age, gender, arena, balance, subscription_type } = user;

  return (
    <>
      <Header />

      <main className="pt-20 md:pt-16 min-h-screen text-white p-6 max-w-7xl mx-auto">
        <div className="flex items-left mx-auto cursor-pointer">
          <button
            onClick={() => router.back()}
            className="text-sm text-orange-400 hover:underline flex items-center gap-2 mb-2"
          >
            <IoMdArrowRoundBack />
            Back
          </button>
        </div>
        <h1
          className="
        text-4xl font-extrabold 
        text-yellow-400 
        mb-6 
        select-none 
        tracking-wide
        drop-shadow-lg
      "
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          User Details
        </h1>
        <div className="flex flex-col md:flex-row gap-8 max-w-full">
          {/* Posts list */}
          <section className="flex-1 w-full">
            <h1 className="text-2xl font-bold mb-6">Posts by user: {uuid}</h1>
            {posts.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No posts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <div key={post.uuid} className="h-[280px]">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
