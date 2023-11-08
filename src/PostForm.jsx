// src/PostForm.jsx
import React, { useState } from 'react';
import { createPost } from './supabase';

const PostForm = ({ onPostCreated }) => { // Include the onPostCreated prop here
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createPost({ title, content });
      if (result.error) {
        throw result.error;
      }
      console.log(result);
      onPostCreated(result.data); // Notify the parent component
      setTitle(''); // Reset the title
      setContent(''); // Reset the content
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
