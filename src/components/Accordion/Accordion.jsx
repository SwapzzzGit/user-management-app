import React, { useEffect, useState } from "react";
import DeleteBox from "../DeleteBox/DeleteBox";
import "./Accordion.css";
import OpenArrow from "../../assets/open-arrow-image.png";
import ClosedArrow from "../../assets/closed-arrow-image.png";

export default function Accordion({ user, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [originalUserData, setOriginalUserData] = useState([]);

  //delete component
  const [showDelete, setShowDelete] = useState(false);

  const CalulateAge = (userDob) => {
    const dob = new Date(userDob);
    const today = new Date();
    return today.getFullYear() - dob.getFullYear();
  };
  // Data
  const [editedData, setEditedData] = useState({
    ...user,
    fullName: user.first + " " + user.last,
    age: CalulateAge(user.dob),
  });

  // Retrieve userData from local storage
  useEffect(() => {
    if (user) {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];

      const userData = Array.isArray(storedUserData)
        ? storedUserData
        : storedUserData;

      if (userData.length > 0) {
        const existingUserData = userData.find((data) => {
          if (data) {
            return data.id === user.id;
          }
        });

        if (existingUserData) {
          setEditedData(existingUserData);
        }
      }
    }
  }, [user]);

  const toggleAccordin = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditable = () => {
    setDisabled(!disabled);
  };

  // handle Name Change
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, fullName: value });
  };

  //handle Country Change
  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // handle Description Change
  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // save and delete

  const handleSaveChange = () => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const userData = Array.isArray(storedUserData)
      ? storedUserData
      : [storedUserData];
    console.log(userData);
    setOriginalUserData(userData);
    const existingUserDataIndex = userData.findIndex((data) => {
      if (data) {
        return data.id === user.id;
      }
    });

    if (existingUserDataIndex !== -1) {
      userData[existingUserDataIndex] = editedData;
    } else {
      userData.push(editedData);
    }

    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleDeleteChange = () => {
    setShowDelete(true);
  };

  // handle cancel change
  const handleCancelChange = () => {
    const removeNull = originalUserData.filter((item) => item !== null);
    // console.log(removeNull);
    const userObjectToSet = removeNull.filter((item) => item.id == user.id);
    // console.log(userObjectToSet);
    if (userObjectToSet) {
      setEditedData(userObjectToSet);
    } else {
      setEditedData(user);
    }
    toggleEditable();
  };

  // DeleteBox Component

  // on Cancel
  const onCrosspress = () => {
    setShowDelete(false);
  };

  //on Delete
  const onDeletePress = () => {
    setShowDelete(false);

    onDelete(user.id);
  };

  // handleAgeChange
  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  //handleGenderChange
  const handleGenderChange = (e) => {
    const changedgender = e.target.value;
    setEditedData({ ...editedData, gender: changedgender });
  };

  return (
    <div>
      <div className={`accordion ${isOpen ? "open" : "closed"}`}>
        <div className="collapsed" onClick={toggleAccordin}>
          <div className="img-name">
            <img
              src={user.picture}
              alt="profile-pic"
              className="circular-image"
            />
            <input
              className={`capsName ${
                disabled ? "disabled-input" : "endabled-input"
              }`}
              type="text"
              name="Name"
              value={editedData.fullName}
              disabled={disabled}
              onChange={handleNameChange}
            />
          </div>
          <div className="arrow">
            {isOpen ? (
              <img src={OpenArrow} alt="Open Arrow" />
            ) : (
              <img src={ClosedArrow} alt="Closed Arrow" />
            )}
          </div>
        </div>
        <div className="content">
          <div className="dob-gender">
            <div className="flexing-down">
              <label htmlFor="" className="label">
                Age
              </label>
              <input
                className={`${disabled ? "disabled-input" : "endabled-input"}`}
                type="text"
                name="age"
                value={editedData.age}
                disabled={disabled}
                onChange={handleAgeChange}
              />
            </div>
            <div className="flexing-down">
              <label htmlFor="" className="label">
                Gender
              </label>

              <select
                className={`selectStyle ${
                  disabled ? "disabled-gender-dropdown" : "endabled-input"
                }`}
                value={editedData.gender}
                disabled={disabled}
                onChange={handleGenderChange}
              >
                <option style={{ color: "black" }} value="male">
                  Male
                </option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="rather not say">Rather not say</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flexing-down">
              <label htmlFor="" className="label">
                Country
              </label>
              <input
                name="country"
                className={`${disabled ? "disabled-input" : "endabled-input"}`}
                type="text"
                value={editedData.country}
                disabled={disabled}
                onChange={handleCountryChange}
              />
            </div>
          </div>
          <div className="description">
            <label htmlFor="" className="label">
              Description
            </label>
            <div>
              <textarea
                className={`${
                  disabled ? "disabled-textarea" : "enabled-textarea"
                }`}
                type="textarea"
                name="description"
                value={editedData.description}
                disabled={disabled}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div className="edit-save">
            <button>
              {disabled ? (
                <img
                  className="icon"
                  src="/delete1.png"
                  onClick={handleDeleteChange}
                  alt="delete"
                />
              ) : (
                <img
                  className="icon"
                  src="/cross.png"
                  onClick={handleCancelChange}
                  alt="cancel"
                />
              )}
            </button>
            <button onClick={toggleEditable}>
              {disabled ? (
                <img className="icon" src="/pencil.png" alt="edit" />
              ) : (
                <img
                  className="icon"
                  src="/check-mark.png"
                  onClick={handleSaveChange}
                  alt="save"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        {showDelete && (
          <DeleteBox cancel={onCrosspress} onDelete={onDeletePress} />
        )}
      </div>
    </div>
  );
}
