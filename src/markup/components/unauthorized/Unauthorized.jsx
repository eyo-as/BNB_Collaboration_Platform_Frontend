import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <div className="text-4xl text-red-600 mb-4">403 - Unauthorized</div>
      <p className="text-lg text-gray-800 mb-8">
        You do not have permission to view this page.
      </p>
      <Link to="/">
        <div className="text-blue-500 text-base no-underline">
          Go back to Home
        </div>
      </Link>
    </div>
  );
};

export default Unauthorized;
