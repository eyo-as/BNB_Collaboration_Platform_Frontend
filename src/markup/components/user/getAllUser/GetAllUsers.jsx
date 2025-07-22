import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../service/user.service";
import ContentLeft from "../../main-content/ContentLeft";
import ContentRight from "../../main-content/ContentRight";
import Pagination from "../../pagination/Pagination";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SearchBar from "../../searchService/SearchBar";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userPerPage = 12;
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users on component mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      getAllUsers(token).then((res) => {
        const allUsers = res.data;
        setUsers(allUsers);
        setTotalPages(Math.ceil(allUsers.length / userPerPage));
        updateDisplayedUsers(allUsers); // Update display on initial load
      });
    } catch (error) {
      console.log("Error fetching all users: ", error);
    }
  }, []);

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

  // Update displayed users when users, currentPage, or searchQuery changes
  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchTerm) ||
        user.last_name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
      );
    });

    setTotalPages(Math.ceil(filteredUsers.length / userPerPage));
    updateDisplayedUsers(filteredUsers);
  }, [users, currentPage, searchQuery]);

  // Update the displayed users based on pagination
  const updateDisplayedUsers = (filteredUsers) => {
    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = Math.min(startIndex + userPerPage, filteredUsers.length);
    const displayedUsers = filteredUsers.slice(startIndex, endIndex);
    setUsersToDisplay(displayedUsers);
  };

  // Handle page change in pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search query change
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="main-content-area container py-16">
      <div className="row">
        <ContentLeft />
        <div className="col-lg">
          {/* Descriptive Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Here is a List of All Users
            </h1>
            <p className="text-gray-600 mb-4">
              This page displays all registered users on the platform. You can
              view their details, or delete users if necessary.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} pageType="users" />
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="bg-white border border-gray-300 table table-striped border table-hover table-responsive table-bordered table-striped">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2">User ID</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Class ID</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {usersToDisplay?.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  usersToDisplay?.map((user) => (
                    <tr key={user.user_id} className="hover:bg-gray-50">
                      <td className="py-2">{user.user_id}</td>
                      <td className="py-2">{user.username}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{user.class_id}</td>
                      <td className="py-2">{user.role}</td>
                      <td className="py-2 flex justify-center gap-2">
                        <span>
                          <Link
                            to={`/user/${user.user_id}/delete`}
                            className="text-black hover:text-red-500"
                          >
                            <FaTrash />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          {/* Additional Information for Admins */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Managing Users
            </h2>
            <p className="text-gray-600 mb-4">
              As an admin, you have the ability to manage all user accounts.
              This includes deleting accounts, and monitoring user activity.
            </p>
          </div>
        </div>
        {isLargeScreen && <ContentRight />}
      </div>
    </div>
  );
};

export default GetAllUsers;
