
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User, LogIn } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Will connect to Supabase later

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-blue">Q</span>
              <span className="text-2xl font-bold text-brand-orange">uestify</span>
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <Input
                type="search"
                placeholder="Search questions..."
                className="w-full pl-10 bg-gray-50 focus-visible:ring-brand-blue"
              />
            </div>
          </div>

          {/* Navigation - desktop */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/questions" className="text-gray-600 hover:text-brand-blue">
                Questions
              </Link>
              <Link to="/tags" className="text-gray-600 hover:text-brand-blue">
                Tags
              </Link>
              <Link to="/users" className="text-gray-600 hover:text-brand-blue">
                Users
              </Link>
              {isLoggedIn ? (
                <Button variant="ghost" className="flex items-center">
                  <User size={18} className="mr-2" />
                  Profile
                </Button>
              ) : (
                <Button variant="outline" className="flex items-center border-brand-blue text-brand-blue hover:bg-brand-lightBlue">
                  <LogIn size={18} className="mr-2" />
                  Log in
                </Button>
              )}
              {!isLoggedIn && (
                <Button className="bg-brand-darkBlue hover:bg-brand-blue">Sign up</Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-brand-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-3 sm:px-3">
          {/* Mobile search */}
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <Input
              type="search"
              placeholder="Search questions..."
              className="w-full pl-10 bg-gray-50"
            />
          </div>
          
          <Link to="/questions" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md">
            Questions
          </Link>
          <Link to="/tags" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md">
            Tags
          </Link>
          <Link to="/users" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-brand-blue hover:bg-gray-50 rounded-md">
            Users
          </Link>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              {isLoggedIn ? (
                <Button variant="ghost" className="w-full justify-start">
                  <User size={18} className="mr-2" />
                  Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-1/2 mr-2 border-brand-blue text-brand-blue">
                    Log in
                  </Button>
                  <Button className="w-1/2 bg-brand-darkBlue hover:bg-brand-blue">
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
