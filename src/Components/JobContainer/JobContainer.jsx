import React from "react";
import Buttons from "../Button/Buttons";
import TextButton from "../TextButton/TextButton";
import { useNavigate } from "react-router";
import { useParentContext } from "../../context/ParentContext";

const JobContainer = ({ job, className, showButton = true }) => {
  const navigate = useNavigate();
  const { handleClick } = useParentContext();
  const handleNavigate = () => {
    if (!showButton) {
      navigate(`/jobdetails/${job.id}`);
    }
  };
  return (
    <div className="py-2">
      <div
        className="d-flex justify-content-between m-1 "
        onClick={handleNavigate}
        style={{ cursor: !showButton && "pointer" }}
      >
        <div className="d-flex flex-column gap-1">
          <span className={className}>{job.title}</span>
          <div className="d-flex gap-3">
            <div className="d-flex align-items-center">
              <img
                src="/assets/Icons/building.svg"
                alt="built"
                width={20}
                height={20}
              />
              <p className="p-0 m-0"> {job.function.title} </p>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="/assets/Icons/map.svg"
                alt="built"
                width={20}
                height={20}
              />
              <p className="p-0 m-0">{job.location.title}</p>
            </div>
            <div>
              <div
                style={{ background: `var(--gray_300)`, height: 25 }}
                className="text-center px-1  rounded"
              >
                {job.type}
              </div>
            </div>
          </div>
        </div>
        {showButton && (
          <div className="d-flex align-items-center gap-3">
            <Buttons
              name={"Apply"}
              bgcolor="--white"
              onClick={() => handleClick(job.applyUrl)}
            />
            <TextButton
              name={"View"}
              onClick={() => navigate(`/jobdetails/${job.id}`)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobContainer;
