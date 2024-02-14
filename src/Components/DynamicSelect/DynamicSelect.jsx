import React from "react";
import "./dynamicSelect.css";
function DynamicSelect({ value, options, onSelect, select }) {
  return (
    <div className="d-flex flex-column align-items-start justify-content-start">
      <div className="dynamic-dropdown-container">
        <select className="dropdown w-100" onChange={onSelect} value={value}>
          <option className="border-bottom border-dark">{select}</option>
          {options.map((option, index) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default DynamicSelect;
