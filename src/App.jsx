import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './PostList.css';
import './Post.css';
import './CommentList.css';
import { supabase } from './supabase';
import PostList from './PostList';
import Post from './Post';
import PostForm from './PostForm';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    }

    fetchPosts();
  }, []);

  const handleSelectPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
  };

  const handleCreatePost = async (newPost) => {
    try {
      const { data, error } = await supabase.from('posts').insert([newPost]);
      if (error) {
        throw error;
      }
      setPosts([data[0], ...posts]); // Add the new post to the top of the list
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post: ' + error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        Hello World!
        <Routes>
          <Route path="/" element={
            <>
              <PostList posts={posts} onSelectPost={handleSelectPost} />
              <PostForm onPostCreated={handleCreatePost} />
            </>
          } />
          <Route path="/post/:id" element={<Post post={selectedPost} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;