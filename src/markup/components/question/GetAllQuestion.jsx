import { useEffect, useState } from "react";
import { getAllQuestionService } from "../../../service/question.service";
import { Link } from "react-router-dom";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";

const GetAllQuestion = () => {
  const [questions, setQuestions] = useState([]);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllQuestionService(token)
      .then((res) => {
        setQuestions(res.response.data.data);
      })
      .catch();
  }, [token]);

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
    <div>
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            <ContentLeft />
            {/* Main content of the get all question page */}
            <div className="col-lg">
              <div className="middull-content">
                <div>
                  {questions?.map((questions) => {
                    return (
                      <div key={questions.question_id}>
                        <div>
                          <ul className="flex">
                            <li>{questions.title}</li>
                            <li>{questions.description}</li>
                            <li>{questions.tags}</li>
                            <button>{questions.upvotes}</button>
                            <button>{questions.downvotes}</button>
                            <Link to={`/questions/${questions.question_id}`}>
                              View Question
                            </Link>
                            <Link
                              to={`/questions/${questions.question_id}/answers`}
                              className="bg-blue-500"
                            >
                              Answer
                            </Link>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {isLargeScreen && <ContentRight />}
          </div>
        </div>
        <h1>Hello world!</h1>
      </div>
    </div>
  );
};

export default GetAllQuestion;
