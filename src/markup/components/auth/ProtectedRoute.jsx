import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getAuth from "../../../util/auth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ roles, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const loggedInUser = getAuth();

    loggedInUser.then((res) => {
      if (res.role) {
        setIsLoggedIn(true);

        // Check if the user's role is included in the allowed roles
        if (roles && roles.includes(res.role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);

  if (isChecked) {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

ProtectedRoute.propTypes = {
  roles: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
