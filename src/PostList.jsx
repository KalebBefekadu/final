// src/components/PostList.jsx
import React, { useEffect, useState } from 'react';
import './PostList.css';
import { fetchPosts } from "./supabase";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle the error as per your error handling strategy
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Implement other post details you want to display */}
        </div>
      ))}
    </div>
  );
};



export default PostList;
