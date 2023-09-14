import React from "react";
import "./DeleteBox.css";

const DeleteBox = () => {
  return (
    <div className="outer-box">
      <div className="inner-container">
        <p>Are you sure you want to Delete?</p>
        <button className="x">X</button>
      </div>
      <div className="buttons">
        <button className="cancel">Cancel</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
};

export default DeleteBox;
