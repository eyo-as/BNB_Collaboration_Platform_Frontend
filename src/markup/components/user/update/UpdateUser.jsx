import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getSingleUser, updateUser } from "../../../../service/user.service";
import { useNavigate } from "react-router";
import ContentLeft from "../../main-content/ContentLeft";

const UpdateUser = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    class_id: "",
  });
  const [token] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch user data on component mount or token change
  useEffect(() => {
    if (token) {
      try {
        const user_id = jwtDecode(token).user_id;
        getSingleUser(user_id, token).then((res) => {
          setUser(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.user_id, user, token);
      setMessage("User updated successfully");

      setTimeout(() => {
        navigate("/user-profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="main-content-area max-w-2xl mx-auto p-4 container">
      <div className="lg:w-[50%] mx-auto">
        <div className="container row">{!isLargeScreen && <ContentLeft />}</div>
        <h1 className="text-2xl font-bold mb-4">Update User</h1>
        <p className="mb-4">Update your profile information below:</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-green-500">{message}</p>
          <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
            <label className="block text-sm font-medium text-gray-700">
              Role:
            </label>
            <input
              type="text"
              name="role"
              value={user.role}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly
            />
          </div>
          {user?.role === "student" && (
            <div className="flex space-x-4 items-center justify-between whitespace-nowrap">
              <label className="block text-sm font-medium text-gray-700">
                Class ID:
              </label>
              <input
                type="text"
                name="class_id"
                value={user.class_id}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
