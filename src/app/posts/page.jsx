import PostForm from "@/components/PostForm";
import UserForm from "@/components/UserForm";
import { db } from "@/lib/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PostsPage() {
  const { userId } = await auth();

  // get all the posts
  const responsePosts = await db.query(`
    SELECT
      posts.id,
      posts.content,
      users.username,
      users.id as user_id
    FROM posts
    JOIN users ON posts.clerk_id = users.clerk_id`);
  const posts = responsePosts.rows;

  // check if the user has a username in the db
  const responseUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  const numUsers = responseUser.rowCount;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Posts</h2>

      <div className="mb-8">
        <SignedIn>
          {numUsers === 1 ? (
            <div className="p-4 border rounded-md bg-gray-100 shadow-sm">
              <PostForm />
            </div>
          ) : (
            <div className="p-4 border rounded-md bg-gray-100 shadow-sm">
              <UserForm />
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="p-4 text-center">
            <Link
              href="/sign-in"
              className="text-blue-500 hover:underline text-lg"
            >
              Please sign in to make a post
            </Link>
          </div>
        </SignedOut>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-gray-50 border rounded-md shadow-md"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              <Link href={`/user/${post.user_id}`} className="hover:underline">
                {post.username}
              </Link>{" "}
              says:
            </h3>
            <p className="text-gray-700 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
