import React from "react";
import "./DeleteBox.css";

export default function DeleteBox({ cancel, onDelete }) {
  return (
    <div className="box">
      <div className="outer-box">
        <div className="inner-container">
          <p>Are you sure you want to delete?</p>
          <button className="close-button" onClick={cancel}>
            <img src="./close.png" alt="Close" />
          </button>
        </div>
        <div className="buttons">
          <button className="cancel" onClick={cancel}>
            Cancel
          </button>
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
