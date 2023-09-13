import React, { useState } from "react";

function SearchUser({ data }) {
  // Search User State
  const [searchUser, setSearchUser] = useState("");
  // Filter Searched User State
  const [filteredUsers, setFilteredUsers] = useState(data);

  // Search User Handler
  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchUser(searchTerm);

    // Filter User Handler
    const filteredData = data.filter((user) => {
      const userFirstName = user.first.toLowerCase();
      const userLastName = user.last.toLowerCase();
      return (
        userFirstName.startsWith(searchTerm) ||
        userLastName.startsWith(searchTerm)
      );
    });

    setFilteredUsers(filteredData);
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler(e);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchUser}
        onChange={searchHandler}
        onKeyPress={handleKeyPress}
        placeholder="Search User"
      />
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <h2>
            {user.first} {user.last}
          </h2>
          <p>Date of Birth: {user.dob}</p>
          <p>Gender: {user.gender}</p>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt={`${user.first} ${user.last}`} />
          <p>Country: {user.country}</p>
          <p>Description: {user.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchUser;
