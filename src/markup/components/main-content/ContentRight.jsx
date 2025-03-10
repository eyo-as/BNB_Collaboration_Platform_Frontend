import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../../service/user.service";
import { getAllQuestionService } from "../../../service/question.service";
import { getAllAnswersService } from "../../../service/answer.service";

const ContentRight = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [latestUser, setLatestUser] = useState(null);
  const [latestQuestion, setLatestQuestion] = useState(null);
  const [latestAnswer, setLatestAnswer] = useState(null);
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch user length and latest joined user
  useEffect(() => {
    if (!token) return; // Skip if no token

    getAllUsers(token)
      .then((res) => {
        if (res && res.data) {
          const userLength = res.data.length;
          setUserLength(userLength);

          const latestUser = res.data.at(-1);
          setLatestUser(latestUser);
        }
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, [token]);

  // Fetch question length and latest question
  useEffect(() => {
    if (!token) return; // Skip if no token

    getAllQuestionService(token)
      .then((res) => {
        if (
          res &&
          res.response &&
          res.response.data &&
          res.response.data.data
        ) {
          const questionLength = res.response.data.data.length;
          setQuestionLength(questionLength);

          const latestQuestion = res.response.data.data.at(-1);
          setLatestQuestion(latestQuestion);
        }
      })
      .catch((error) => {
        console.log("Error fetching questions:", error);
      });
  }, [token]);

  // Fetch answer length and latest answer
  useEffect(() => {
    if (!token) return; // Skip if no token

    getAllAnswersService(token)
      .then((res) => {
        if (res && res.data && res.data.data) {
          const answerLength = res.data.data.length;
          setAnswerLength(answerLength);

          const latestAnswer = res.data.data.at(-1);
          setLatestAnswer(latestAnswer);
        }
      })
      .catch((error) => {
        console.log("Error fetching answers:", error);
      });
  }, [token]);

  return (
    <>
      <div className="col-lg-3">
        <div className="right-siderbar">
          <div className="right-siderbar-common">
            {isLoggedIn ? (
              <Link to={"/ask-question"} className="default-btn">
                Ask Question
              </Link>
            ) : (
              <Link to={"/login"} className="default-btn">
                Login to Ask Question
              </Link>
            )}
          </div>

          <div className="right-siderbar-common">
            <div className="discussions">
              <h3>
                <i className="ri-speaker-line"></i>
                Top Quotes
              </h3>

              <ul>
                <li>
                  <a href="most-answered.html">
                    {
                      '"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela'
                    }
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    {
                      '"The function of education is to teach one to think intensively and to think critically." - Martin Luther King Jr.'
                    }
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    {
                      '"The beautiful thing about learning is that no one can take it away from you." - B.B. King'
                    }
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    {
                      '"Live as if you were to die tomorrow. Learn as if you were to live forever." - Mahatma Gandhi'
                    }
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    {
                      '"The important thing is not to stop questioning. Curiosity has its own reason for existing." - Albert Einstein'
                    }
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            {token && (
              <div>
                <div className="right-siderbar-common">
                  <div className="answer-count">
                    <ul className="d-flex flex-wrap">
                      <li>
                        <span>Users</span>
                        <span className="count">{userLength}</span>
                      </li>
                      <li>
                        <span>Questions</span>
                        <span className="count">{questionLength}</span>
                      </li>
                      <li>
                        <span>Answers</span>
                        <span className="count">{answerLength}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="right-siderbar-common">
                  <div className="recent-post">
                    <h3>
                      <i className="ri-discuss-line"></i>
                      Recent Actions
                    </h3>

                    <ul>
                      <li>
                        {latestUser && (
                          <div className="items-center justify-between bg-gray-50 rounded-lg">
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
                      </li>
                      <li>
                        {latestQuestion && (
                          <div className="items-center justify-between bg-gray-50 rounded-lg">
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
                      </li>
                      <li>
                        {latestAnswer && (
                          <div className="items-center justify-between bg-gray-50 rounded-lg">
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
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentRight;
