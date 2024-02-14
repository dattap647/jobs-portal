import { Api, baseurl, endpoints } from "./config";

export const getFunction = () => {
  return Api("GET", `${baseurl}${endpoints.FUNCTION}`).then((res) => res.data);
};

export const getDepartment = () => Api("GET", `${baseurl}${endpoints.DEPARTMENTS}`).then(
    (res) => res.data
  );


export const getLocation = () => {
  return Api("GET", `${baseurl}${endpoints.LOCATION}`).then((res) => res.data);
};

export const getJobs = (query) => {
 
  return Api("GET", `${baseurl}${endpoints.JOBS}`, query).then(
    (res) => res.data
  );
};

export const getJobDetail = (id) => {
 
  return Api("GET", `${baseurl}${endpoints.JOBS}/${id}`).then(
    (res) => res.data
  );
};
