
import React from 'react';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          {location.pathname.includes('sign-up') ? (
            <SignUp routing="path" path="/sign-up" />
          ) : (
            <SignIn routing="path" path="/sign-in" />
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
