
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser, useClerk } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { isProUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">ConverseEasy</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-converse-primary transition-colors">
            Home
          </Link>
          <Link to="/workspace" className="text-gray-700 hover:text-converse-primary transition-colors">
            Workspace
          </Link>
          <a href="#features" className="text-gray-700 hover:text-converse-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-converse-primary transition-colors">
            Pricing
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              {isProUser && (
                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-converse-primary text-white">
                  PRO
                </span>
              )}
              <div className="hidden md:flex">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-9 h-9"
                    }
                  }}
                />
              </div>
              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" className="hidden md:inline-flex">
                  Sign in
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-gradient-to-r from-converse-primary to-converse-secondary hover:opacity-90 transition-opacity">
                  Try Free
                </Button>
              </Link>
              <div className="md:hidden">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-converse-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/workspace" 
              className="text-gray-700 hover:text-converse-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workspace
            </Link>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-converse-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-converse-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            {isSignedIn && (
              <Button 
                variant="outline" 
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Sign out
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
