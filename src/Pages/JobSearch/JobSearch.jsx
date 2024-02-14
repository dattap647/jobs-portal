import React, { useEffect, useRef, useState } from "react";
import TextButton from "../../Components/TextButton/TextButton";
import SearchBar from "../../Components/SearchBar/SearchBar";
import DynamicSelect from "../../Components/DynamicSelect/DynamicSelect";
import {
  getDepartment,
  getFunction,
  getJobs,
  getLocation,
} from "../../API/api";
import FilterContainer from "../../Components/FilterContainer/FilterContainer";
import { useParentContext } from "../../context/ParentContext";
import JobContainer from "../../Components/JobContainer/JobContainer";
import JobCategory from "../../Components/JobCategory/JobCategory";
import { ToastContainer, toast } from "react-toastify";

const JobSearch = () => {
  const {
    searchJob,
    handleSearch,
    department,
    handleDepartment,
    departmentoptions,
    setDepartmentOptions,
    location,
    handleLocation,
    locationoptions,
    setLocationOptions,
    functions,
    handleFunctions,
    functionoptions,
    setFunctionOptions,
    handleDeleteFilter,
    handleClearAllFilters,
    selectedFilters,
  } = useParentContext();
  const debouncedSearchTerm = useRef(null);
  const [groupedJobs, setGroupedJobs] = useState({});
  const [nodata, setNoData] = useState(true);
  const [title, setTitle] = useState([]);
  const handletitle = (titles) => {
    // Use a Set to store unique titles efficiently
    const uniqueTitles = new Set(titles);
    setTitle(Array.from(uniqueTitles));
  };
  useEffect(() => {
    getDepartment().then((res) => {
      setDepartmentOptions(res);
    }).catch(e=>{
      toast.error("Something went Wrong")
    });
    getLocation().then((res) => {
      setLocationOptions(res);
    }).catch(e=>{
      toast.error("Something went Wrong")
    });;
    getFunction().then((res) => {
      setFunctionOptions(res);
    }).catch(e=>{
      toast.error("Something went Wrong")
    });;
  }, [setDepartmentOptions, setFunctionOptions, setLocationOptions]);

  useEffect(() => {
    setTitle([]);
    if (debouncedSearchTerm.current) {
      clearTimeout(debouncedSearchTerm.current);
    }

    debouncedSearchTerm.current = setTimeout(() => {
    
      const query = {
        q: searchJob,
        ...Object.fromEntries(
          selectedFilters.map((filter) => {
            return filter.value ? [filter.name, filter.value] : undefined;
          })
        ),
      };

      getJobs(query).then((res) => {
        if (res.length > 0) {
          setNoData(true);
          handletitle(res.map((job) => job.department.title));
          setGroupedJobs(res);
        } else {
          setNoData(false);
        }
      }).catch(e=>{
        toast.error("Something went Wrong")
      });
    }, 500); // Adjust debounce delay as needed
  }, [department, location, functions, searchJob, selectedFilters]);

  return (
    <div className="container-fluid my-2">
      <div className="d-flex flex-column gap-2">
        <div className="p-2" style={{ background: `var(--gray_300)` }}>
          <div className="row">
            <div className="col">
              <SearchBar
                placeholder={"Search for Job"}
                value={searchJob}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="row my-2 ">
            <div className="col">
              <DynamicSelect
                onSelect={handleDepartment}
                select={"Department"}
                options={departmentoptions}
                value={department}
              />
            </div>
            <div className="col">
              <DynamicSelect
                onSelect={handleLocation}
                select={"Location"}
                options={locationoptions}
                value={location}
              />
            </div>
            <div className="col">
              <DynamicSelect
                onSelect={handleFunctions}
                select={"Functions"}
                options={functionoptions}
                value={functions ? functions : ""}
              />
            </div>
          </div>
        </div>

        {selectedFilters.length > 0 && (
          <div className="p-2" style={{ background: `var(--gray_300)` }}>
            <div className="d-flex justify-content-between align-items-start">
              <div className=" d-flex align-items-end gap-2">
                {selectedFilters.map((filter) => (
                  <FilterContainer
                    filter={filter}
                    handleDeleteFilter={handleDeleteFilter}
                  />
                ))}
              </div>
              <div >
                <TextButton
                  name={"clear all"}
                  color="--primary_color"
                  onClick={handleClearAllFilters}
                />
              </div>
            </div>
          </div>
        )}

        < >
          {nodata ? (
            title.map((title) => {
              return (
                <div className="py-3">
                  <JobCategory title={title} />

                  {groupedJobs.map(
                    (job) =>
                      title === job.department.title && (
                        <JobContainer job={job} className={"p-0 m-0 h5"} />
                      )
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center m-5 w-35">
              <img
                src="/assets/images/9264885.jpg"
                width={340}
                height={340}
                alt="no-data"
              />
            </div>
          )}
        </>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default JobSearch;
