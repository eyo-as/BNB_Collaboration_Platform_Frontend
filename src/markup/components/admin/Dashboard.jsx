const Dashboard = () => {
  return (
    <>
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="sidebar-menu-wrap">
                <div className="sidemenu-wrap d-flex justify-content-between align-items-center">
                  <h3>Pify Sidebar Menu</h3>
                </div>

                <div
                  className="offcanvas offcanvas-start"
                  tabIndex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                      Menu
                    </h5>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body">
                    <div className="left-sidebar">
                      <nav className="sidebar-nav" data-simplebar="">
                        <ul id="sidebar-menu" className="sidebar-menu">
                          <li>
                            <a href="index.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-home-8-line"></i>
                                Home
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="all-queations.html"
                              className="has-arrow box-style"
                            >
                              <i className="ri-question-line"></i>
                              <span className="menu-title">Questions</span>
                            </a>
                            <ul className="sidemenu-nav-second-level">
                              <li>
                                <a href="all-queations.html">
                                  <span className="menu-title">
                                    All questions
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="queations-details.html">
                                  <span className="menu-title">
                                    questions details
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="communities.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-links-line"></i>
                                Communities
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href="most-answered.html"
                              className="has-arrow box-style"
                            >
                              <i className="ri-question-answer-fill"></i>
                              <span className="menu-title">Most answered</span>
                            </a>
                            <ul className="sidemenu-nav-second-level">
                              <li>
                                <a href="most-answered.html">
                                  <span className="menu-title">
                                    Most answered
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="most-answered-details.html">
                                  <span className="menu-title">
                                    Most answered details
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="unanswered.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-checkbox-circle-line"></i>
                                Unanswered
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="most-visited.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-eye-line"></i>
                                Most visited
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="polls.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-bar-chart-fill"></i>
                                Polls
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="faq.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-hq-line"></i>
                                FAQs
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="groups.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-group-2-line"></i>
                                Groups
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="education.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-book-line"></i>
                                Education
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="technology.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-file-shield-2-line"></i>
                                Technology
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="tags.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-price-tag-line"></i>
                                Tags
                              </span>
                            </a>
                          </li>
                          <li>
                            <a href="badges.html" className="box-style">
                              <span className="menu-title">
                                <i className="ri-award-line"></i>
                                Badges
                              </span>
                            </a>
                          </li>

                          <li className="mm-active">
                            <a href="#" className="has-arrow box-style">
                              <i className="ri-user-line"></i>
                              <span className="menu-title active">User</span>
                            </a>
                            <ul className="sidemenu-nav-second-level">
                              <li>
                                <a href="user.html">
                                  <span className="menu-title active">
                                    User
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="user-profile.html">
                                  <span className="menu-title">
                                    User profile
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="ask-questions.html">
                                  <span className="menu-title">
                                    Ask a questions
                                  </span>
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="middull-content">
                <ul className="page-nish">
                  <li>
                    <a href="index.html">
                      <i className="ri-home-8-line"></i>
                      Home
                    </a>
                  </li>
                  <li className="active">User</li>
                </ul>

                <form className="aq-form">
                  <i className="ri-search-line"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Have a question? Ask or enter a search"
                  />
                  <button className="aq-btn">Ask Question</button>
                </form>

                <div className="wew-user-area">
                  <div className="row">
                    <div className="col-lg-6 col-sm-6">
                      <div className="single-new-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/user/user-15.jpg"
                              alt="Image /"
                            />
                          </div>

                          <div className="flex-grow-1 ms-3">
                            <h3>
                              <a href="user-profile.html">Marilyn Grant</a>
                            </h3>
                            <p>United Kingdom</p>
                          </div>
                        </div>

                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            <p>
                              <span>394</span> questions
                            </p>
                          </li>
                          <li>
                            <a href="user-profile.html" className="default-btn">
                              Follow
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-6">
                      <div className="single-new-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/user/user-16.jpg"
                              alt="Image /"
                            />
                          </div>

                          <div className="flex-grow-1 ms-3">
                            <h3>
                              <a href="user-profile.html">Jeremy Conant</a>
                            </h3>
                            <p>Italy</p>
                          </div>
                        </div>

                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            <p>
                              <span>333</span> questions
                            </p>
                          </li>
                          <li>
                            <a href="user-profile.html" className="default-btn">
                              Follow
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-6">
                      <div className="single-new-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/user/user-17.jpg"
                              alt="Image /"
                            />
                          </div>

                          <div className="flex-grow-1 ms-3">
                            <h3>
                              <a href="user-profile.html">Amy Stearns</a>
                            </h3>
                            <p>California</p>
                          </div>
                        </div>

                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            <p>
                              <span>318</span> questions
                            </p>
                          </li>
                          <li>
                            <a href="user-profile.html" className="default-btn">
                              Follow
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-6 col-sm-6">
                      <div className="single-new-user">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="assets/images/user/user-18.jpg"
                              alt="Image /"
                            />
                          </div>

                          <div className="flex-grow-1 ms-3">
                            <h3>
                              <a href="user-profile.html">Alpha Gabriel</a>
                            </h3>
                            <p>Seattle, USA</p>
                          </div>
                        </div>

                        <ul className="d-flex justify-content-between align-items-center">
                          <li>
                            <p>
                              <span>14</span> questions
                            </p>
                          </li>
                          <li>
                            <a href="user-profile.html" className="default-btn">
                              Follow
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="right-siderbar">
                <div className="right-siderbar-common">
                  <a href="ask-questions.html" className="default-btn">
                    Ask a question
                  </a>
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
                      <option selected="">Select category</option>
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
                          The idea of how I will share my profile on social
                          sites
                        </a>
                      </li>
                      <li>
                        <a href="most-answered.html">
                          Discuss the rules for maintaining all the employees in
                          the company
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
