import { useEffect, useState } from "react";
import { getAllQuestionService } from "../../../service/question.service";
import { Link } from "react-router-dom";
import ContentLeft from "../main-content/ContentLeft";
import ContentRight from "../main-content/ContentRight";
import Pagination from "../pagination/Pagination";
import SearchBar from "../searchService/SearchBar";

const GetAllQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 10;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);
  const [filteredQuestion, setFilteredQuestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch all questions on component mount
  useEffect(() => {
    getAllQuestionService(token)
      .then((res) => {
        const allQuestions = res.response.data.data;
        setQuestions(allQuestions);
        setFilteredQuestion(allQuestions); // Initialize filtered questions
        setIsLoggedIn(true);
        setTotalPages(Math.ceil(allQuestions.length / questionsPerPage));
        updateDisplayedQuestions(allQuestions); // Update display on initial load
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [token]);

  // Filter questions based on search query
  useEffect(() => {
    const filtered = questions.filter((question) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        question.title.toLowerCase().includes(searchTerm) ||
        question.description.toLowerCase().includes(searchTerm) ||
        (question.tags && question.tags.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredQuestion(filtered); // Update filtered questions
    setTotalPages(Math.ceil(filtered.length / questionsPerPage)); // Update total pages
    setCurrentPage(1); // Reset to the first page when searching
  }, [searchQuery, questions]);

  // Handle search term changes
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update displayed questions when filteredQuestion or currentPage changes
  useEffect(() => {
    updateDisplayedQuestions(filteredQuestion);
  }, [filteredQuestion, currentPage]);

  // Function to update displayed questions based on pagination
  const updateDisplayedQuestions = (allQuestions) => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      allQuestions.length
    );
    const displayedQuestions = allQuestions.slice(startIndex, endIndex);
    setQuestionsToDisplay(displayedQuestions);
  };

  // Handle page change in pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="main-content-area ptb-100 overflow-auto">
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

                {/* Search Bar */}
                <div className="mb-4">
                  <SearchBar onSearch={handleSearch} pageType="questions" />
                </div>

                {/* Questions Table */}
                <div>
                  {filteredQuestion.length === 0 ? (
                    !isLoggedIn ? (
                      <p className="text-danger px-2">
                        you need to{" "}
                        <span className="text-blue-300">
                          <Link to={"/login"} className="text-blue-300">
                            login
                          </Link>
                        </span>{" "}
                        first
                      </p>
                    ) : (
                      <p>No questions found.</p>
                    )
                  ) : (
                    <table className="table table-striped border table-hover table-responsive table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Q_ID</th>
                          <th>Title</th>
                          <th>Details</th>
                          <th>Tags</th>
                          <th>View</th>
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
                                to={`/questions/${question.question_id}/answers`}
                              >
                                Answer
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
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
