import { createContext, useContext, useState } from 'react';
import supabase from '../utils/supabase';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('userProvider 내부에 있어야 해요!!!');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password, name, phone, text) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      const { error: userError } = await supabase
        .from('user_table')
        .insert([
          {
            id: data.user.id,
            name: formData.name,
            phone: formData.phone,
            text: formData.text,
          },
        ])
        .select();
      if (!userError) {
        return { error: null };
      } else {
        return { error: userError };
      }
    } else {
      return { error: error };
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return { error: null };
    } else {
      return { error };
    }
  };
  const value = {
    loading,
    signUp,
    signIn,
    setLoading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
