import { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('userProvider 내부에 있어야 해요!!!');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  return <UserContext.Provider value="login">{children}</UserContext.Provider>;
};
