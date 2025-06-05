import { useEffect, useState } from "react";
import bannerImg from "../../assets/images/banner-img.png";
import chooseImg from "../../assets/images/choose-img.png";
// import team1 from "../../assets/images/team/team-1.jpg";
// import team2 from "../../assets/images/team/team-2.jpg";
// import team3 from "../../assets/images/team/team-3.jpg";
// import team4 from "../../assets/images/team/team-4.jpg";
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
                  At BNB School, we believe in fostering an environment where
                  students can truly excel.
                </h2>
                <h3>
                  {" "}
                  As one of Hawassa&apos;s leading high schools, our core
                  mission is to cultivate students with impressive knowledge,
                  strong discipline, and unwavering consistency.
                </h3>
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
        <div className="container mx-auto">
          <div className="monthly-user-bg pt-100 pb-70">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>10000+ </h3>
                  <span>Total Studensts</span>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>800+</h3>
                  <span>Active Students</span>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="single-monthly-item">
                  <h3>50+</h3>
                  <span>Active Teachers</span>
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
                <span className="top-title">Why Choose BNB School?</span>
                <h4>
                  Choosing the right high school is a pivotal decision, and at
                  BNB School
                </h4>
                <p>
                  we believe we offer an unparalleled educational experience
                  right here in Hawassa, Ethiopia. Recognized as one of the
                  city&apos;s best schools, our commitment goes beyond
                  textbooks; it&apos;s about shaping future leaders and engaged
                  citizens.
                </p>
                <p>
                  Choosing BNB School means choosing a path to impressive
                  knowledge, disciplined growth, and consistent achievement. We
                  invite you to experience the difference for yourself.
                </p>

                <ul>
                  <li>
                    <h4>Our Approach at BNB School</h4>
                    <p>
                      At BNB School, we&apos;re committed to building students
                      with impressive knowledge, strong discipline, and
                      unwavering consistency. As one of Hawassa&apos;s top high
                      schools, our approach is straightforward: we empower
                      students to excel.
                    </p>

                    <h6>
                      Our core values of a student-centric focus, transparency,
                      and collaborative growth guide every decision, ensuring
                      your success is always our priority.
                    </h6>
                  </li>
                  <li>
                    <h3>Our Student Collaboration Platform</h3>
                    <p>
                      To further amplify the BNB learning experience, we&apos;re
                      proud to offer our dedicated student collaboration
                      platform. Designed by a BNB student for BNB students, this
                      powerful online tool connects and empowers communication
                      and collaboration across all grades. It&apos;s more than
                      just a tool; it&apos;s a testament to our commitment to
                      innovation and student empowerment, ensuring every student
                      has the resources they need to thrive.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-area pt-100 pb-70">
        {/* <div className="container">
          <div className="section-title">
            <h2>Our leadership team</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team1} alt="Image" />
                <h3>Samuel Bekalo</h3>
                <span>CEO</span>
                
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team2} alt="Image" />
                <h3>Taye Asfaw</h3>
                <span>Writer</span>
               
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team3} alt="Image" />
                <h3>Miraf Wongmagegn</h3>
                <span>Manager</span>
                
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="single-team-item">
                <img src={team4} alt="Image" />
                <h3>Bizuhan </h3>
                <span>Writer</span>
                
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AboutUs;
