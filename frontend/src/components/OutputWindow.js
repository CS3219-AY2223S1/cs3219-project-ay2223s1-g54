import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre>
          {outputDetails?.compile_output}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre>
          {outputDetails.stdout !== null
            ? `${outputDetails.stdout}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre>
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre>
          {outputDetails?.stderr}
        </pre>
      );
    }
  };
  return (
    <>
      <h1>
        Output
      </h1>
      <div>
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export { OutputWindow };
