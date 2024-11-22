import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
