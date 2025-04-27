
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-converse-primary/30 h-12 w-12"></div>
          <div className="space-y-2">
            <div className="h-4 bg-converse-primary/30 rounded w-36"></div>
            <div className="h-4 bg-converse-primary/30 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {location.pathname.includes('sign-up') ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {location.pathname.includes('sign-up') 
                ? 'Join ConverseEasy today and improve your communications' 
                : 'Access your ConverseEasy workspace'}
            </p>
          </div>
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
