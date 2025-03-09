import { useEffect, useState } from "react";
import { deleteUser, getSingleUser } from "../../../../service/user.service";
import { useNavigate, useParams } from "react-router";
import ContentLeft from "../../main-content/ContentLeft";
import ContentRight from "../../main-content/ContentRight";

const Delete = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  const token = localStorage.getItem("token");

  useEffect(() => {
    try {
      getSingleUser(user_id, token).then((res) => {
        setUser(res.data.data);
      });
    } catch (error) {
      console.log("Error fetching user: ", error);
    }
  }, [user_id, token]);

  const handleDelete = async () => {
    try {
      const response = await deleteUser(user_id, token);
      if (response) {
        setMessage("User deleted successfully");
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      }
    } catch (error) {
      console.log("Error deleting user: ", error);
      setMessage("Failed to delete user");
    }
  };

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
    <div className="main-content-area container ptb-100">
      <div className="row">
        <ContentLeft />
        <div className="col-lg">
          <div className="min-h-screen">
            {/* Message Display */}
            {message && (
              <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                <p>{message}</p>
              </div>
            )}

            {/* User Details Card */}
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  User Details
                </h2>
                <div className="space-y-4">
                  {/* Side-by-Side Layout for Labels and Values */}
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      User ID
                    </label>
                    <p className="w-2/3 text-gray-900">{user.user_id}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      First Name
                    </label>
                    <p className="w-2/3 text-gray-900">{user.first_name}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      Last Name
                    </label>
                    <p className="w-2/3 text-gray-900">{user.last_name}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      Username
                    </label>
                    <p className="w-2/3 text-gray-900">{user.username}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <p className="w-2/3 text-gray-900">{user.email}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      Class ID
                    </label>
                    <p className="w-2/3 text-gray-900">{user.class_id}</p>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-gray-600">
                      Role
                    </label>
                    <p className="w-2/3 text-gray-900">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <div className="p-6 bg-gray-50">
                <button
                  onClick={() => setIsConfirmOpen(true)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete User
                </button>
              </div>
            </div>

            {/* Confirmation Dialog */}
            {isConfirmOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Are you sure?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    This action cannot be undone. The user will be permanently
                    deleted.
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setIsConfirmOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {isLargeScreen && <ContentRight />}
      </div>
    </div>
  );
};

export default Delete;
