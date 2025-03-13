import { useEffect, useState } from "react";
import ContentLeft from "../../main-content/ContentLeft";
import {
  getSingleUser,
  totalUserAnswer,
  totalUserQuestion,
} from "../../../../service/user.service";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";
import { FaUser } from "react-icons/fa6";

const UserProfile = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userQuestionLength, setUserQuestionLength] = useState(null);
  const [userAnswerLength, setUserAnswerLength] = useState(null);

  // Fetch user data on component mount or token change
  useEffect(() => {
    if (token) {
      try {
        const user_id = jwtDecode(token).user_id;
        getSingleUser(user_id, token).then((res) => {
          setUser(res.data.data);
          setIsLoggedIn(true);
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [token]);

  // Fetch user's total questions
  useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        if (token) {
          const user_id = jwtDecode(token).user_id;
          const res = await totalUserQuestion(user_id, token);
          setUserQuestionLength(res.data.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching user questions:", error);
      }
    };

    fetchUserQuestions();
  }, [token]);

  // Fetch user's total answers
  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        if (token) {
          const user_id = jwtDecode(token).user_id;
          const res = await totalUserAnswer(user_id, token);
          setUserAnswerLength(res.data.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching user answers:", error);
      }
    };

    fetchUserAnswers();
  }, [token]);

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
    <>
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            {!isLargeScreen && <ContentLeft />}
            <ContentLeft />
            <div className="col-lg">
              {!isLoggedIn ? (
                <div>
                  <div className="alert alert-danger">
                    You are not logged in
                  </div>

                  <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
                    <p className="text-lg text-gray-800 mb-8">
                      Please login to access your profile and explore the page
                    </p>

                    <Link to="/login">
                      <div className="text-blue-500 text-base no-underline hover:text-blue-700 transition duration-300">
                        Click to login
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="user-profile-area">
                  <div className="profile-content d-flex justify-content-between align-items-center">
                    <div className="justify-center gap-4 profile-img flex py-4">
                      <span className="align-self-center border border-2 border-primary rounded-circle p-4 shadow-sm">
                        <FaUser size={50} color="#000" />
                      </span>
                      <span>
                        <h3 className="text-3xl font-bold text-gray-800">
                          {user.first_name} {user.last_name}
                        </h3>
                        <span className="text-gray-600">
                          Member since{" "}
                          {new Date(user.created_at).toDateString()}
                        </span>
                        <div className="edit-btn mt-3">
                          <Link
                            to={`/user/${user.user_id}/update`}
                            className="default-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                          >
                            Edit profile
                          </Link>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="profile-achive mt-8">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6">
                        <div className="single-achive bg-white p-6 rounded-lg shadow-md text-center">
                          <h2 className="text-4xl font-bold text-gray-800">
                            {userAnswerLength}
                          </h2>
                          <span className="text-gray-600">Answers</span>
                        </div>
                      </div>

                      <div className="col-xl-3 col-sm-6">
                        <div className="single-achive bg-white p-6 rounded-lg shadow-md text-center">
                          <h2 className="text-4xl font-bold text-gray-800">
                            {userQuestionLength}
                          </h2>
                          <span className="text-gray-600">Questions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
