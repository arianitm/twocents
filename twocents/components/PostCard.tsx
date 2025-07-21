import Link from "next/link";
import { Post } from "@/types";

const pillColors: Record<string, string> = {
  bronze: "bg-gradient-to-r from-yellow-800 to-yellow-600",
  silver: "bg-gradient-to-r from-gray-400 to-gray-100",
  gold: "bg-gradient-to-r from-yellow-400 to-yellow-200",
  platinum: "bg-gradient-to-r from-blue-300 to-white",
};

function getNetWorthLabel(balance: number): string {
  if (balance >= 100000) return "platinum";
  if (balance >= 50000) return "gold";
  if (balance >= 10000) return "silver";
  return "bronze";
}

export default function PostCard({ post }: { post: Post }) {
  const label = getNetWorthLabel(post.author_meta.balance);
  const colorClass = pillColors[label] || "bg-gray-500";

  return (
    <Link href={`/post/${post.uuid}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[280px] max-h-[280px] cursor-pointer hover:bg-gray-700 transition">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href={`/user/${post.author_uuid}`}
              className={`text-xs px-4 py-2 rounded-full font-semibold ${colorClass} hover:brightness-70 transition hover:text-gray-700 hover:font-semibold`}
              onClick={(e) => e.stopPropagation()}
              title="View posts by this user"
            >
              {label}
            </Link>
            <span className="text-sm text-gray-400">
              {post.author_meta.age} · {post.author_meta.gender} ·{" "}
              {post.author_meta.arena}
            </span>
          </div>
          <h2 className="font-bold text-lg truncate">
            {post.title || post.text}
          </h2>
          <p className="text-gray-300 mt-2 line-clamp-4">{post.text}</p>
        </div>
        <div className="mt-4 flex justify-between text-gray-400 text-sm">
          <div>💬 {post.comment_count} comments</div>
          <div>❤️ {post.upvote_count} upvotes</div>
        </div>
      </div>
    </Link>
  );
}
