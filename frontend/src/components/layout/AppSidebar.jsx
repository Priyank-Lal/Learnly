import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Target,
  User,
  Settings,
  BarChart3,
  Brain,
  Plus,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview of your goals",
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Target,
    description: "Manage your goals",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    description: "Track your progress",
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    description: "Your profile settings",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "App configuration",
  },
];

const AppSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 lg:hidden transition-colors duration-300"
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      <AnimatePresence>
        {!isDesktop && isMobileOpen && (
          <>
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
                onClick={toggleMobileMenu}
              />

              <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          Learnly
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Goal Management
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 "
                      >
                        {isDark ? (
                          <Sun className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <Moon className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                      {/* <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </button> */}
                    </div>
                  </div>

                  {/* Mobile Content */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-3">
                      <div className="mb-6">
                        <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Navigation
                        </div>
                        <div className="space-y-1">
                          {menuItems.map((item) => (
                            <Link
                              key={item.title}
                              to={item.url}
                              onClick={toggleMobileMenu}
                              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                isActive(item.url)
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                              }`}
                            >
                              <item.icon
                                className={`h-5 w-5 ${
                                  isActive(item.url)
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              />
                              <span>{item.title}</span>
                              {isActive(item.url) && (
                                <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                          Quick Actions
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={toggleMobileMenu}
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 transition-all duration-200"
                        >
                          <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span>Add New Goal</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            Welcome back!
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Ready to crush your goals?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          </>
        )}
      </AnimatePresence>
      {isDesktop && (
        <>
          <div className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 z-30 transition-colors duration-300">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Learnly
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Goal Management
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="px-3 py-4">
              <div className="mb-6">
                <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Navigation
                </div>
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      className={`group relative flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white ${
                        isActive(item.url)
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <item.icon
                        className={`h-5 w-5 transition-colors duration-200 ${
                          isActive(item.url)
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }`}
                      />
                      <span className="flex-1">{item.title}</span>
                      {isActive(item.url) && (
                        <div className="absolute right-2 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Quick Actions
                </div>
                <Link
                  to="/dashboard"
                  className="group relative flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 transition-all duration-200"
                >
                  <Plus className="h-5 w-5 transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400" />
                  <span className="flex-1">Add New Goal</span>
                </Link>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 py-4 px-3">
              <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600  flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Welcome to Learnly!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ready to crush your goals?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppSidebar;
