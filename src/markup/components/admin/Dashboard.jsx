import { useEffect, useState } from "react";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import { FaUsers, FaQuestionCircle, FaReply } from "react-icons/fa";
import { getAllUsers, getSingleUser } from "../../../service/user.service";
import { getAllQuestionService } from "../../../service/question.service";
import { getAllAnswersService } from "../../../service/answer.service";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [latestUser, setLatestUser] = useState({});
  const [latestQuestion, setLatestQuestion] = useState({});
  const [latestAnswer, setLatestAnswer] = useState({});

  const [userLength, setUserLength] = useState(0);
  const [questionLength, setQuestionLength] = useState(0);
  const [answerLength, setAnswerLength] = useState(0);

  const token = localStorage.getItem("token");

  // Utility function to calculate "time ago"
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const createdDate = new Date(timestamp);
    const seconds = Math.floor((now - createdDate) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    return `${Math.floor(seconds)} seconds ago`;
  };

  // Fetch user
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      const user_id = decoded?.user_id;
      getSingleUser(user_id, token).then((res) => {
        const user = res?.data?.data;
        setUser(user);
      });
    } catch (error) {
      console.log("Error fetching user", error);
    }
  }, [token]);

  // Fetch user length and latest joined user
  useEffect(() => {
    try {
      getAllUsers(token).then((res) => {
        const userLength = res?.data?.length;
        setUserLength(userLength);

        const latestUser = res?.data.at(-1);
        setLatestUser(latestUser);
      });
    } catch (error) {
      console.log("Error fetching user", error);
    }
  }, [token]);

  // Fetch question length and latest question
  useEffect(() => {
    try {
      getAllQuestionService(token).then((res) => {
        const questionLength = res?.response?.data?.data?.length;
        setQuestionLength(questionLength);

        const latestQuestion = res?.response?.data?.data.at(-1);
        setLatestQuestion(latestQuestion);
      });
    } catch (error) {
      console.log("Error fetching questions", error);
    }
  }, [token]);

  // Fetch answer length and latest answer
  useEffect(() => {
    try {
      getAllAnswersService(token).then((res) => {
        const answerLength = res?.data?.data?.length;
        setAnswerLength(answerLength);

        const latestAnswer = res?.data?.data?.at(-1);
        setLatestAnswer(latestAnswer);
      });
    } catch (error) {
      console.log("Error fetching answers", error);
    }
  }, [token]);

  return (
    <div className="main-content-area container py-18">
      <div className="row">
        <ContentLeft />
        <div className="col-lg overflow-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back,{" "}
              <span className="text-black">{user?.username}!</span>
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="gap-8 flex justify-center">
            {/* Total Users Card */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaUsers className="text-blue-500 text-2xl" />
                </div>
                <div className="ml-4 py-12">
                  <h2 className="text-xl font-bold text-gray-800">
                    {userLength}
                  </h2>
                  <p className="text-gray-600">Total Users</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {/* Total Questions Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaQuestionCircle className="text-green-500 text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {questionLength}
                    </h2>
                    <p className="text-gray-600">Total Questions</p>
                  </div>
                </div>
              </div>

              {/* Total Answers Card */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaReply className="text-purple-500 text-2xl" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {answerLength}
                    </h2>
                    <p className="text-gray-600">Total Answers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div>
              {/* Latest User Activity */}
              {latestUser && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    New user{" "}
                    <span className="font-semibold text-blue-500">
                      {latestUser.username}
                    </span>{" "}
                    joined the platform.
                  </p>
                  <span className="text-sm text-gray-500">
                    {latestUser.created_at
                      ? getTimeAgo(latestUser.created_at)
                      : "N/A"}
                  </span>
                </div>
              )}

              {/* Latest Question Activity */}
              {latestQuestion && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    New question{" "}
                    <span className="font-semibold text-green-500">
                      {latestQuestion.title}
                    </span>{" "}
                    was posted.
                  </p>
                  <span className="text-sm text-gray-500">
                    {latestQuestion.created_at
                      ? getTimeAgo(latestQuestion.created_at)
                      : "N/A"}
                  </span>
                </div>
              )}

              {/* Latest Answer Activity */}
              {latestAnswer && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    New answer added to question{" "}
                    <span className="font-semibold text-purple-500">
                      #{latestAnswer.question_id}
                    </span>
                    .
                  </p>
                  <span className="text-sm text-gray-500">
                    {latestAnswer.created_at
                      ? getTimeAgo(latestAnswer.created_at)
                      : "N/A"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* See All Users Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              See All Users
            </h2>
            <Link
              to={"/users"}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              View Users
            </Link>
          </div>

          {/* See All Questions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              See All Questions
            </h2>
            <Link
              to={"/questions"}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              View Questions
            </Link>
          </div>
        </div>
        <ContentRight />
      </div>
    </div>
  );
};

export default Dashboard;
