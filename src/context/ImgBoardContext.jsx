import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/supabase';

const ImgBoardContext = createContext();

export const useImgBoard = () => {
  const context = useContext(ImgBoardContext);
  if (!context) {
    throw new Error('imgBoardProvider 안에 있어야 함');
  }
  return context;
};

export const ImgBoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data, error } = await supabase
      .from('image_bbs')
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
    <ImgBoardContext.Provider value={value}>
      {children}
    </ImgBoardContext.Provider>
  );
};
