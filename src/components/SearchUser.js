import React, { useState } from "react";
<<<<<<< HEAD
import axios from "axios"; // Import Axios for making HTTP requests

function SearchUser({ data }) {
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(data);
  const [editUserId, setEditUserId] = useState(null);

  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchUser(searchTerm);
=======

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
>>>>>>> f301ae49bf25a0a812f903cad122d8b2faf73098
    const filteredData = data.filter((user) => {
      const userFirstName = user.first.toLowerCase();
      const userLastName = user.last.toLowerCase();
      return (
        userFirstName.startsWith(searchTerm) ||
        userLastName.startsWith(searchTerm)
      );
    });
<<<<<<< HEAD
    setFilteredUsers(filteredData);
  };

  const enterEditMode = (userId) => {
    setEditUserId(userId);
  };

  const exitEditMode = () => {
    setEditUserId(null);
  };

  const handleSave = (filteredUsers) => {
    // Send the updated user data to the server
    axios
      .put("/api/update/1", [filteredUsers]) // Assuming you send an array of updated users
      .then((response) => {
        console.log("Data saved successfully");
        // After saving, exit edit mode
        exitEditMode();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    setEditUserId(null);
  };

  const handleFirstNameChange = (e, user) => {
    const updatedUser = { ...user, first: e.target.value };
    handleUserChange(updatedUser);
  };

  const handleLastNameChange = (e, user) => {
    const updatedUser = { ...user, last: e.target.value };
    handleUserChange(updatedUser);
  };

  const handleUserChange = (updatedUser) => {
    // Find the user in filteredUsers and update it
    const updatedFilteredUsers = data.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      }
      return user;
    });

    setFilteredUsers(updatedFilteredUsers);
=======

    setFilteredUsers(filteredData);
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler(e);
    }
>>>>>>> f301ae49bf25a0a812f903cad122d8b2faf73098
  };

  return (
    <div>
      <input
        type="text"
        value={searchUser}
        onChange={searchHandler}
<<<<<<< HEAD
=======
        onKeyPress={handleKeyPress}
>>>>>>> f301ae49bf25a0a812f903cad122d8b2faf73098
        placeholder="Search User"
      />
      {filteredUsers.map((user) => (
        <div key={user.id}>
<<<<<<< HEAD
          {editUserId === user.id ? (
            // Edit Mode
            <div>
              <input
                type="text"
                value={user.first}
                onChange={(e) => handleFirstNameChange(e, user)}
              />
              <input
                type="text"
                value={user.last}
                onChange={(e) => handleLastNameChange(e, user)}
              />
              {/* Add editable fields for other user information */}
              <button onClick={() => handleSave(user)}>Save</button>
              <button onClick={exitEditMode}>Cancel</button>
            </div>
          ) : (
            // View Mode
            <div>
              <h2>
                {user.first} {user.last}
              </h2>
              {/* Display other user information */}
              <button onClick={() => enterEditMode(user.id)}>Edit</button>
            </div>
          )}
=======
          <h2>
            {user.first} {user.last}
          </h2>
          <p>Date of Birth: {user.dob}</p>
          <p>Gender: {user.gender}</p>
          <p>Email: {user.email}</p>
          <img src={user.picture} alt={`${user.first} ${user.last}`} />
          <p>Country: {user.country}</p>
          <p>Description: {user.description}</p>
>>>>>>> f301ae49bf25a0a812f903cad122d8b2faf73098
        </div>
      ))}
    </div>
  );
}

export default SearchUser;
