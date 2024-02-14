import React, { useState } from "react";
import "./searchBar.css";
function SearchBar({
  value,
  placeholder,
  onChange = () => {},
  isError,
}) {
  const [icon, setIcon] = useState(false);
  const [values, setValue] = useState("");
  const handleChange = (e) => {
    e.target.value ? setIcon(true) : setIcon(false);
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const handleClear = () => {
    setValue("");
    setIcon(false);
    onChange("");
  };
  return (
    <div className="d-flex flex-column">
      <div className="search-container">
        {" "}
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          style={{ borderColor: isError ? "var(--red)" : "var(--gray_500)" }}
          // onFocus={() => document.querySelector(".search-icon").focus()}
        />{" "}
        <span className={`search-icon clickable `}>
          {" "}
          {icon ? (
            <img
              src="/assets/Icons/cancel.svg"
              alt="icons"
              width="25"
              onClick={handleClear}
            />
          ) : (
            <img
              src="../../assets/Icons/search_icon.svg"
              alt="icons"
              width="25"
            />
          )}
        </span>
      </div>
      {isError && <span style={{ color: "red" }}>Please Provide Input</span>}
    </div>
  );
}
export default SearchBar;
