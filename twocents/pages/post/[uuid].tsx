import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsonRpc } from "@/utils/api";
import { Post, Comment } from "@/types";
import Header from "@/components/Header";
import PollResults from "@/components/PollResults";

function CommentItem({
  comment,
  level = 0,
}: {
  comment: Comment;
  level?: number;
}) {
  return (
    <div className={`pl-${level * 6} border-l border-gray-600 ml-4 mb-4`}>
      <div className="text-sm text-gray-400 mb-1">
        {comment.author_age} · {comment.author_gender} ·{" "}
        {comment.author_location}
      </div>
      <div className="bg-gray-700 p-3 rounded whitespace-pre-wrap">
        {comment.text}
      </div>
      {comment.children &&
        comment.children.length > 0 &&
        comment.children.map((child) => (
          <CommentItem key={child.uuid} comment={child} level={level + 1} />
        ))}
    </div>
  );
}

// Type for poll result item from API
type PollResultItem = {
  votes: number;
  average_balance: number;
};

export default function PostDetail() {
  const router = useRouter();
  const { uuid } = router.query;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [poll, setPoll] = useState<{
    question: string;
    options: { option: string; votes: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    async function fetchPost() {
      setLoading(true);
      try {
        // Fetch post and comments
        const data = await jsonRpc<{ post: Post; comments: Comment[] }>(
          "/v1/posts/get",
          { post_uuid: uuid }
        );
        setPost(data.post);

        // Fetch comments separately
        const commentsData = await jsonRpc<{ comments: Comment[] }>(
          "/v1/comments/get",
          { post_uuid: uuid }
        );
        setComments(commentsData.comments || []);

        // Fetch poll data
        const pollData = await jsonRpc<{
          results: Record<string, PollResultItem>;
        }>("/v1/polls/get", {
          post_uuid: uuid,
        });

        const rawResults = pollData.results;
        if (rawResults) {
          const options = Object.entries(rawResults).map(([key, val]) => ({
            option: `Option ${key}`,
            votes: val.votes,
          }));

          setPoll({
            question: "Poll results",
            options,
          });
        } else {
          setPoll(null);
        }

        setError(null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [uuid]);

  //Load comment Item
  function CommentItem({
    comment,
    level = 0,
  }: {
    comment: Comment & {
      author_meta: { age: number; gender: string; arena: string };
    };
    level?: number;
  }) {
    return (
      <div
        className={`pl-${
          level * 6
        } p-3 rounded border-l border-white-600 ml-4 mb-4`}
      >
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1  ">
          <span>{comment.author_meta.age}</span>
          <span>·</span>
          <span>{comment.author_meta.gender}</span>
          <span>·</span>
          <span>{comment.author_meta.arena}</span>
          <span>{comment.author_meta.arena}</span>
        </div>
        <div className="bg-gray-700 p-3 rounded whitespace-pre-wrap">
          {comment.text}
        </div>

        {/* Render nested children recursively if you have them */}
        {comment.children &&
          comment.children.length > 0 &&
          comment.children.map((child) => (
            <CommentItem key={child.uuid} comment={child} level={level + 1} />
          ))}
      </div>
    );
  }

  if (loading)
    return (
      <>
        <Header />
        <div className="fixed inset-0 col-span-full flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </div>
      </>
    );

  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!post) return <div className="text-white p-6">Post not found</div>;

  return (
    <>
      <Header />
      <main className="pt-20 md:pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-7xl mx-auto">
        <h1
          className="
        text-4xl font-extrabold 
        text-yellow-400 
        mb-6 
        select-none 
        tracking-wide
        drop-shadow-lg
      "
          style={{ fontFamily: "'Poppins', sans-serif" }} // optional for nicer font if you want to import in _app.tsx
        >
          Post Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
            <h1 className="text-3xl font-extrabold mb-3 leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-300 mb-6 whitespace-pre-wrap">
              {post.text}
            </p>
            <div className="text-sm text-gray-400 font-medium">
              {post.author_meta.age} · {post.author_meta.gender} ·{" "}
              {post.author_meta.arena}
            </div>
          </article>

          {/* Poll results */}
          <div className="h-full ">{poll && <PollResults poll={poll} />}</div>
        </div>

        <section className="mt-12 max-w-full">
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Comments ({comments?.length})
          </h2>
          {comments?.length === 0 && (
            <p className="text-gray-500 italic">No comments yet.</p>
          )}
          {comments.map((comment) => (
            <CommentItem key={comment.uuid} comment={comment} />
          ))}
        </section>
      </main>
    </>
  );
}
