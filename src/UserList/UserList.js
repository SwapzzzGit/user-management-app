import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import data from "../celebrities.json";
import "./UserList.css";

const UserList = () => {
  const [openUser, setOpenUser] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [editable, setEditable] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // Load data from local storage when the component mounts
    const localStorageData = JSON.parse(localStorage.getItem("usersData"));
    if (localStorageData) {
      setUsersData(localStorageData);
    } else {
      setUsersData(data);
    }
  }, []);

  const toggleAccordion = (userId) => {
    if (openUser === userId) {
      setOpenUser(null);
    } else {
      setOpenUser(userId);
    }
  };

  const toggleEditable = (user) => {
    setEditable(!editable);
    setEditedUserData(user);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSave = () => {
    const updatedUsersData = usersData.map((user) =>
      user.id === editedUserData.id ? editedUserData : user
    );
    setUsersData(updatedUsersData);
    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));
    setEditable(false);
  };

  const handleDelete = (user) => {
    const updatedUsersData = usersData.filter((u) => u.id !== user.id);
    setUsersData(updatedUsersData);
    localStorage.setItem("usersData", JSON.stringify(updatedUsersData));
    setOpenUser(null); // Close the accordion after deletion
  };

  return (
    <div>
      {usersData.map((user) => (
        <div
          key={user.id}
          className={`user ${openUser === user.id ? "open" : ""}`}
        >
          <div
            className={`user-container ${openUser === user.id ? "open" : ""}`}
          >
            <div
              className="user-header"
              onClick={() => toggleAccordion(user.id)}
            >
              <div className="image-name">
                <img src={user.picture} alt={user.first} />
                <div className="user-info">
                  <input
                    type="text"
                    name="fullName"
                    value={`${user.first} ${user.last}`}
                    disabled={isDisabled}
                  />
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    flip
                    style={{ color: "#b0b0b0" }}
                  />
                </div>
              </div>
            </div>
            <div className={`user-details`}>
              <div className="field">
                <label>Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  value={editable ? editedUserData.dob : user.dob}
                  onChange={handleInputChange}
                  disabled={!editable}
                />
              </div>
              <div className="field">
                <label>Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={editable ? editedUserData.gender : user.gender}
                  onChange={handleInputChange}
                  disabled={!editable}
                />
              </div>
              <div className="field">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={editable ? editedUserData.email : user.email}
                  onChange={handleInputChange}
                  disabled={!editable}
                />
              </div>
              <div className="field">
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={editable ? editedUserData.country : user.country}
                  onChange={handleInputChange}
                  disabled={!editable}
                />
              </div>
              <div className="field">
                <label>Description:</label>
                <textarea
                  rows="4"
                  name="description"
                  value={
                    editable ? editedUserData.description : user.description
                  }
                  onChange={handleInputChange}
                  disabled={!editable}
                />
              </div>
              <div className="edit-save">
                {editable ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => toggleEditable(user)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEditable(user)}>Edit</button>
                    <button onClick={() => handleDelete(user)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
