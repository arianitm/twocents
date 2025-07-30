import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { jsonRpc } from "@/utils/api";
import { Post, Comment } from "@/types";
import Header from "@/components/Header";
import PollComponent from "@/components/PollComponent";
import clsx from "clsx";
import {
  FaClock,
  FaComment,
  FaEye,
  FaLocationArrow,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaReply,
} from "react-icons/fa";
import { IoPerson, IoShareOutline } from "react-icons/io5";
import { MdCake } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RiExpandUpDownLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

const pillColors = {
  bronze: "from-yellow-800 to-yellow-600",
  silver: "from-gray-400 to-gray-100",
  gold: "from-yellow-400 to-yellow-200",
  platinum: "from-blue-300 to-white",
};

function getNetWorthLabel(balance: number): keyof typeof pillColors {
  if (balance >= 100000) return "platinum";
  if (balance >= 50000) return "gold";
  if (balance >= 10000) return "silver";
  return "bronze";
}

export default function PostDetailPage() {
  const { query } = useRouter();
  // const uuid = query.uuid as string;
  const router = useRouter();
  const { uuid } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState<
    {
      option: string;
      votes: number;
      average_balance: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uuid) return;
    setLoading(true);

    const fetchAll = async () => {
      try {
        const postRes = await jsonRpc<{ post: Post }>("/v1/posts/get", {
          post_uuid: uuid,
        });
        const commentRes = await jsonRpc<{ comments: Comment[] }>(
          "/v1/comments/get",
          { post_uuid: uuid }
        );
        const pollRes = await jsonRpc<{
          results: Record<number, { votes: number; average_balance: number }>;
        }>("/v1/polls/get", { post_uuid: uuid });

        setPost(postRes.post);
        setComments(commentRes.comments);

        const labels = postRes.post?.post_meta?.poll ?? [];
        const results = pollRes.results ?? {};

        const combined = labels.map((label, idx) => ({
          option: label,
          votes: results[idx]?.votes ?? 0,
          average_balance: results[idx]?.average_balance ?? 0,
        }));

        setPollOptions(combined);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [uuid]);

  const totalVotes = pollOptions.reduce((acc, o) => acc + o.votes, 0);

  const renderComment = (comment: Comment, level = 0) => {
    const color = pillColors[comment.net_worth_label];

    return (
      <div key={comment.uuid} className={clsx(`ml-${level * 4} mb-6`)}>
        <div className="flex justify-between items-center gap-2 text-xs text-gray-400 mb-1">
          <div className="flex items-center gap-2">
            {(() => {
              const netWorthLabel = getNetWorthLabel(
                comment.author_meta.balance
              );
              const netWorthColor = pillColors[netWorthLabel];

              return (
                <Link
                  href={`/user/${comment.author_uuid}`}
                  className={clsx(
                    "text-xs px-3 py-1 rounded-full font-semibold bg-gradient-to-r text-black",
                    netWorthColor,
                    "hover:brightness-90"
                  )}
                >
                  {/* {netWorthLabel} */}$
                  {Math.round(comment.author_meta.balance).toLocaleString()}
                </Link>
              );
            })()}
            <FaLongArrowAltUp size={10} />
            <span className="text-white text-sm">{comment.upvote_count}</span>
            <MdCake size={12} />
            <span>{comment.author_meta.age}</span>
            <IoPerson size={12} />
            <span>{comment.author_meta.gender}</span>
            <FaLocationArrow size={12} />
            <FaClock color="gray" />
          </div>
          <div className="flex items-right">
            {new Date(comment.created_at).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
            <span>
              <BsThreeDots color="gray" />
            </span>
          </div>
        </div>

        <div className="p-4 text-white text-sm leading-snug">
          {comment.text}
        </div>

        {comment.children?.map((child) => renderComment(child, level + 1))}
      </div>
    );
  };

  if (loading)
    return (
      <div className="bg-black">
        <Header />
        <main className="w-full pt-16 bg-black min-h-screen text-white p-6 fixed inset-0  mx-auto flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </main>
      </div>
    );

  if (!post)
    return (
      <div className="w-full bg-black">
        <Header />
        <main className="w-full pt-16 min-h-screen text-white p-6 mx-auto text-center">
          Post not found.
        </main>
      </div>
    );

  const netWorthLabel = getNetWorthLabel(post.author_meta.balance);
  const netWorthColor = pillColors[netWorthLabel];

  return (
    <div className="w-full bg-black">
      <Header />
      <main className="pt-20 px-4 md:px-6 max-w-2xl mx-auto text-white min-h-[calc(100vh-60px)]">
        <button
          onClick={() => router.back()}
          className="text-sm text-orange-400 hover:underline flex items-center gap-2 mb-2"
        >
          <IoMdArrowRoundBack /> Back
        </button>

        <div className="mb-6 border-b border-gray-800 pb-4 border-b border-gray-800">
          <div className="flex justify-between align-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
              {post.title || post.text.slice(0, 50)}
            </h1>
            <div>
              <Link
                href={`/user/${post.author_uuid}`}
                className={clsx(
                  "text-xs px-3 py-1 rounded-full font-semibold bg-gradient-to-r text-black",
                  netWorthColor,
                  "hover:brightness-90"
                )}
              >
                {Math.round(post.author_meta.balance).toLocaleString()}
              </Link>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-6 whitespace-pre-wrap">
            {post.text}
          </p>

          <div className="flex items-left justify-between mb-3">
            <span className="flex items-center gap-2">
              <MdCake color="gray" />
              {post.author_meta.age}
            </span>
            <span className="flex items-center gap-2">
              <IoPerson color="gray" />
              {post.author_meta.gender}
            </span>
            <span className="flex items-center gap-2">
              <FaLocationArrow color="gray" />
              {post.author_meta.arena}
            </span>
            <span className="flex items-center gap-2">
              <FaClock color="gray" />
              {new Date(post.created_at).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-left justify-between border-b border-gray-800">
            <div className="flex items-left justify-between gap-10">
              <span className="flex items-center">
                <FaLongArrowAltUp color="gray" /> {post.upvote_count}
              </span>
              <span className="flex items-center gap-2">
                <FaComment color="gray" />
                {post.comment_count}
              </span>
              <span className="flex items-center gap-2">
                <FaEye color="gray" /> {post.view_count}
              </span>
            </div>
            <span className="text-orange-400 hover:underline cursor-pointer ml-1">
              {post.topic}
            </span>
            <span>
              <BsThreeDots color="gray" />
            </span>
          </div>

          <div className="pt-5 pb-5 border-b border-gray-800">
            <div className="flex items-left justify-between">
              <button className="bg-orange-400 hover:bg-orange-500 w-10 h-10 rounded-md flex items-center justify-center text-black font-bold text-lg">
                <FaLongArrowAltUp color="white" />
              </button>
              <button className="hover:bg-gray-600 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg">
                <FaLongArrowAltDown color="orange" />
              </button>
              <button className="hover:bg-gray-600 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg">
                <FaReply color="orange" />
              </button>
              <button className="hover:bg-gray-600 w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-lg">
                <IoShareOutline color="orange" />
              </button>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex items-left justify-between">
              Sort By
              <span className="flex items-center gap-2">
                Latest
                <RiExpandUpDownLine color="orange" />
              </span>
            </div>
          </div>
        </div>

        {pollOptions.length > 0 && <PollComponent pollOptions={pollOptions} />}

        <section className="mb-5 pb-5">
          {comments.length === 0 ? (
            <p className="text-gray-400 italic">No comments yet.</p>
          ) : (
            comments.map((comment) => renderComment(comment))
          )}
        </section>
      </main>
    </div>
  );
}
