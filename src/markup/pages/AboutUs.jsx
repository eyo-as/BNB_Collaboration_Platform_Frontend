import { useEffect, useState } from "react";
import bannerImg from "../../assets/images/banner-img.png";
import chooseImg from "../../assets/images/choose-img.png";
import team1 from "../../assets/images/team/team-1.jpg";
import team2 from "../../assets/images/team/team-2.jpg";
import team3 from "../../assets/images/team/team-3.jpg";
import team4 from "../../assets/images/team/team-4.jpg";
import ContentLeft from "../components/main-content/ContentLeft";

const AboutUs = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 992);

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
    <>
      <div className="about-banner-area">
        <div className="container">
          <div className="row align-items-center">
            {!isLargeScreen && <ContentLeft />}
            <div className="col-lg">
              <div className="about-banner-content">
                <span className="top-title">Who we are</span>
                <h2>
                  Our job is to empower the world through the development of
                  technology through combined knowledge.
                </h2>
                <p>
                  Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                  Curabitur aliquet quam id dui posuere blandit. Vivamus magna
                  justo, lacinia eget consectetur sed, convallis at tellus.
                  Donec sollicitudin molestie malesuada pretium ut lacinia in,
                  elementum id enim. Curabitur aliquet quam id dui posuere
                  blandit. Vivamus magna.
                </p>
                <p>
                  Nulla porttitor accumsan tincidunt. Curabitur arcu erat,
                  accumsan id imperdiet et, porttitor at sem. Vivamus suscipit
                  tortor eget felis porttitor volutpat. Curabitur arcu erat,
                  accumsan id imperdiet et, porttitor at sem.
                </p>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-banner-img">
                <img src={bannerImg} alt="Image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="monthly-user-area">
        <div className="container">
          <div className="monthly-user-bg pt-100 pb-70">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>10+ million</h3>
                  <span>Monthly visitors to our network</span>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>2 Million</h3>
                  <span>Questions asked to-date</span>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>1000+</h3>
                  <span>Customer companies for all products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="why-choose-us-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="why-choose-img">
                <img src={chooseImg} alt="Image" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="why-choose-content">
                <span className="top-title">Why choosing Pify</span>
                <h2>
                  The main reason why you choose it is that we share our
                  knowledge at the doorsteps of the world
                </h2>
                <p>
                  Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                  Curabitur aliquet quam id dui posuere blandit. Vivamus magna
                  justo, lacinia eget consectetur sed, convallis at tellus.
                  Donec sollicitudin molestie malesuada.
                </p>

                <ul>
                  <li>
                    <h3>First priority customer mindset</h3>
                    <p>
                      Nulla porttitor accumsan tincidunt. Curabitur arcu erat,
                      accumsan id imperdiet et, porttitor at sem. Vivamus
                      suscipit tortor eget felis porttitor volutpat. Curabitur
                      arcu erat, accumsan id imperdiet et, porttitor at sem.
                      Proin eget tortor risus.
                    </p>
                  </li>
                  <li>
                    <h3>Be transparent</h3>
                    <p>
                      Proin eget tortor risus. Quisque velit nisi, pretium ut
                      lacinia in, elementum id enim. Curabitur arcu erat,
                      accumsan id imperdiet et, porttitor at sem. Vivamus magna
                      justo, lacinia eget consectetur sed, convallis at tellus.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Our leadership team</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team1} alt="Image" />
                <h3>Guillermo Brand</h3>
                <span>CEO</span>
                <ul className="d-flex justify-content-between align-items-center">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank">
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="ri-linkedin-fill"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>

                  <li>
                    <button className="default-btn">Follow</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team2} alt="Image" />
                <h3>Phyllis Cassidy</h3>
                <span>Writer</span>
                <ul className="d-flex justify-content-between align-items-center">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank">
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="ri-linkedin-fill"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>

                  <li>
                    <button className="default-btn">Follow</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team3} alt="Image" />
                <h3>Ian Martin</h3>
                <span>Manager</span>
                <ul className="d-flex justify-content-between align-items-center">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank">
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="ri-linkedin-fill"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>

                  <li>
                    <button className="default-btn">Follow</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team4} alt="Image" />
                <h3>Regina Mccloy</h3>
                <span>Writer</span>
                <ul className="d-flex justify-content-between align-items-center">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="ri-facebook-fill"></i>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank">
                      <i className="ri-twitter-line"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="ri-linkedin-fill"></i>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="ri-instagram-line"></i>
                    </a>
                  </li>

                  <li>
                    <button className="default-btn">Follow</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
