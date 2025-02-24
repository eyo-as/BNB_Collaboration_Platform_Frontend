import { createContext, useContext, useState } from "react";
import { getSingleUser } from "../service/user.service";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Accept `children` as a prop
  const [users, setUsers] = useState({});
  const token = localStorage.getItem("token");

  const fetchUser = async (user_id) => {
    try {
      const res = await getSingleUser(user_id, token);
      if (res.success) {
        setUsers((prev) => ({
          ...prev,
          [user_id]: res.data.data.username,
        }));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
