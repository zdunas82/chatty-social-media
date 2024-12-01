"use client";

import { useState, useEffect } from "react";

export default function PostPage({ params }) {
  const { id } = params; // Post ID from the URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch the post details
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setComments(data.comments);
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    await fetch(`/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: id, content: newComment }),
    });
    setComments((prev) => [...prev, { content: newComment, username: "You" }]);
    setNewComment("");
  };

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Post Content */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-gray-700">{post.content}</p>
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-md shadow-sm"
              >
                <p className="text-gray-700">
                  <span className="font-semibold text-blue-600">
                    {comment.username}
                  </span>{" "}
                  says:
                </p>
                <p className="text-gray-600 mt-1">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Add Comment Section */}
      <div className="p-4 bg-gray-50 border rounded-md shadow-md">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
