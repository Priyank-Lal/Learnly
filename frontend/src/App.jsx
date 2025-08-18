import MainRoutes from "./routes/MainRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/layout/Navbar";
import AppSidebar from "./components/layout/AppSidebar";

const App = () => {
  return (
    <div className="overflow-hidden">
      <ThemeProvider>
        <Navbar/>
        <AppSidebar/>
        <MainRoutes />
      </ThemeProvider>
    </div>
  );
};

export default App;
