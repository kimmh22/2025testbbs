import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase';

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('BoardProvider 안에 있어야 함');
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .order('id', { ascending: false });

    if (!error) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const value = {
    posts,
    getPosts,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
