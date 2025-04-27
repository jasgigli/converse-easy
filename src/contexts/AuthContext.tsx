
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  messageCount: number;
  incrementMessageCount: () => void;
  canSendMessage: boolean;
  isProUser: boolean;
  remainingMessages: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [messageCount, setMessageCount] = useState(0);
  const [lastReset, setLastReset] = useState<string>(localStorage.getItem('lastReset') || '');
  const { toast } = useToast();

  // Check if user has pro plan
  const isProUser = user?.publicMetadata?.plan === 'pro';
  const MESSAGE_LIMIT = 50;
  const remainingMessages = Math.max(0, MESSAGE_LIMIT - messageCount);

  // Reset message count daily
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastReset !== today) {
      setMessageCount(0);
      setLastReset(today);
      localStorage.setItem('lastReset', today);
    } else if (isSignedIn) {
      // Load saved count from localStorage if we're on the same day
      const savedCount = localStorage.getItem(`messageCount_${user?.id}`);
      if (savedCount) {
        setMessageCount(parseInt(savedCount, 10));
      }
    }
  }, [lastReset, isSignedIn, user?.id]);

  // Save message count to localStorage when it changes
  useEffect(() => {
    if (isSignedIn && user?.id) {
      localStorage.setItem(`messageCount_${user.id}`, messageCount.toString());
    }
  }, [messageCount, isSignedIn, user?.id]);

  const incrementMessageCount = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);

    if (!isProUser && newCount === MESSAGE_LIMIT) {
      toast({
        title: "Daily message limit reached",
        description: "You've used all your free messages for today. Upgrade to Pro for unlimited access.",
        variant: "destructive"
      });
    } else if (!isProUser && newCount >= MESSAGE_LIMIT - 5 && newCount < MESSAGE_LIMIT) {
      toast({
        title: "Message limit approaching",
        description: `You have ${MESSAGE_LIMIT - newCount} messages left today. Consider upgrading to Pro for unlimited access.`,
        variant: "default"
      });
    }
  };

  const canSendMessage = isProUser || messageCount < MESSAGE_LIMIT;

  return (
    <AuthContext.Provider value={{
      messageCount,
      incrementMessageCount,
      canSendMessage,
      isProUser,
      remainingMessages
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
