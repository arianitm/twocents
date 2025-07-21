import Link from "next/link";
import { Post } from "@/types";

const pillColors: Record<number, string> = {
  0: "bg-gradient-to-r from-yellow-800 to-yellow-600", // bronze
  1: "bg-gradient-to-r from-gray-400 to-gray-100", // silver
  2: "bg-gradient-to-r from-yellow-400 to-yellow-200", // gold
  3: "bg-gradient-to-r from-blue-300 to-white", // platinum
  4: "bg-gradient-to-r from-purple-600 to-pink-400", // diamond or custom
};

const pillLabels: Record<number, string> = {
  0: "BRONZE",
  1: "SILVER",
  2: "GOLD",
  3: "PLATINUM",
  4: "DIAMOND",
};

export default function PostCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const subscriptionType = post.author_meta.subscription_type ?? 0;
  const delay = index * 150;

  const label = pillLabels[subscriptionType] || "UNKNOWN";
  const colorClass = pillColors[subscriptionType] || "bg-gray-500";

  return (
    <Link href={`/post/${post.uuid}`}>
      <div
        style={{ animationDelay: `${delay}ms` }}
        className="bg-gray-800 p-5 rounded-2xl shadow hover:bg-gray-700 transition min-h-[300px] max-h-[350px] flex flex-col justify-between"
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-xs text-black px-3 py-1 rounded-full font-semibold ${colorClass}`}
          >
            {label}
          </span>
          <span className="text-sm text-gray-400">
            {post.author_meta.age} · {post.author_meta.gender} ·{" "}
            {post.author_meta.arena}
          </span>
        </div>

        {(post.title || post.text) && (
          <div className="overflow-y-auto flex-grow mb-3">
            {post.title && (
              <h2 className="text-white font-bold text-lg mb-1">
                {post.title}
              </h2>
            )}
            {post.text && <p className="text-white text-sm">{post.text}</p>}
          </div>
        )}

        <div className="text-sm text-gray-400">
          💬 {post.comment_count} comments · ❤️ {post.upvote_count} upvotes
        </div>
      </div>
    </Link>
  );
}
