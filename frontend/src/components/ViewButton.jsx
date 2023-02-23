import React from "react";

const ViewButton = ({
  title,
  M,
  A,
  viewBold,
  handleViewBold,
  setFirstValue,
  setSecondValue,
  startMessage = "",
  handleBtnTitle,
}) => {
  const handleBtn = () => {
    if (startMessage !== "M" || startMessage !== "A") {
      handleViewBold(title);
      setFirstValue(M);
      setSecondValue(A);
    }
    handleBtnTitle(title);
  };

  return (
    <div
      className={`${viewBold && "makeMeBolder"} ${
        (startMessage === "M" || startMessage === "A") && "makeMeDisable"
      } viewBtn`}
      onClick={handleBtn}
    >
      {title + ": " + M + "," + A}
    </div>
  );
};

export default ViewButton;
