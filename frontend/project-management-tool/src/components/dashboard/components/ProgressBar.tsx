import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InitialState } from "src/redux/store";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const { aProject } = useSelector((state: InitialState) => state.projects);
  const [status, setStatus] = useState("Initiating");
  const initiating = aProject?.status.isInitiating;
  const executing = aProject?.status.isExecuting;
  const complete = aProject?.status.isComplete;
  const hosted = aProject?.status.isHosted;

  //   console.log("executing", aProject);

  //   console.log(complete, executing);

  useEffect(() => {
    setProgress((prev) =>
      hosted && initiating
        ? (prev = 100)
        : complete && initiating
        ? (prev = 75)
        : executing && initiating
        ? (prev = 50)
        : initiating
        ? (prev = 25)
        : prev
    );

    setStatus((prev) =>
      complete
        ? (prev = "Completed")
        : hosted
        ? (prev = "Hosted")
        : executing
        ? (prev = "Executing")
        : prev
    );
  }, [complete, executing, hosted, initiating]);

  return (
    <div>
      <div className="shadow w-full bg-grey-light mt-2">
        <div
          className="text-xs bg-pink-600 leading-none py-1 text-center text-white"
          style={{ width: `${progress}%` }}
        >
          {`${progress}%`}
        </div>
      </div>
      <p className="pt-4">
        <span className="font-bold">Status: </span>
        {status}
      </p>
    </div>
  );
};

export default ProgressBar;
