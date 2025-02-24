import { useEffect, useState } from "react";
import { getAnswersByQuestionIdService } from "../../../service/answer.service";
import { useParams } from "react-router";
import { useUser } from "../../../context/UserProvider";
import { getSingleQuestionService } from "../../../service/question.service";

const GetAnswerByQuestionId = () => {
  const [answers, setAnswers] = useState([]);
  const { users, fetchUser } = useUser();
  const { question_id } = useParams();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);

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
      console.error("Error fetching answers:", error);
    }
  };
  fetchQuestion();

  return (
    <div className="p-4">
      <div className="mb-6 p-4 bg-white shadow rounded">
        <div className="text-xl font-bold mb-2">{questions.title}</div>
        <div className="text-gray-700 mb-2">{questions.description}</div>
        <div className="text-sm text-gray-500 mb-2">{questions.tags}</div>
        <div className="text-sm text-gray-500 mb-2">
          {new Date(questions.created_at).toLocaleDateString()}
        </div>
        <div className="text-sm text-gray-500">{questions.class_id}</div>
      </div>
      <div>
        {answers?.map((answer) => (
          <div
            key={answer.answer_id}
            className="mb-4 p-4 bg-white shadow rounded"
          >
            <div className="text-gray-700 mb-2">{answer.answer_text}</div>
            <div className="text-sm text-gray-500 mb-2">
              {new Date(answer.created_at).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              Answered by: {users[answer.user_id] || "Loading..."}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAnswerByQuestionId;
