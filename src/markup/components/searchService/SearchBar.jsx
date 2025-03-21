import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch, pageType }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  const placeholderText =
    pageType === "questions"
      ? "🔍 Search what's on your mind..."
      : "🔍 Search by name, username, or email...";

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        placeholder={placeholderText}
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  pageType: PropTypes.string.isRequired,
};

export default SearchBar;
