import { useEffect, useState } from "react";
import { jsonRpc } from "@/utils/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import Header from "@/components/Header";

interface HomeProps {
  filter: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("topToday");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await jsonRpc<{ posts: Post[] }>("/v1/posts/arena", {
          filter: filter,
        });
        setPosts(response.posts || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [filter]);

  return (
    <main className="pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto">
      <Header
        activeFilter={filter}
        onFilterClick={setFilter}
        showFilter={true}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard key={post.uuid} post={post} index={index} />
          ))
        )}
      </div>
      {error && <div className="text-red-500 text-center py-10">{error}</div>}
    </main>
  );
}
