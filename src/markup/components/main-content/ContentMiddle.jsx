import { Link } from "react-router-dom";
import user1 from "../../../assets/images/user/user-1.jpg";
import { useEffect, useState } from "react";
import { getAllQuestionService } from "../../../service/question.service";
import Pagination from "../pagination/Pagination";
import { jwtDecode } from "jwt-decode";
import { getAnswersByQuestionIdService } from "../../../service/answer.service";
import { FaUser } from "react-icons/fa6";

const ContentMiddle = () => {
  const [questions, setAllQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 3;
  const [questionsToDisplay, setQuestionsToDisplay] = useState([]);
  const [answersCache, setAnswersCache] = useState({});

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  // Fetch all questions
  useEffect(() => {
    getAllQuestionService(token)
      .then((res) => {
        const allQuestions = res.response.data.data?.map((question) => ({
          ...question,
          tags: question.tags || "", // Ensure tags is at least an empty string
        }));
        setAllQuestions(allQuestions);
        setTotalPages(Math.ceil(allQuestions.length / questionsPerPage));
        updateDisplayedQuestions(allQuestions); // Update display on initial load
      })
      .catch((error) => {
        console.log("Error fetching questions:", error);
      });
  }, [token]);

  // Update displayed questions when pagination changes
  useEffect(() => {
    updateDisplayedQuestions(questions);
  }, [questions, currentPage]);

  // Helper function to update displayed questions
  const updateDisplayedQuestions = (allQuestions) => {
    const startIndex = (currentPage - 1) * questionsPerPage;
    const endIndex = Math.min(
      startIndex + questionsPerPage,
      allQuestions.length
    );
    const displayedQuestions = allQuestions.slice(startIndex, endIndex);
    setQuestionsToDisplay(displayedQuestions);

    // Pre-fetch answers for displayed questions
    displayedQuestions.forEach((question) => {
      if (!answersCache[question.question_id]) {
        fetchAnswersForQuestion(question.question_id);
      }
    });
  };

  // Fetch answers for a specific question
  const fetchAnswersForQuestion = async (questionId) => {
    try {
      const res = await getAnswersByQuestionIdService(questionId, token);
      if (res.success) {
        setAnswersCache((prev) => ({
          ...prev,
          [questionId]: res.data.data,
        }));
      }
    } catch (error) {
      console.error(
        `Error fetching answers for question ${questionId}:`,
        error
      );
    }
  };

  // Get the latest answer for a question
  const getLatestAnswer = (questionId) => {
    const answers = answersCache[questionId] || [];
    if (answers.length === 0) return null;
    return answers.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )[0];
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="col-lg-6">
        <div className="middull-content">
          <form className="aq-form">
            <i className="ri-search-line"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Have a question? Ask or enter a search"
            />
            <button className="aq-btn">Ask Question</button>
          </form>

          <ul
            className="nav nav-tabs questions-tabs d-flex justify-content-between"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="recent-questions-tab"
                data-bs-toggle="tab"
                data-bs-target="#recent-questions"
                type="button"
                role="tab"
                aria-controls="recent-questions"
                aria-selected="true"
              >
                Recent Questions
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="most-answered-tab"
                data-bs-toggle="tab"
                data-bs-target="#most-answered"
                type="button"
                role="tab"
                aria-controls="most-answered"
                aria-selected="false"
              >
                Most Answered
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="unanswered-question-tab"
                data-bs-toggle="tab"
                data-bs-target="#unanswered-question"
                type="button"
                role="tab"
                aria-controls="unanswered-question"
                aria-selected="false"
              >
                Unanswered Question
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="featured-question-tab"
                data-bs-toggle="tab"
                data-bs-target="#featured-question"
                type="button"
                role="tab"
                aria-controls="featured-question"
                aria-selected="false"
              >
                Featured Question
              </button>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            {/* Recent Questions Tab */}
            <div
              className="tab-pane fade show active"
              id="recent-questions"
              role="tabpanel"
              aria-labelledby="recent-questions-tab"
            >
              <div>
                <div>
                  {questionsToDisplay?.map((question) => {
                    const answers = answersCache[question.question_id] || [];
                    const latestAnswer = getLatestAnswer(question.question_id);
                    const answerCount = answers.length;

                    return (
                      <div key={question.question_id}>
                        <div className="single-qa-box like-dislike">
                          <div className="d-flex">
                            <div className="link-unlike flex-shrink-0">
                              <span className="md:p-0 p-2">
                                <FaUser size={35} color="#000" />
                              </span>

                              <div className="donet-like-list">
                                <button className="like-unlink-count like">
                                  <i className="ri-thumb-up-fill"></i>
                                  <span>{question.upvotes}</span>
                                </button>
                              </div>

                              <div className="donet-like-list">
                                <button className="like-unlink-count dislike">
                                  <i className="ri-thumb-down-fill"></i>
                                  <span>{question.downvotes}</span>
                                </button>
                              </div>
                            </div>

                            <div className="flex-grow-1 ms-3">
                              <ul className="graphic-design">
                                <li className="text-black">
                                  {decoded.username}
                                </li>
                                <li>
                                  <span>
                                    Latest Answer:{" "}
                                    {latestAnswer
                                      ? new Date(
                                          latestAnswer.created_at
                                        ).toLocaleDateString()
                                      : "No answers yet"}
                                  </span>
                                </li>
                                <li>
                                  <span>In:</span>
                                  {(() => {
                                    const firstTag =
                                      question.tags?.split(",")[0] || "General";
                                    return (
                                      <span className="text-orange-400 font-bold">
                                        {" "}
                                        {firstTag}
                                      </span>
                                    );
                                  })()}
                                </li>
                              </ul>

                              <h3>{question.title}</h3>

                              <p>{question.description}</p>

                              <ul className="tag-list">
                                {(question.tags?.split(",") || []).map(
                                  (tag, i) => (
                                    <li
                                      key={i}
                                      className="border p-1 rounded text-black"
                                    >
                                      {tag.trim()}
                                    </li>
                                  )
                                )}
                              </ul>

                              <div className="d-flex justify-content-between align-items-center">
                                <ul className="anser-list">
                                  <li>50 Vote</li>
                                  <li>
                                    {answerCount} Answer
                                    {answerCount !== 1 ? "s" : ""}
                                  </li>
                                  <li>658 Views</li>
                                  <li>
                                    <ul className="qa-share">
                                      <li className="share-option">
                                        <span>
                                          <i className="ri-share-fill"></i>
                                        </span>

                                        <ul className="social-icon">
                                          <li>
                                            <a
                                              href="https://www.facebook.com/"
                                              target="_blank"
                                            >
                                              <i className="ri-facebook-fill"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                            >
                                              <i className="ri-twitter-line"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.linkedin.com/"
                                              target="_blank"
                                            >
                                              <i className="ri-linkedin-fill"></i>
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                            >
                                              <i className="ri-instagram-line"></i>
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>

                                <Link
                                  to={`/questions/${question.question_id}/answers`}
                                  className="default-btn"
                                >
                                  Answer
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            {/* Most Answered Tab */}
            <div
              className="tab-pane fade"
              id="most-answered"
              role="tabpanel"
              aria-labelledby="most-answered-tab"
            >
              <div className="single-qa-box like-dislike">
                <div className="d-flex">
                  <div className="link-unlike flex-shrink-0">
                    <a href="user.html">
                      <img src={user1} alt="Image" />
                    </a>
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <ul className="graphic-design">
                      <li>
                        <a href="user.html">Teresa Klein</a>
                      </li>
                      <li>
                        <span>Latest Answer: 14 hours ago</span>
                      </li>
                      <li>
                        <span>In:</span>
                        <a href="tags.html" className="graphic">
                          Graphic design
                        </a>
                      </li>
                    </ul>

                    <h3>
                      <a href="queations-details.html">
                        If you open Illustrator by dragging the Photoshop file,
                        why it becomes a JPG file
                      </a>
                    </h3>

                    <p>
                      Sed porttitor lectus nibh. Nulla porttitor accumsan
                      tincidunt. Donec rutrum congue leo eget malesuada. Vivamus
                      magna justo, lacinia eget consectetur sed, convallis at
                      tellus rutrum congue leo eget malesuada tincidunt.
                    </p>

                    <ul className="tag-list">
                      <li>
                        <a href="tags.html">Discussion</a>
                      </li>
                      <li>
                        <a href="tags.html">Photoshop</a>
                      </li>
                      <li>
                        <a href="tags.html">Analytics</a>
                      </li>
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                      <ul className="anser-list">
                        <li>
                          <a href="polls.html"> 24 Vote </a>
                        </li>
                        <li>
                          <a href="most-answered.html"> 2 Answer </a>
                        </li>
                        <li>
                          <a href="most-visited.html"> 658 Views </a>
                        </li>
                        <li>
                          <ul className="qa-share">
                            <li className="share-option">
                              <span>
                                <i className="ri-share-fill"></i>
                              </span>

                              <ul className="social-icon">
                                <li>
                                  <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-facebook-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.twitter.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-twitter-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-linkedin-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-instagram-line"></i>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>

                      <a
                        href="most-answered.html"
                        className="default-btn bg-ea4335"
                      >
                        Question
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pagination-area">
                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-left-line"></i>
                </a>
                <span className="page-numbers current" aria-current="page">
                  1
                </span>
                <a href="all-queations.html" className="page-numbers">
                  2
                </a>
                <a href="all-queations.html" className="page-numbers">
                  3
                </a>

                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Unanswered Question Tab */}
            <div
              className="tab-pane fade"
              id="unanswered-question"
              role="tabpanel"
              aria-labelledby="unanswered-question-tab"
            >
              <div className="single-qa-box like-dislike">
                <div className="d-flex">
                  <div className="link-unlike flex-shrink-0">
                    <a href="user.html">
                      <img src={user1} alt="Image" />
                    </a>

                    <div className="donet-like-list">
                      <button className="like-unlink-count like">
                        <i className="ri-thumb-up-fill"></i>
                        <span>20</span>
                      </button>
                    </div>

                    <div className="donet-like-list">
                      <button className="like-unlink-count dislike">
                        <i className="ri-thumb-down-fill"></i>
                        <span>25</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <ul className="graphic-design">
                      <li>
                        <a href="user.html">Teresa Klein</a>
                      </li>
                      <li>
                        <span>Latest Answer: 14 hours ago</span>
                      </li>
                      <li>
                        <span>In:</span>
                        <a href="tags.html" className="graphic">
                          Graphic design
                        </a>
                      </li>
                    </ul>

                    <h3>
                      <a href="queations-details.html">
                        If you open Illustrator by dragging the Photoshop file,
                        why it becomes a JPG file
                      </a>
                    </h3>

                    <ul className="tag-list">
                      <li>
                        <a href="tags.html">Discussion</a>
                      </li>
                      <li>
                        <a href="tags.html">Photoshop</a>
                      </li>
                      <li>
                        <a href="tags.html">Analytics</a>
                      </li>
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                      <ul className="anser-list">
                        <li>
                          <a href="polls.html"> 20 Vote </a>
                        </li>
                        <li>
                          <a href="most-visited.html"> 658 Views </a>
                        </li>
                        <li>
                          <ul className="qa-share">
                            <li className="share-option">
                              <span>
                                <i className="ri-share-fill"></i>
                              </span>

                              <ul className="social-icon">
                                <li>
                                  <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-facebook-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.twitter.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-twitter-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-linkedin-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-instagram-line"></i>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>

                      <Link to={"/answer"} className="default-btn">
                        Answer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pagination-area">
                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-left-line"></i>
                </a>
                <span className="page-numbers current" aria-current="page">
                  1
                </span>
                <a href="all-queations.html" className="page-numbers">
                  2
                </a>
                <a href="all-queations.html" className="page-numbers">
                  3
                </a>

                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            {/* Featured Question Tab */}
            <div
              className="tab-pane fade"
              id="featured-question"
              role="tabpanel"
              aria-labelledby="featured-question-tab"
            >
              <div className="single-qa-box like-dislike">
                <div className="d-flex">
                  <div className="link-unlike flex-shrink-0">
                    <a href="user.html">
                      <img src={user1} alt="Image" />
                    </a>

                    <div className="donet-like-list">
                      <button className="like-unlink-count like">
                        <i className="ri-thumb-up-fill"></i>
                        <span>22</span>
                      </button>
                    </div>

                    <div className="donet-like-list">
                      <button className="like-unlink-count dislike">
                        <i className="ri-thumb-down-fill"></i>
                        <span>25</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-grow-1 ms-3">
                    <ul className="graphic-design">
                      <li>
                        <a href="user.html">Teresa Klein</a>
                      </li>
                      <li>
                        <span>Latest Answer: 14 hours ago</span>
                      </li>
                      <li>
                        <span>In:</span>
                        <a href="tags.html" className="graphic">
                          Graphic design
                        </a>
                      </li>
                    </ul>

                    <h3>
                      <a href="queations-details.html">
                        If you open Illustrator by dragging the Photoshop file,
                        why it becomes a JPG file
                      </a>
                    </h3>

                    <p>
                      Sed porttitor lectus nibh. Nulla porttitor accumsan
                      tincidunt. Donec rutrum congue leo eget malesuada. Vivamus
                      magna justo, lacinia eget consectetur sed, convallis at
                      tellus rutrum congue leo eget malesuada tincidunt.
                    </p>

                    <ul className="tag-list">
                      <li>
                        <a href="tags.html">Discussion</a>
                      </li>
                      <li>
                        <a href="tags.html">Photoshop</a>
                      </li>
                      <li>
                        <a href="tags.html">Analytics</a>
                      </li>
                    </ul>

                    <div className="d-flex justify-content-between align-items-center">
                      <ul className="anser-list">
                        <li>
                          <a href="polls.html"> 22 Vote </a>
                        </li>
                        <li>
                          <a href="most-answered.html"> 2 Answer </a>
                        </li>
                        <li>
                          <a href="most-visited.html"> 658 Views </a>
                        </li>
                        <li>
                          <ul className="qa-share">
                            <li className="share-option">
                              <span>
                                <i className="ri-share-fill"></i>
                              </span>

                              <ul className="social-icon">
                                <li>
                                  <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-facebook-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.twitter.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-twitter-line"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-linkedin-fill"></i>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                  >
                                    <i className="ri-instagram-line"></i>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>

                      <Link to={"/answer"} className="default-btn">
                        Answer
                      </Link>
                    </div>
                  </div>
                </div>
                <span className="featured">Featured</span>
              </div>

              <div className="pagination-area">
                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-left-line"></i>
                </a>
                <span className="page-numbers current" aria-current="page">
                  1
                </span>
                <a href="all-queations.html" className="page-numbers">
                  2
                </a>
                <a href="all-queations.html" className="page-numbers">
                  3
                </a>

                <a href="all-queations.html" className="next page-numbers">
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentMiddle;
