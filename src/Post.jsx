// src/components/Post.jsx
import React, { useState } from 'react';
import './Post.css';
import { createPost, updatePost } from "./supabase";

const Post = ({ post, onPostSaved }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [isEditing, setIsEditing] = useState(!post); // If no post is passed, we're creating a new one

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = {
        title,
        content,
        image_url,
        // Add other post fields like image_url if needed
      };

      let savedPost;
      if (isEditing) {
        savedPost = await updatePost(post.id, newPost);
      } else {
        savedPost = await createPost(newPost);
      }

      // Call onPostSaved if it's provided, to refresh the list of posts
      if (onPostSaved) {
        onPostSaved(savedPost);
      }

      // Reset the form or redirect the user
      setTitle('');
      setContent('');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle the error as per your error handling strategy
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default Post;
