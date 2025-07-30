import { useEffect, useState, useRef } from "react";
import { jsonRpc } from "@/utils/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";

export default function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("topToday");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await jsonRpc<{ posts: Post[] }>("/v1/posts/arena", {
          filter,
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

  // ✅ Auto-scroll logic
  useEffect(() => {
    let frameId: number;
    const container = scrollRef.current;

    function step() {
      if (container) {
        container.scrollTop += 0.3; // speed of scroll
        if (
          container.scrollTop >=
          container.scrollHeight - container.clientHeight
        ) {
          container.scrollTop = 0; // loop to top
        }
      }
      frameId = requestAnimationFrame(step);
    }

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [loading]);

  return (
    // <main className="text-white min-h-screen">
    //   <section className="px-6  max-w-7xl mx-auto">
    //     {/* Scrollable container with fixed height */}
    //     <div
    //       ref={scrollRef}
    //       className="overflow-y-auto max-h-[70vh] pr-2 scrollbar-none"
    //     >
    //       {loading ? (
    //         <div className="flex justify-center items-center min-h-[200px]">
    //           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
    //         </div>
    //       ) : (
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //           {posts.map((post) => (
    //             <PostCard key={post.uuid} post={post} />
    //           ))}
    //         </div>
    //       )}
    //     </div>

    //     {error && <div className="text-red-500 text-center py-10">{error}</div>}
    //   </section>
    //   <div className="relative z-10 py-1 text-center text-neutral-200 overflow-hidden">
    //     <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b2c12] via-[#7a5316] to-[#3b2c12] shadow-[0_0_5px_#f8b133] z-10" />
    //   </div>
    // </main>
    <main className="text-white min-h-screen">
      <section className="px-6 max-w-7xl mx-auto">
        {/* FILTER TABS */}
        <div className="flex justify-center gap-2 sm:gap-4 my-6">
          {[
            { label: "Top Today", value: "topToday" },
            { label: "New Today", value: "newToday" },
            { label: "Top All Time", value: "topAllTime" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 hover:cursor-pointer
            ${
              filter === value
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-[#2d2412] text-gray-300 hover:bg-[#15202b]"
            }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Scrollable container with fixed height */}
        <div
          ref={scrollRef}
          className="overflow-y-auto max-h-[70vh] pr-2 scrollbar-none"
        >
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.uuid} post={post} />
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 text-center py-10">{error}</div>}
      </section>

      <div className="relative z-10 py-1 text-center text-neutral-200 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b2c12] via-[#7a5316] to-[#3b2c12] shadow-[0_0_5px_#f8b133] z-10" />
      </div>
    </main>
  );
}
