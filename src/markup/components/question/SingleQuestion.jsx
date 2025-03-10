import { useEffect, useState } from "react";
import { getSingleQuestionService } from "../../../service/question.service";
import { Link, useParams } from "react-router";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";

const SingleQuestion = () => {
  const [question, setQuestion] = useState(null);
  const { question_id } = useParams();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getSingleQuestionService(question_id, token)
      .then((res) => {
        setQuestion(res.response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [question_id]);

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
    <div className="main-content-area py-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <ContentLeft />
          <div className="flex-1 px-4">
            <div className="middle-content">
              <div className="text-3xl font-bold text-gray-800 mb-6">
                Question Details
              </div>
              {question ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    Title:
                    <span className="font-normal"> {question.title}</span>
                  </div>
                  <div className="text-gray-700 text-lg mb-4">
                    Description:
                    <span className="font-normal"> {question.description}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    Tag:{" "}
                    <span>
                      {question.tags.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex gap-4 mb-4">
                    <button className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md hover:bg-green-200 transition duration-200">
                      <span>👍</span>
                      <span>{question.upvotes} Upvotes</span>
                    </button>
                    <button className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition duration-200">
                      <span>👎</span>
                      <span>{question.downvotes} Downvotes</span>
                    </button>
                  </div>
                  <div className="py-4">
                    <Link
                      to={`/questions/${question.question_id}/answers`}
                      className="bg-gray-300 p-2 border rounded-md hover:bg-gray-400 transition duration-200"
                    >
                      Answer
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Loading question details...</p>
              )}
            </div>
          </div>
          {isLargeScreen && <ContentRight />}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
