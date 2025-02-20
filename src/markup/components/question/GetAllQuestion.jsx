import { useEffect, useState } from "react";
import { getAllQuestionService } from "../../../service/question.service";
import { Link } from "react-router-dom";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import Pagination from "../pagination/Pagation";

const GetAllQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 10;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]); // State for displayed questions

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // New useEffect to update displayed questions
    updateDisplayedQuestions(questions); // Update when questions or currentPage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div>
                  <caption className="whitespace-nowrap text-xl font-bold ">
                    List of Questions
                  </caption>
                  <table className="table table-striped border table-hover table-responsive table-bordered table-striped ">
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
                      {questionsToDisplay.map(
                        (
                          question // Use questionsToDisplay here
                        ) => (
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
                                to={`/questions/${question.question_id}/answers`}
                              >
                                Answer
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
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
