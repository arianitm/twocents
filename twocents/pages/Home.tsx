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
    // Since it was required to show 100 posts. Another solution is with infinit scroll
    fetchPosts();
  }, [filter]);

  return (
    <main className="pt-20 md:pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto">
      <h1
        className="
        pt-5
        text-4xl font-extrabold 
        text-yellow-400 
        mb-6 
        select-none 
        tracking-wide
        drop-shadow-lg
      "
        style={{ fontFamily: "'Poppins', sans-serif" }} // optional for nicer font if you want to import in _app.tsx
      >
        {filter === "newToday" ? "New Today" : "Top Today"} Posts
      </h1>
      <Header
        activeFilter={filter}
        onFilterClick={setFilter}
        showFilter={true}
      />
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {loading ? (
          <div className="col-span-full fixed inset-0 flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={post.uuid}
              className="animate-fadeSlideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard key={post.uuid} post={post} />{" "}
            </div>
          ))
        )}
      </div>
      {error && <div className="text-red-500 text-center py-10">{error}</div>}
    </main>
  );
}
