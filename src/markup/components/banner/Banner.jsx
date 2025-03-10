import { Link } from "react-router";
import banner from "../../../assets/images/banner/banner-img.png";
import shape1 from "../../../assets/images/banner/shape-1.png";
import shape2 from "../../../assets/images/banner/shape-2.png";
import shape3 from "../../../assets/images/banner/shape-3.png";
import shape4 from "../../../assets/images/banner/shape-4.png";
import shape5 from "../../../assets/images/banner/shape-5.png";
import shape6 from "../../../assets/images/banner/shape-6.png";

const Banner = () => {
  return (
    <>
      <div className="banner-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-content">
                <h1>BNB</h1>
                <h3 className="text-black">
                  Share & grow the worlds <span>knowledge</span>!
                </h3>
                <p className="text-black">
                  We want to connect with people who will share their knowledge
                  from one person to another.
                </p>
                <Link to={"/ask-question"} className="default-btn">
                  {" "}
                  Ask a Question{" "}
                </Link>
              </div>
            </div>

            <div className="col-lg-6 pe-0">
              <div className="banner-img">
                <img src={banner} alt="Image" />
                <img src={shape1} alt="Image" className="shape shape-1" />
                <img src={shape2} alt="Image" className="shape shape-2" />
                <img src={shape3} alt="Image" className="shape shape-3" />
                <img src={shape4} alt="Image" className="shape shape-4" />
                <img src={shape5} alt="Image" className="shape shape-5" />
                <img src={shape6} alt="Image" className="shape shape-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
