import { Link } from "react-router-dom";

const GoToPage = () => {
  return (
    <>
      <Link to={"/"}>
        <div className="go-top">
          <i className="ri-arrow-up-s-fill"></i>
          <i className="ri-arrow-up-s-fill"></i>
        </div>
      </Link>
    </>
  );
};

export default GoToPage;
