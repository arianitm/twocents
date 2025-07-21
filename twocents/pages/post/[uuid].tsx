import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jsonRpc } from "@/utils/api";
import { Post, Comment } from "@/types";
import Header from "@/components/Header";

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
      <div className="bg-gray-700 p-3 rounded">{comment.text}</div>
      {comment.children &&
        comment.children.length > 0 &&
        comment.children.map((child) => (
          <CommentItem key={child.uuid} comment={child} level={level + 1} />
        ))}
    </div>
  );
}

export default function PostDetail() {
  const router = useRouter();
  const { uuid } = router.query;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    async function fetchPost() {
      setLoading(true);
      try {
        const data = await jsonRpc<{ post: Post; comments: Comment[] }>(
          "/v1/posts/get",
          { post_uuid: uuid }
        );
        setPost(data.post);
        setComments(data.comments || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [uuid]);

  if (loading)
    return (
      <div className="col-span-full flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!post) return <div className="text-white p-6">Post not found</div>;

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-900 text-white p-6 max-w-3xl mx-auto">
        <article className="bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h1 className="text-3xl font-extrabold mb-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-gray-300 mb-6 whitespace-pre-wrap">{post.text}</p>
          <div className="text-sm text-gray-400 font-medium">
            {post.author_meta.age} · {post.author_meta.gender} ·{" "}
            {post.author_meta.arena}
          </div>
        </article>

        <section>
          <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Comments ({comments.length})
          </h2>
          {comments.length === 0 && (
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
