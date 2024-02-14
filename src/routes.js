import React from "react";
import { createBrowserRouter } from "react-router-dom";
import JobSearch from "./Pages/JobSearch/JobSearch";
import JobDetails from "./Pages/JobDetail/JobDetails";

export const router = createBrowserRouter([
  { exct: true, path: "/", name: "jobOpening", element: <JobSearch /> },
  { path: "/jobdetails/:jobId", name: "jobOpening", element: <JobDetails /> },
]);
