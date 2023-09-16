import React, { useState } from "react";
import "./SearchUser.css";
import SearchIconImage from "../../assets/SearchIcon.png"; // Update the path to match the location of your image

export const SearchUser = ({ data, filteredData }) => {
  const [Search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    const searched = e.target.value.toLowerCase();
    setSearch(searched);
    const filteringData = data.filter((item) =>
      item.fullName.toLowerCase().includes(searched)
    );
    filteredData(filteringData);
  };
  return (
    <div className="search">
      <img src={SearchIconImage} alt="Search-User" className="search-icon" />
      <input
        className="search-bar"
        type="text"
        value={Search}
        onChange={handleSearchChange}
        placeholder="Search User"
      />
    </div>
  );
};
