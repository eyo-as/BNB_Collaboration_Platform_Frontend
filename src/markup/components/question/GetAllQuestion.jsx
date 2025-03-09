import { useEffect, useState } from "react";
import { getAllQuestionService } from "../../../service/question.service";
import { Link } from "react-router-dom";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import Pagination from "../pagination/Pagination";

const GetAllQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 10;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);

  useEffect(() => {
    getAllQuestionService(token)
      .then((res) => {
        const allQuestions = res.response.data.data;
        setQuestions(allQuestions);
        setTotalPages(Math.ceil(allQuestions.length / questionsPerPage));
        updateDisplayedQuestions(allQuestions); // Update display on initial load
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
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

  useEffect(() => {
    // Update displayed questions when questions or currentPage changes
    updateDisplayedQuestions(questions);
  }, [questions, currentPage]);

  const updateDisplayedQuestions = (allQuestions) => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      allQuestions.length
    );
    const displayedQuestions = allQuestions.slice(startIndex, endIndex);
    setQuestionsToDisplay(displayedQuestions);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            <ContentLeft />
            <div className="col-lg">
              <div className="middull-content">
                {/* Descriptive Text */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Here is a List of All Questions
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Browse through the list of questions posted by students and
                    educators. You can view each question in detail or
                    contribute by adding your own answers.
                  </p>
                  <p className="text-gray-600">
                    If you do not find what you are looking for, feel free to{" "}
                    <Link
                      to="/ask-question"
                      className="text-blue-500 hover:underline"
                    >
                      ask a new question
                    </Link>
                    .
                  </p>
                </div>

                {/* Questions Table */}
                <div>
                  <table className="table table-striped border table-hover table-responsive table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Q_ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>View Question</th>
                        <th>Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionsToDisplay?.map((question) => (
                        <tr key={question.question_id}>
                          <td>{question.question_id}</td>
                          <td>{question.title}</td>
                          <td>{question.description}</td>
                          <td>{question.tags}</td>
                          <td>
                            <Link to={`/questions/${question.question_id}`}>
                              View Question
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/questions/${question.question_id}/answer`}
                            >
                              Answer
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>

                {/* Additional Information for Students */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Need Help with Your Studies?
                  </h2>
                  <p className="text-gray-600 mb-4">
                    If you are struggling with a particular topic or concept, do
                    not hesitate to ask for help. Our community is here to
                    support you in your learning journey.
                  </p>
                </div>
              </div>
            </div>
            {isLargeScreen && <ContentRight />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllQuestion;
