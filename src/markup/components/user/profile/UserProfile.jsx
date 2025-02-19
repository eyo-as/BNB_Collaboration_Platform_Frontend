import { useEffect, useState } from "react";
import profileImg from "../../../../assets/images/user/profile-img.jpg";
import ContentLeft from "../../main-content/ContentLeft";

const UserProfile = () => {
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
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            {!isLargeScreen && <ContentLeft />}
            <ContentLeft />
            <div className="col-lg">
              <div className="user-profile-area">
                <div className="profile-content d-flex justify-content-between align-items-center">
                  <div className="profile-img">
                    <img src={profileImg} className="mx-auto" alt="Image" />
                    <h3>Rosemary Hamm</h3>
                    <span>Member since 1 years ago</span>
                    <span>Last seen this week</span>
                    <button className="followers-btn">45 Followers</button>
                    <button className="followers-btn">12 Following</button>
                  </div>

                  <div className="edit-btn">
                    <a href="edit-profile.html" className="default-btn">
                      Edit profile
                    </a>
                  </div>
                </div>

                <div className="profile-achive">
                  <div className="row">
                    <div className="col-xl-3 col-sm-6">
                      <div className="single-achive">
                        <h2>1984</h2>
                        <span>Answers</span>
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="single-achive">
                        <h2>507</h2>
                        <span>Question</span>
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="single-achive">
                        <h2>124</h2>
                        <span>Best answers</span>
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="single-achive">
                        <h2>2M</h2>
                        <span>Reached</span>
                      </div>
                    </div>
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

export default UserProfile;
