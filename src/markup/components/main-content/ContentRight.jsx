import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContentRight = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="col-lg-3">
        <div className="right-siderbar">
          <div className="right-siderbar-common">
            {isLoggedIn ? (
              <Link to={"/ask-question"} className="default-btn">
                Ask a Question
              </Link>
            ) : (
              <Link to={"/login"} className="default-btn">
                Login to Ask question
              </Link>
            )}
          </div>

          <div className="right-siderbar-common">
            <div className="category">
              <h3>
                <i className="ri-list-unordered"></i>
                Categories
              </h3>

              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option>Select category</option>
                <option value="1">Discussion</option>
                <option value="2">Language</option>
                <option value="3">Analytics</option>
              </select>
            </div>
          </div>

          <div className="right-siderbar-common">
            <div className="discussions">
              <h3>
                <i className="ri-speaker-line"></i>
                Top Discussions
              </h3>

              <ul>
                <li>
                  <a href="most-answered.html">
                    The idea of how I will share my profile on social sites
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    Discuss the rules for maintaining all the employees in the
                    company
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    The best way to choose between a job and a business
                  </a>
                </li>
                <li>
                  <a href="most-answered.html">
                    Which is the most important UIUX in terms of design?
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="right-siderbar-common">
            <div className="answer-count">
              <ul className="d-flex flex-wrap">
                <li>
                  <span>Questions</span>
                  <span className="count">435</span>
                </li>
                <li>
                  <span>Answers</span>
                  <span className="count">435</span>
                </li>
                <li>
                  <span>Best answers</span>
                  <span className="count">324</span>
                </li>
                <li>
                  <span>Users</span>
                  <span className="count">2K</span>
                </li>
                <li>
                  <span>Posts</span>
                  <span className="count">852</span>
                </li>
                <li>
                  <span>Comments</span>
                  <span className="count">57</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="right-siderbar-common">
            <div className="recent-post">
              <h3>
                <i className="ri-discuss-line"></i>
                Recent post
              </h3>

              <ul>
                <li>
                  <a href="most-answered.html">
                    What could be UX design software?
                  </a>
                  <p>
                    8 hours ago by <a href="user.html">Alan Woodson</a>
                  </p>
                </li>
                <li>
                  <a href="most-answered.html">
                    All the new features that have been used in Windows 11
                  </a>
                  <p>
                    11 hours ago by <a href="user.html">Juan McPhail</a>
                  </p>
                </li>
                <li>
                  <a href="most-answered.html">
                    What is the most important thing in learning design?
                  </a>
                  <p>
                    11 hours ago by <a href="user.html">Vickie White</a>
                  </p>
                </li>
                <li>
                  <a href="most-answered.html">
                    Which language is the most popular in the web right now?
                  </a>
                  <p>
                    13 hours ago by <a href="user.html">Jose Merz</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="right-siderbar-common">
            <div className="trending-tags">
              <h3>
                <i className="ri-price-tag-3-line"></i>
                Trending Tags
              </h3>

              <ul>
                <li>
                  <a href="tags.html"> discussion </a>
                </li>
                <li>
                  <a href="tags.html"> analytics </a>
                </li>
                <li>
                  <a href="tags.html"> company </a>
                </li>
                <li>
                  <a href="tags.html"> life </a>
                </li>
                <li>
                  <a href="tags.html"> computer </a>
                </li>
                <li>
                  <a href="tags.html"> interview </a>
                </li>
                <li>
                  <a href="tags.html"> grammer </a>
                </li>
                <li>
                  <a href="tags.html"> convertion </a>
                </li>
                <li>
                  <a href="tags.html"> google </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentRight;
