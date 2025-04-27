
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavBar = () => {
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
            Demo
          </Link>
          <a href="#features" className="text-gray-700 hover:text-converse-primary transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-converse-primary transition-colors">
            Pricing
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button className="bg-gradient-to-r from-converse-primary to-converse-secondary hover:opacity-90 transition-opacity">
            Try Free
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
