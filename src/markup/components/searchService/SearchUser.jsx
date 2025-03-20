import { useState } from "react";
import PropTypes from "prop-types";

const SearchUser = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        placeholder=" 🔍 Search by name, username, or email..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};
SearchUser.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchUser;
