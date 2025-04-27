
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface AuthContextType {
  messageCount: number;
  incrementMessageCount: () => void;
  canSendMessage: boolean;
  isProUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [messageCount, setMessageCount] = useState(0);
  const [lastReset, setLastReset] = useState<string>(localStorage.getItem('lastReset') || '');

  const isProUser = user?.publicMetadata?.plan === 'pro';
  const MESSAGE_LIMIT = 50;

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastReset !== today) {
      setMessageCount(0);
      setLastReset(today);
      localStorage.setItem('lastReset', today);
    }
  }, [lastReset]);

  const incrementMessageCount = () => {
    setMessageCount(prev => prev + 1);
  };

  const canSendMessage = isProUser || messageCount < MESSAGE_LIMIT;

  return (
    <AuthContext.Provider value={{
      messageCount,
      incrementMessageCount,
      canSendMessage,
      isProUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
