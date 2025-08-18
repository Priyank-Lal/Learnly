import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { goalContext } from "../../context/GoalContext";
import { getUser } from "../../api/api";
import { memo } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const { data } = await getUser();
    setUser(data.user);
  };
  const isAuthenticated = true;

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);


  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-40 transition-all duration-300">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center">
              <h2 className="md:text-lg text-md font-semibold text-gray-900 dark:text-white line-clamp-1">
                Hello, {user?.username || "User"}!
              </h2>
            </div>
          </motion.div>

          {/* User Actions */}
          {isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center md:space-x-3"
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 h-9"
              >
                <Link to="/profile" className="flex items-center md:space-x-1">
                  <div className="p-2 border rounded-xl md:border-none md:p-0">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:block">Profile</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 h-9 cursor-pointer md:space-x-1 px-0 md:px-3"
              >
                <div className="p-2 border rounded-xl md:border-none md:p-0">
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="hidden sm:block">Logout</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <Button
                variant="ghost"
                asChild
                className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 "
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
