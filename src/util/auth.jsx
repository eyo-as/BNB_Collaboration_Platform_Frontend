import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const value = {
    token,
    setToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
