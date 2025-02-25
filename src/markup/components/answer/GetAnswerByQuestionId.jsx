import { useEffect, useState } from "react";
import { getAnswersByQuestionIdService } from "../../../service/answer.service";
import { useParams } from "react-router";
import { useUser } from "../../../context/UserProvider";
import { getSingleQuestionService } from "../../../service/question.service";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import CreateAnswer from "../../pages/answer/CreateAnswer";

const GetAnswerByQuestionId = () => {
  const [answers, setAnswers] = useState([]);
  const { users, fetchUser } = useUser();
  const { question_id } = useParams();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await getAnswersByQuestionIdService(question_id, token);
        setAnswers(res.data.data);

        // Fetch users for all answers
        res.data.data.forEach((answer) => {
          if (!users[answer.user_id]) {
            fetchUser(answer.user_id);
          }
        });
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, [fetchUser, question_id, token, users]);

  const fetchQuestion = async () => {
    try {
      const response = await getSingleQuestionService(question_id, token);
      setQuestions(response.response.data.data);
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
  fetchQuestion();

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
    <div className="main-container-area ptb-100">
      <div className="container">
        <div className="row">
          <ContentLeft />
          <div className="col-lg">
            <div className="p-4">
              <div className="mb-6 p-4 bg-white shadow rounded">
                <div className="text-xl font-bold text-black mb-2">
                  {}
                  Question title:{" "}
                  <span className="text-gray-800">{questions.title}</span>
                </div>
                <div className="text-black mb-2">
                  Description: {}
                  <span className="text-gray-900">{questions.description}</span>
                </div>
                <div className="text-sm text-black mb-2">
                  Tags: {}
                  <span className="text-gray-600">{questions.tags}</span>
                </div>
                <div className="text-sm text-black mb-2">
                  Created at: {}
                  <span className="text-gray-600">
                    {new Date(questions.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-black">
                  Class ID: {}
                  <span className="text-gray-600">{questions.class_id}</span>
                </div>
              </div>
              <div>
                <div className="text-black text-2xl mb-2 px-4 taxt-center">
                  Answer from the other students
                </div>
                {answers?.length !== 0 ? (
                  <div>
                    {answers?.map((answer) => (
                      <div
                        key={answer.answer_id}
                        className="mb-4 p-4 bg-white shadow rounded"
                      >
                        <div className="text-black mb-2">
                          Answer: {}
                          <span className="text-gray-900">
                            {answer.answer_text}
                          </span>
                        </div>
                        <div className="text-sm text-black mb-2">
                          Created at: {}
                          <span className="text-gray-600">
                            {new Date(answer.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-black">
                          Answered by:{" "}
                          <span className="text-gray-600">
                            {users[answer.user_id] || "Loading..."}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-black text-center my-4">
                    No answers found for this question
                  </div>
                )}
              </div>
            </div>
          </div>
          {isLargeScreen && <ContentRight />}
        </div>
        <div>
          <CreateAnswer />
        </div>
      </div>
    </div>
  );
};

export default GetAnswerByQuestionId;
