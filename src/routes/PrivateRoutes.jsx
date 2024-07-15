import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <HashLoader size={100} color="#36d7b7" />
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/login"} />;
};

export default PrivateRoutes;
