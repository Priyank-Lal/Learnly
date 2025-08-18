import MainRoutes from "./routes/MainRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import AppSidebar from "./components/layout/AppSidebar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ScrollToTop from "./components/layout/ScrollToTop";

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-hidden">
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
  );
};

export default App;
