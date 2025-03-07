import { jwtDecode } from "jwt-decode";

const userAuth = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const user = jwtDecode(token);

    return user;
  } else {
    return {};
  }
};

export default userAuth;
