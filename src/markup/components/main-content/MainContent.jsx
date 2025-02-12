import ContentLeft from "./ContentLeft";
import ContentMiddle from "./ContentMiddle";
import ContentRight from "./ContentRight";

const MainContent = () => {
  return (
    <>
      <div className="main-content-area ptb-100">
        <div className="container">
          <div className="row">
            <ContentLeft />
            <ContentMiddle />
            <ContentRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
