import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="absolute top-[50%] left-[50%] -translate-[50%]">
      <DotLottieReact
        src="../../public/Loading.lottie"
        autoplay
        loop
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoutes;