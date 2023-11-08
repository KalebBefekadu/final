import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ukruclejfgabxaewbebu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcnVjbGVqZmdhYnhhZXdiZWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MjIyNzMsImV4cCI6MjAxNDM5ODI3M30.jw_X3UuchJ5BQiuE0koEjlTgoMNEbdKf_MJY9rIzduk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// Posts CRUD operations
export const fetchPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export const createPost = async (post) => {
  const { data, error } = await supabase.from('posts').insert([post]);
  if (error) throw new Error(error.message);
  return data;
}

export const updatePost = async (id, updatedFields) => {
  const { data, error } = await supabase.from('posts').update(updatedFields).match({ id });
  if (error) throw new Error(error.message);
  return data;
}

export const deletePost = async (id) => {
  const { data, error } = await supabase.from('posts').delete().match({ id });
  if (error) throw new Error(error.message);
  return data;
}

// Comments CRUD operations
export const fetchComments = async (postId) => {
  const { data, error } = await supabase.from('comments').select('*').eq('post_id', postId);
  if (error) throw new Error(error.message);
  return data;
}

export const createComment = async (comment) => {
  const { data, error } = await supabase.from('comments').insert([comment]);
  if (error) throw new Error(error.message);
  return data;
}

export const updateComment = async (id, updatedFields) => {
  const { data, error } = await supabase.from('comments').update(updatedFields).match({ id });
  if (error) throw new Error(error.message);
  return data;
}

export const deleteComment = async (id) => {
  const { data, error } = await supabase.from('comments').delete().match({ id });
  if (error) throw new Error(error.message);
  return data;
}
