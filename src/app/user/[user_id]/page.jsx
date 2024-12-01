"use client"; // Mark the file as a client component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use this to access `params`

export default function UserProfilePage() {
  const params = useParams(); // Get `params` in a Client Component
  const user_id = params?.user_id; // Unwrap `params`

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user_id) return;

    const fetchProfile = async () => {
      const res = await fetch(`/api/users/${user_id}`);
      const data = await res.json();
      setProfile(data.profile);
      setPosts(data.posts);
    };

    fetchProfile();
  }, [user_id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.biography}</p>
      <h3>User’s Posts</h3>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
