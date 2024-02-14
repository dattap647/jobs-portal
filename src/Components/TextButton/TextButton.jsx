import React from "react";
import "./textButton.css";
function TextButton({ name, leftIcon, onClick, color = "--gray_700" }) {
  return (
    <div
      className={`text-button`}
      style={{ color: `var(${color})` }}
      onClick={onClick}
    >
      {name}
    </div>
  );
}
export default TextButton;
