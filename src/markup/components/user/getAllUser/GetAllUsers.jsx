import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../service/user.service";
import ContentLeft from "../../main-content/ContentLeft";
import ContentRight from "../../main-content/ContentRight";
import Pagination from "../../pagination/Pagination";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userPerPage = 12;
  const [usersToDisplay, setUsersToDisplay] = useState([]); // State for displayed questions

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      getAllUsers(token).then((res) => {
        const allUser = res.data;
        setUsers(allUser);
        setTotalPages(Math.ceil(allUser.length / userPerPage));
        updateDisplayedQuestions(allUser); // Update display on initial load
      });
    } catch (error) {
      console.log("Error fetching all users: ", error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // New useEffect to update displayed questions
    updateDisplayedQuestions(users); // Update when questions or currentPage changes
  }, [users, currentPage]);

  const updateDisplayedQuestions = (allQuestions) => {
    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = Math.min(startIndex + userPerPage, allQuestions.length);
    const displayedQuestions = allQuestions.slice(startIndex, endIndex);
    setUsersToDisplay(displayedQuestions);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="main-content-area container py-16">
        <div className="row">
          <ContentLeft />
          <div className="col-lg">
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
                  {usersToDisplay?.map((user) => (
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
                            className="text-black"
                          >
                            <FaTrash />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
          {isLargeScreen && <ContentRight />}
        </div>
      </div>
    </>
  );
};

export default GetAllUsers;
