import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../util/auth"; 

const ProtectedRoute = ({ roles = [], children }) => {
  const { token, user } = useAuth(); 
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
  
    setIsChecked(true);
  }, [token, user]);

  if (!isChecked) {
    return null; 
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
