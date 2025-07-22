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
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const usersPerPage = 12;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getAllUsers(token);
        const allUsers = res.data || [];
        setUsers(allUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const term = searchQuery.toLowerCase();
      return (
        user.first_name?.toLowerCase().includes(term) ||
        user.last_name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term) ||
        user.username?.toLowerCase().includes(term)
      );
    });
    const start = (currentPage - 1) * usersPerPage;
    setUsersToDisplay(filtered.slice(start, start + usersPerPage));
  }, [users, currentPage, searchQuery]);

  useEffect(() => {
    const resizeHandler = () => setIsLargeScreen(window.innerWidth > 992);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="main-content-area container py-16">
      <div className="row">
        <ContentLeft />
        <div className="col-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            All Registered Users
          </h1>
          <SearchBar onSearch={setSearchQuery} pageType="users" />

          <div className="overflow-x-auto">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Class ID</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {usersToDisplay.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  usersToDisplay.map((user) => (
                    <tr key={user.user_id}>
                      <td>{user.user_id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.class_id}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link
                          to={`/user/${user.user_id}/delete`}
                          className="text-black hover:text-red-500"
                        >
                          <FaTrash />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(
                users.filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ).length / usersPerPage
              )}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        {isLargeScreen && <ContentRight />}
      </div>
    </div>
  );
};

export default GetAllUsers;
