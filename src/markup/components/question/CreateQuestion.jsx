import { useEffect, useRef, useState } from "react";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import { createQuestionService } from "../../../service/question.service";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router";

const CreateQuestion = () => {
  const [message, setMessage] = useState("");
  const [userClassId, setUserClassId] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const titleDom = useRef(null);
  const descriptionDom = useRef(null);
  const tagsDom = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserClassId(decoded.class_id);
        setIsLoggedIn(true);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated");
      return;
    }

    const questionData = {
      class_id: userClassId,
      title: titleDom.current.value.trim(),
      description: descriptionDom.current.value.trim(),
      tags: tagsDom.current.value.trim(),
    };

    if (
      !questionData.class_id ||
      !questionData.title ||
      !questionData.description
    ) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await createQuestionService(questionData, token);
      if (response.success) {
        setMessage("Question created successfully!");
        titleDom.current.value = "";
        descriptionDom.current.value = "";
        tagsDom.current.value = "";

        setTimeout(() => {
          navigate("/questions");
        }, 2000);
      } else {
        setMessage(response.message || "Failed to create question");
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
            <div className="col-lg-6">
              <div className="middull-content">
                <form className="your-answer-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <h3>Create a Question</h3>
                  </div>

                  {!isLoggedIn && (
                    <p className="text-danger">
                      You need to login to post a question.{" "}
                      <Link to={"/login"}>
                        <span className="text-blue-300">Login Here</span>
                      </Link>
                    </p>
                  )}
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
                      ref={titleDom}
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      ref={descriptionDom}
                      className="form-control"
                      placeholder="Description"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      ref={tagsDom}
                      className="form-control"
                      placeholder="Tags (comma-separated)"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={`${userClassId} (your class Id)`}
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="default-btn">
                      Post Your Question
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

export default CreateQuestion;
