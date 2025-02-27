import { Link } from "react-router-dom";
import user1 from "../../../../assets/images/user/user-1.jpg";
const FeaturedQuestion = () => {
  return (
    <>
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
                  If you open Illustrator by dragging the Photoshop file, why it
                  becomes a JPG file
                </a>
              </h3>

              <p>
                Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.
                Donec rutrum congue leo eget malesuada. Vivamus magna justo,
                lacinia eget consectetur sed, convallis at tellus rutrum congue
                leo eget malesuada tincidunt.
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
                            <a href="https://www.facebook.com/" target="_blank">
                              <i className="ri-facebook-fill"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.twitter.com/" target="_blank">
                              <i className="ri-twitter-line"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.linkedin.com/" target="_blank">
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
    </>
  );
};

export default FeaturedQuestion;
