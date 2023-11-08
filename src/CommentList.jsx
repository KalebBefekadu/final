// src/components/CommentList.jsx
import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchComments, createComment } from './supabase';
import './CommentList.css';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await fetchCommentsForPost(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle the error as per your error handling strategy
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const comment = await submitComment({ postId, content: newComment });
      setComments([...comments, comment]);
      setNewComment(''); // Reset comment input after submission
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Handle the error as per your error handling strategy
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            {/* Add other comment details if needed */}
          </div>
        ))
      )}
    </div>
  );
};

//Need to be deleted
const staticComments = [
    { id: 1, content: 'Great post!' },
    { id: 2, content: 'Really enjoyed this.' },
    // ...more comments
  ];
  

export default CommentList;
