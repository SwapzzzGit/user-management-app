import React, { useEffect, useState } from "react";
import "./Accordion.css";

export default function Accordion({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const [disabled, setDisabled] = useState(true);

  //storing joint Name

  // const [originalData, setOriginalData] = useState(user);

  // data

  const [editedData, setEditedData] = useState(
    {
      ...user,

      fullName: user.first + " " + user.last,
    },
    [user]
  );

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("usersData"));

    if (localStorageData) {
      setEditedData(localStorageData);
    } else {
      setEditedData(user);
    }
  }, []);

  const toggleAccordin = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditable = () => {
    setDisabled(!disabled);
  };

  // handle Name Change

  const handleNameChange = (e) => {
    const { name, value } = e.target;

    // const [firstName, lastName] = value.split(" ");

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
    localStorage.setItem("usersData", JSON.stringify(editedData));
  };

  const handleDeleteChange = () => {
    console.log("delete");
  };

  // handle cancel change

  const handleCancelChange = () => {
    toggleEditable();
  };
  const calculateAge = (userDob) => {
    const dob = new Date(userDob);
    const today = new Date();
    return today.getFullYear() - dob.getFullYear();
  };

  return (
    <div className={`accordion ${isOpen ? "open" : "closed"}`}>
      <div className="collapsed" onClick={toggleAccordin}>
        <div className="img-name">
          <img src={user.picture} alt="" className="circular-image" />

          <input
            className={`${disabled ? "disabled-input" : "endabled-input"}`}
            type="text"
            name="Name"
            value={editedData.fullName}
            disabled={disabled}
            onChange={handleNameChange}
          />
        </div>

        <div className="arrow">{isOpen ? "▼" : "▶"}</div>
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
              value={calculateAge(user.dob)}
              disabled={disabled}
            />
          </div>

          <div className="flexing-down">
            <label htmlFor="" className="label">
              Gender
            </label>

            <input
              className={`${disabled ? "disabled-input" : "endabled-input"}`}
              type="text"
              value={user.gender}
              disabled={disabled}
            />
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

          <textarea
            className={`${disabled ? "disabled-textarea" : "enabled-textarea"}`}
            type="textarea"
            name="description"
            value={editedData.description}
            disabled={disabled}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="edit-save">
          <button>
            {disabled ? (
              <img src="/delete1.png" onClick={handleDeleteChange} />
            ) : (
              <img src="/cross.png" onClick={handleCancelChange} />
            )}
          </button>

          <button onClick={toggleEditable}>
            {disabled ? (
              <img src="/pencil.png" />
            ) : (
              <img src="/check-mark.png" onClick={handleSaveChange} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
