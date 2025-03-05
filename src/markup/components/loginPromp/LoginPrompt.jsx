import { Link } from "react-router";

const LoginPrompt = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Login Required
      </h2>
      <p className="text-gray-600 mb-4">Please log in to view this content.</p>
      <Link
        to="/login"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Log In
      </Link>
    </div>
  );
};

export default LoginPrompt;
