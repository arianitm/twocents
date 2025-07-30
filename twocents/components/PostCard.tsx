import { Post } from "@/types";
import Link from "next/link";
import { FaHeart, FaCommentAlt } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import Image from "next/image";
import { format } from "date-fns";
import clsx from "clsx";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const formattedDate = format(new Date(post.created_at), "p · MMM d, yyyy");

  return (
    <Link href={`/post/${post.uuid}`}>
      <div className="bg-[#15202b] hover:-translate-y-1 transition-transform duration-200 ease-out border border-neutral-700/50 rounded-2xl p-4 text-neutral-300 cursor-pointer max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <div className="text-sm text-white font-semibold">
              {post.author_meta.age} · {post.author_meta.gender}
            </div>
            <div className="text-xs text-neutral-400">
              {post.author_meta.arena}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-white leading-tight mb-1 line-clamp-1">
          {post.title}
        </h2>

        <p className="text-base text-neutral-400 leading-snug line-clamp-2 mb-4">
          {post.text}
        </p>

        <div className="text-xs text-neutral-500 border-b border-neutral-700/50 pb-3 mb-3">
          {formattedDate}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-neutral-400 hover:text-pink-500 transition">
            <FaHeart className="w-4 h-4" />
            <span className="font-medium">{post.upvote_count}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 hover:text-sky-500 transition">
            <FaCommentAlt className="w-4 h-4" />
            <span className="font-medium">{post.comment_count}</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition">
            <FiShare2 className="w-4 h-4" />
            <span className="font-medium">Copy link</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="block text-center border border-neutral-700 text-sky-500 hover:text-sky-300 rounded-full py-1 font-semibold transition">
            Read more on X
          </span>
        </div>
      </div>
    </Link>
  );
}
