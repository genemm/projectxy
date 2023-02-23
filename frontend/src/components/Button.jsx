import React, { useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import calcXPosition from "../utils/calcXPosition"
import calcYPosition from "../utils/calcYPosition"

const Button = ({
  clickable,
  viewBoldFirst,
  viewBoldSecond,
  setShowQuestionBtn,
  handlePostion,
  index,
  neighbour = false,
  neighbourInside = false,
  startMessage,
  showMe,
  selectedTitle,
  positionTwo,
  positionThree,
}) => {
  const [showText, setShowText] = useState(false);
  const [btnTitle, setBtnTitle] = useState("");

  const { socket } = useSocketContext();

  const handleClick = () => {
    if (clickable) {
      viewBoldFirst
        ? setBtnTitle("F")
        : viewBoldSecond
        ? setBtnTitle("S")
        : setBtnTitle("");

      setShowQuestionBtn(true);

      if (neighbourInside) {
        // if true then it is the red button
        console.log("This is a red button")
        
        handlePostion(index, "third");
      } else {
        if (!neighbour) {
          console.log("This is a green button")
          handlePostion(index, "first");
        } else {
          setShowQuestionBtn(true);
          socket.emit("move", {
            iXM: calcXPosition(index),
            iYM: calcYPosition(index)
          });
          console.log("I will emit: ", calcXPosition(index), calcYPosition(index))

          handlePostion(index, "second");
        }
      }

      setShowText(true);
    }
  };

  return (
    <div
      className={`${clickable && "clickable"} ${
        (neighbour || (positionTwo && positionTwo[2] === index)) &&
        "neighbourBtn"
      } ${
        (neighbourInside || (positionThree && positionThree[2] === index)) &&
        "neighbourInsideBtn"
      } commandBtn`}
      onClick={handleClick}
    >
      {showMe && showText && selectedTitle}
    </div>
  );
};
export default Button;
