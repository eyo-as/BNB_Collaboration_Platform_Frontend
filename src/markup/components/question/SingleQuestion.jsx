import { useEffect, useState } from "react";
import { getSingleQuestionService } from "../../../service/question.service";
import { useParams } from "react-router";
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
      .catch();
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
    <div className="main-content-area ptb-100">
      <div className="container">
        <div className="row">
          <ContentLeft />
          {/* Main content of the single user page */}
          <div className="col-lg">
            <div className="middul-content">
              <h1>Hello WOrld!</h1>
              <div>
                <p>{question?.title}</p>
                <p>{question?.description}</p>
                <p>{question?.tags}</p>
                <button>{question?.upvotes}</button>
                <button>{question?.downvotes}</button>
              </div>
            </div>
          </div>
          {isLargeScreen && <ContentRight />}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
