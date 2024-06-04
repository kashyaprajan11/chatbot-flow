// Toast.js
import React from "react";
import "./Toast.css";

const Toast = ({ message, show, onClose, isError = false }) => {
  return (
    <div className={`toast ${show ? "show" : ""} ${isError ? "error" : ""}`}>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
