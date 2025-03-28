import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getSingleUser, updateUser } from "../../../../service/user.service";
import { useNavigate } from "react-router";
import ContentLeft from "../../main-content/ContentLeft";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateUser = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    class_id: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    if (token) {
      try {
        const user_id = jwtDecode(token).user_id;
        getSingleUser(user_id, token).then((res) => {
          setUser({
            ...res.data.data,
            password: "", // Don't display hashed password
          });
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error loading user data");
      }
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Prepare update data
      const updateData = {
        ...user,
        currentPassword: user.password ? currentPassword : undefined,
        password: user.password || undefined,
      };

      await updateUser(user.user_id, updateData, token);
      setMessage("User updated successfully");

      setTimeout(() => {
        navigate("/user-profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main-content-area max-w-2xl mx-auto p-4 container">
      <div className="lg:w-[50%] mx-auto">
        <div className="container row">{!isLargeScreen && <ContentLeft />}</div>

        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <p
              className={`text-${
                message.includes("success") ? "green" : "red"
              }-500`}
            >
              {message}
            </p>
          )}

          {/* Username */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              New Password (leave blank to keep current)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Minimum 8 characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Current Password Verification */}
          {user.password && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Current Password (for verification)
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          )}

          {/* First Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Role (readonly) */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={user.role}
              readOnly
              className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          {/* Class ID (conditionally shown) */}
          {user.role === "student" && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Class ID
              </label>
              <input
                type="text"
                name="class_id"
                value={user.class_id}
                readOnly
                className="p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
