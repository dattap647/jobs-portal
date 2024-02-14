import React, { useEffect, useState } from "react";
import JobContainer from "../../Components/JobContainer/JobContainer";
import Buttons from "../../Components/Button/Buttons";
import { useParams } from "react-router-dom";
import { getJobDetail, getJobs } from "../../API/api";
import JobCategory from "../../Components/JobCategory/JobCategory";
import { useParentContext } from "../../context/ParentContext";
import { ToastContainer, toast } from "react-toastify";

const JobDetails = () => {
  const { jobId } = useParams();
  const [data, setData] = useState([]);
  const [otherJob, setOtherJobs] = useState([]);
  const { handleClick, shareFacebook, shareLinkdin, shareTwitter } =
    useParentContext();

  useEffect(() => {
    getJobDetail(jobId).then((res) => {
      setData([res]);
      const query = {
        dept: res.department.id,
      };
      getJobs(query).then((res) => {
        setOtherJobs(res);
      });
    }).catch(e=>{
      toast.error("Something went Wrong")
    });;
  }, [jobId]);

  return (
    <div key={jobId}>
      {data.map((job) => {
        return (
          <>
            <div className="d-flex flex-column mx-2 ">
              <div className="h4 m-0 ms-1">
                {job.department.title} Department At {job.company} {job.location.title}
              </div>
              <JobContainer
                job={job}
                className={"p-0 m-0 h4"}
                showButton={false}
              />
              <div className="pt-3 w-75 ms-1">
                <Buttons
                  name={"Apply"}
                  onClick={() => handleClick(job.applyUrl)}
                />
              </div>
            </div>
            <hr
              className="mx-2"
              style={{
                color: `var(--blue)`,
                borderTop: "1px solid var(--blue)",
              }}
            />
            <>
              <div className="row">
                <div className="col-lg-8">
                  <div className="mx-3">
                    <div
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>
                </div>
                <div className="col-lg-4 ">
                  <div className="d-flex flex-column justify-content-between gap-5">
                    <div
                      className="p-3 border "
                      style={{
                        background: `var(--blue_300)`,
                      }}
                    >
                      <JobCategory title={"OTHER JOB OPENING"} />

                      {otherJob.map(
                        (jobs) =>
                          jobs.id !== job.id && (
                            <JobContainer
                              job={jobs}
                              className={"p-0 m-0 h5"}
                              showButton={false}
                            />
                          )
                      )}
                    </div>

                    <>
                      <JobCategory title={"SHARE JOB OPENING"} />

                      <div className="d-flex gap-3 mt-3">
                        <img
                          src="/assets/Icons/facebook.svg"
                          width={40}
                          height={40}
                          alt="facebook"
                          onClick={() => shareFacebook(job.applyUrl, job.title)}
                        />
                        <img
                          src="/assets/Icons/twitter.svg"
                          width={40}
                          height={40}
                          alt="facebook"
                          onClick={() => shareTwitter(job.applyUrl, job.title)}
                        />
                        <img
                          src="/assets/Icons/linkdin.svg"
                          width={40}
                          height={40}
                          alt="facebook"
                          onClick={() => shareLinkdin(job.applyUrl, job.title)}
                        />
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </>
          </>
        );
      })}
      <ToastContainer/>
    </div>
  );
};

export default JobDetails;
