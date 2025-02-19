import { useEffect, useRef, useState } from "react";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import { useNavigate, useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import { createAnswerService } from "../../../service/answer.service";

const CreateAnswerComp = () => {
  const [message, setMessage] = useState("");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

  const { question_id } = useParams();

  const answerDom = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated");
      return;
    }
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    const answerData = {
      answer_text: answerDom.current.value,
      user_id: user_id,
      question_id: question_id,
    };

    try {
      const response = await createAnswerService(answerData, token);

      if (response.success) {
        setMessage(response.data.message + " redirect...");
        answerDom.current.value = "";
        setTimeout(() => {
          navigate("/questions");
        }, 2000);
      } else {
        setMessage(response.message.response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred while posting the question");
      console.error(error);
    }
  };

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

            {/* Main content of the ask question page */}
            <div className="col-lg">
              <div className="middull-content">
                <form className="your-answer-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h3>Create Your Answer</h3>
                  </div>
                  <p
                    className={
                      message.includes("success")
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {message}
                  </p>
                  <div className="form-group">
                    <input
                      type="text"
                      ref={answerDom}
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="default-btn">
                      Post Your Answer
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {isLargeScreen && <ContentRight />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnswerComp;
