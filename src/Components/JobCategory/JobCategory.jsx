import React from "react";

const JobCategory = ({ title }) => {
  return (
    <div className="d-flex flex-column gap-1">
      <h3 className="p-0 m-0">{title}</h3>
      <hr
        style={{
          color: `var(--blue)`,
          borderTop: "5px solid var(--blue)",
          width: "150px",
          margin: "0",
        }}
      />
    </div>
  );
};

export default JobCategory;
