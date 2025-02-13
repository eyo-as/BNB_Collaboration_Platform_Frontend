const ContentLeft = () => {
  return (
    <>
      <div className="col-lg-3">
        <div className="sidebar-menu-wrap">
          <div className="sidemenu-wrap d-flex justify-content-between align-items-center">
            <h3 className="text-center">Pify Sidebar Menu</h3>
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
                      <a href="index.html" className="box-style active">
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
                        <span className="menu-title"> Questions </span>
                      </a>
                      <ul className="sidemenu-nav-second-level">
                        <li>
                          <a href="all-queations.html">
                            <span className="menu-title">All questions</span>
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
                        <span className="menu-title"> Most answered </span>
                      </a>
                      <ul className="sidemenu-nav-second-level">
                        <li>
                          <a href="most-answered.html">
                            <span className="menu-title">Most answered</span>
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

                    <li>
                      <a href="user.html" className="has-arrow box-style">
                        <i className="ri-user-line"></i>
                        <span className="menu-title"> User </span>
                      </a>
                      <ul className="sidemenu-nav-second-level">
                        <li>
                          <a href="user.html">
                            <span className="menu-title">User</span>
                          </a>
                        </li>
                        <li>
                          <a href="user-profile.html">
                            <span className="menu-title">User profile</span>
                          </a>
                        </li>
                        <li>
                          <a href="ask-questions.html">
                            <span className="menu-title">Ask a questions</span>
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
    </>
  );
};

export default ContentLeft;
