import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsonRpc } from "@/utils/api";
import { Post } from "@/types";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

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
        <main className="pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </main>
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-900 text-red-500 p-6 max-w-7xl mx-auto text-center">
          {error}
        </main>
      </>
    );

  if (!user)
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto text-center">
          User not found.
        </main>
      </>
    );

  const { bio, age, gender, arena, balance, subscription_type } = user;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto">
        <div className="flex gap-8 max-w-full">
          <section
            className="w-1/3 p-6 bg-gray-800 h-25 rounded-lg shadow text-white flex-shrink-0"
            style={{ minHeight: "280px" }}
          >
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <p className="text-yellow-400 font-semibold mb-3 whitespace-pre-wrap">
              {bio}
            </p>
            <p className="mb-1">
              Age: <span className="font-semibold">{age}</span> · Gender:{" "}
              <span className="font-semibold">{gender}</span> · Location:{" "}
              <span className="font-semibold">{arena}</span>
            </p>
            <p className="mb-1">
              Balance:{" "}
              <span className="font-semibold">
                $
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
            <p>
              Subscription Level:{" "}
              <span className="font-semibold">{subscription_type}</span>
            </p>
          </section>

          {/* Posts list */}
          <section className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Posts by user {uuid}</h1>
            {posts.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No posts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
