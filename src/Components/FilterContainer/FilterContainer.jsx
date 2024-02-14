import React from "react";

const FilterContainer = ({ filter, handleDeleteFilter }) => {
  return (
    <div
      key={filter.value}
      className="p-2 rounded"
      style={{ background: `var(--white)`, cursor: "pointer" }}
    >
      <div className="d-flex gap-2 ">
        <span>{filter.title}</span>
        <img
          src="/assets/Icons/cancel.svg"
          width={20}
          height={20}
          alt=""
          onClick={() => handleDeleteFilter(filter)}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
