import React from "react";

const ViewButtonResult = ({ title, value1 = "" }) => {
  return (
    <h6>
      {title}
      {value1 !== "" && ": " + value1}
    </h6>
  );
};

export default ViewButtonResult;
