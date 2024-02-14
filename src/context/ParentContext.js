import React, { createContext, useContext, useEffect, useState } from "react";

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
  const [searchJob, setsearchJob] = useState(
    localStorage.getItem("searchJob") || ""
  );
  const [department, setDepartment] = useState(
    localStorage.getItem("department") || null
  );
  const [departmentoptions, setDepartmentOptions] = useState([]);
  const [locationoptions, setLocationOptions] = useState([]);
  const [location, setLocation] = useState(
    localStorage.getItem("location") || null
  );
  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(localStorage.getItem("selectedFilters")) || []
  );
  const [functions, setFunctions] = useState(
    localStorage.getItem("functions") || null
  );
  const [functionoptions, setFunctionOptions] = useState([]);
  //to preserve the state of dropdown
  useEffect(() => {
    localStorage.setItem("searchJob", searchJob);
    localStorage.setItem("department", department);
    localStorage.setItem("location", location);
    localStorage.setItem("functions", functions);
    localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [searchJob, department, functions, location, selectedFilters]);

  const handleSearch = (e) => {
    setsearchJob(e);
  };

  const handleDepartment = (e) => {
    let value = parseInt(e.target.value);
    const title = departmentoptions
      .filter((option) => option.id === value)
      .map((option) => option.title)[0];
    setDepartment(value);

    title && handleFilterSelect("Department", "dept", value, title);
  };

  const handleLocation = (e) => {
    let value = parseInt(e.target.value);
    const title = locationoptions
      .filter((option) => option.id === value)
      .map((option) => option.title)[0];
    setLocation(value);
    title && handleFilterSelect("Location", "loc", value, title);
  };

  const handleFunctions = (e) => {
    let value = parseInt(e.target.value);
    const title = functionoptions
      .filter((option) => option.id === value)
      .map((option) => option.title)[0];
    setFunctions(value);
    title && handleFilterSelect("Functions", "fun", value, title);
  };

  //function to delete the filter
  const handleDeleteFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));

    switch (filter.type) {
      case "Department":
        setDepartment("");
        break;
      case "Location":
        setLocation("");
        break;
      case "Functions":
        setFunctions("");
        break;
      default:
        break;
    }
  };

  //function to add the selected filter
  const handleFilterSelect = (type, name, value, title) => {
    setSelectedFilters(
      selectedFilters
        .filter((filter) => filter.type !== type)
        .concat({ type, name, value, title })
    );
  };

  // Function to clear all filters
  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setDepartment("");
    setLocation("");
    setFunctions("");
    setsearchJob("");
  };

  //apply button function
  const handleClick = (url) => (window.location.href = url);

  //Social Media share functions
  const shareFacebook = (applyUrl, title) =>
    (window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${applyUrl}&title=${title}`);
  const shareTwitter = (applyUrl, title) =>
    (window.location.href = `https://twitter.com/intent/tweet?text=${applyUrl}&title=${title}`);
  const shareLinkdin = (applyUrl, title) =>
    (window.location.href = `https://www.linkedin.com/sharing/share-offsite/?url=${applyUrl}&title=${title}`);
  const contextValue = {
    handleClick,
    shareFacebook,
    shareLinkdin,
    shareTwitter,
    searchJob,
    setsearchJob,
    handleSearch,
    department,
    setDepartment,
    handleDepartment,
    departmentoptions,
    setDepartmentOptions,
    location,
    setLocation,
    handleLocation,
    locationoptions,
    setLocationOptions,
    functions,
    setFunctions,
    handleFunctions,
    functionoptions,
    setFunctionOptions,
    handleDeleteFilter,
    handleClearAllFilters,
    handleFilterSelect,
    selectedFilters,
  };

  return (
    <ParentContext.Provider value={contextValue}>
      {children}
    </ParentContext.Provider>
  );
};

export const useParentContext = () => {
  const context = useContext(ParentContext);

  if (!context) {
    throw new Error("use parent context ");
  }

  return context;
};
