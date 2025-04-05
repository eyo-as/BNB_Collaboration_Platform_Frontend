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
  const [message, setMessage] = useState({ text: "", isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const user_id = jwtDecode(token).user_id;
          const response = await getSingleUser(user_id, token);

          if (response.success) {
            setUser(response.data.data);
          } else {
            setMessage({
              text: "Failed to load user data",
              isError: true,
            });
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setMessage({
            text: "Error loading profile",
            isError: true,
          });
        }
      }
    };

    fetchUserData();
  }, [token]);

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (message.text) {
        setMessage({ text: "", isError: false });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await updateUser(user.user_id, user, token);

      if (result.success) {
        setMessage({
          text: result?.data?.data?.message || "Profile updated successfully!",
          isError: false,
        });
        setTimeout(() => navigate("/user-profile"), 2000);
      } else {
        setMessage({
          text: result?.error?.message || "Update failed. Please try again.",
          isError: true,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        text: "An unexpected error occurred",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive layout effect
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
        {/* Mobile sidebar */}
        {!isLargeScreen && (
          <div className="container row">
            <ContentLeft />
          </div>
        )}

        {/* Main form */}
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <p className="mb-4">Update your profile information below:</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status message */}
          {message?.text && (
            <div
              className={`p-3 rounded-md ${
                message.isError
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Username field */}
          <div className="flex flex-col ">
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
              minLength={3}
            />
          </div>

          {/* Email field */}
          <div className="flex flex-col ">
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

          {/* First Name field */}
          <div className="flex flex-col ">
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

          {/* Last Name field */}
          <div className="flex flex-col ">
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

          {/* Read-only Role field */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={user.role}
              readOnly
              className="p-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          {/* Conditional Class ID field */}
          {user.role === "student" && (
            <div className="flex flex-col ">
              <label className="text-sm font-medium text-gray-700">
                Class ID
              </label>
              <input
                type="text"
                name="class_id"
                value={user.class_id}
                readOnly
                className="p-2 bg-gray-100 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md shadow-sm transition-colors ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
