import MainRoutes from "./routes/MainRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import AppSidebar from "./components/layout/AppSidebar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ScrollToTop from "./components/layout/ScrollToTop";
const App = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return;

  return (
    <>
      <div className="overflow-hidden bg-gray-100 dark:bg-gray-900 min-h-screen">
        {user ? (
          <ThemeProvider>
            <ScrollToTop />
            <Navbar />
            <AppSidebar />
            <MainRoutes />
          </ThemeProvider>
        ) : (
          <MainRoutes />
        )}
      
      </div>
    </>
  );
};

export default App;
