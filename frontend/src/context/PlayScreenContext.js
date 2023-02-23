import React, { createContext, useContext, useState, useEffect } from "react"

import calcXPosition from "../utils/calcXPosition"
import calcYPosition from "../utils/calcYPosition"
import populateBtnList from "../utils/populateBtnList"

import { GameContext } from "./GameContext";
// import { SocketContext } from "./SocketContext";
import { UserContext } from "./UserContext";

const Context = createContext()

export const PlayScreenContext = ({ children }) => {
  	const [startMessage, setStartMessage] = useState("Start"); // command messages:- start or choose or M or A
  	const [btnList] = useState(populateBtnList()); // array of 64 buttons

	const [selectedTitle, setSelectedTitle] = useState("");
	const [xposition, setXPosition] = useState(""); // x - coordinate for 1st position
	const [yposition, setYPosition] = useState(""); // y - coordinate for 1st position
	const [secondXPosition, setSecondXPosition] = useState(""); // x - coordinate for 2nd position
	const [secondYPosition, setSecondYPosition] = useState(""); // y - coordinate for 2nd position
	const [thirdXPosition, setThirdXPosition] = useState(""); // x - coordinate for 3rd position
	const [thirdYPosition, setThirdYPosition] = useState(""); // y - coordinate for 3rd position
	const [viewBoldFirst, setViewBoldFirst] = useState(false); // bold first btn
	const [viewBoldSecond, setViewBoldSecond] = useState(false); // bold second btn
	// const [viewBoldSecond, setViewBoldSecond] = useState(false); // bold second btn
	const [firtValue, setFirstValue] = useState(0); // the 1st value of each btn displayed under the 2 command button
	const [secondValue, setSecondValue] = useState(0); // the 2nd value of each btn displayed under the 2 command button
	const [showResults, setShowResults] = useState(false); // show/hide all btns displayed under the 2 command button
	const [clickableBtn, setClickableBtn] = useState(false); // manage the clickable status of each btn
	const [showQuestionBtn, setShowQuestionBtn] = useState(false); // manage the status of ? btn
	const [showBackBtn, setShowBackBtn] = useState(false); // manage the status of 'Back' btn
	const [positionOne, setPositionOne] = useState(null); // the first F or S btn coordinates
	const [positionTwo, setPositionTwo] = useState(null); // the second F or S btn coordinates
	const [positionThree, setPositionThree] = useState(null); // the second F or S btn coordinates
	const [neighbour, setNeighbour] = useState(false); // the status of each btn that have background of blue
	const [neighbourInside, setNeighbourInside] = useState(false); // the status of each btn that have background of red

	const [blueBtns, setBlueBtns] = useState([]); //array of the indexes of the buttons that should turn blue
	const [redBtns, setRedBtns] = useState([]); //array of the indexes of the buttons that should turn red
	const [order, setOrder] = useState(""); // This controls the scene and should be set to either 'first', 'second' or 'third'
	const handleBtnTitle = (title) => {
	setSelectedTitle(title.charAt(0));
	};
	const {
	squares: _squares,
	winner: _winner,
	isX: _isX,
	multiplayer: _multiplayer,
	nextPlayer: _nextPlayer,
	} = useContext(GameContext);

	const [nextPlayer, setNextPlayer] = _nextPlayer;
	// const {socket} = useContext(SocketContext);
	const [winner, setWinner] = _winner;
	const [isX, setIsX] = _isX;
	const [multiplayer] = _multiplayer;
	const [exit, setExit] = useState(false);
	const [text, setText] = useState("");
	const [typing, setTyping] = useState(false);

	// start the program
  const handleStart = () => {
    if (startMessage === "Move" || startMessage === "Act") return;

    setStartMessage("Choose");
  };

  // set bold or normal font weight
  const handleViewBold = (title) => {
    if (title === "First") {
      setViewBoldFirst(true);
      setViewBoldSecond(false);
    } else {
      setViewBoldFirst(false);
      setViewBoldSecond(true);
    }
    setShowResults(true);
    setClickableBtn(true);
  };

  // the operation of ? btn
  const handleQuestion = () => {
    if (order === "third") {
      setXPosition(secondXPosition); // XP becomes XA
      setYPosition(secondXPosition); // YP becomes YA
      // setFromQuestionBtn((prev) => true);

      setPositionOne(positionTwo); // positionOne becomes positionTwo
      // setPositionTwo(null);
      // setPositionThree(null);

      setNeighbour(true);
      setNeighbourInside(false); // remove the red buttons

      // clear secondPosition X and Y values
      setSecondXPosition("");
      setSecondYPosition("");
      setShowBackBtn(false);

      handlePostion(positionTwo[2], "first"); // generate new acceptedBtns
      handleBackBtn(null, true); //null has to be past because handleBackBtn gets passed event by default from the onClick function
    } else if (startMessage === "Choose") {
      setStartMessage("Move");
      setShowBackBtn(false);
      setNeighbour(true);
    } else if (startMessage === "Move") {
      setStartMessage("Act");
      setShowBackBtn(true);
      setNeighbourInside(true);
    }
    setClickableBtn(false);
    setShowQuestionBtn(false);
  };

  // the operation of 'Back' btn
  const handleBackBtn = (e, fromQuestionBtn = false) => {
    // If the order is first and back is clicked it resets everything to the point where all buttons are green. This is no longer useful since the backbtn is hidden but I still kept it here incase you would want to implement that later.
    if (order === "first") {
      setPositionOne(null);
      setPositionTwo(null);
      setPositionThree(null);

      setShowBackBtn(false);
      setStartMessage("Choose");
      setClickableBtn(true);

      setXPosition("");
      setYPosition("");
      setSecondXPosition("");
      setSecondYPosition("");
      setThirdXPosition("");
      setThirdYPosition("");

      setNeighbour(false);
      setNeighbourInside(false);

      setBlueBtns([]);
      setRedBtns([]);
      for (let i = 0; i < 63; i++) {
        btnList[i].showMe = false;
      }
    } else if (order === "second") {
      // Resets the environment to XP and YP alone with the generated buttons
      setPositionTwo(null);
      setPositionThree(null);

      setStartMessage("Move");

      setSecondXPosition("");
      setSecondYPosition("");
      setThirdXPosition("");
      setThirdYPosition("");
      setShowBackBtn(false);
      setShowQuestionBtn(false);
      setOrder("first");

      setNeighbourInside(false);

      setRedBtns([]); // clears the red buttons array
      for (let i = 0; i < 64; i++) {
        if (btnList[i].index !== positionOne[2]) {
          btnList[i].showMe = false;
        }
      }
    } else if (order === "third") {
      let positionTwoIndex = positionTwo[2]; // get the index of the red button that was clicked
      let positionThreeIndex = positionThree[2]; // get the index of the red button that was clicked
      // setPositionTwo(null);
      // setPositionThree(null);
      setPositionThree(null);

      setThirdXPosition("");
      setThirdYPosition("");
      setOrder("second");

      if (fromQuestionBtn) {
        // if this was called from the handleQuestionBtn function then do this
        setPositionTwo(null);
        setPositionThree(null);
        setStartMessage("Move");
        setRedBtns([]);
        for (let i = 0; i < 64; i++) {
          if (btnList[i].index !== positionTwoIndex) {
            btnList[i].showMe = false;
          } else {
            btnList[i].showMe = true;
          }
        }
      } else {
        // else just hide the F on the red button
        if (btnList[positionOne[2]].index === positionThreeIndex) {
          // btnList[positionOne[2]].showMe = true;
          setShowQuestionBtn(false);
          return;
        } else {
          btnList[positionThree[2]].showMe = false;
          setShowQuestionBtn(false);
        }
      }
    }
  };

  // This function generates all the buttons that should be turned blue or red.
  // It accepts an index of the particular button that was clicked on, the distance
  // and a 'red' variable to differentiate between the blue and red buttons.
  // The function works by carrying out the following steps:
  // 1. Get the left, right, top and bottom of the selected button and add it to the list a list of red or blue btns depending on the value of red. This is the needed diamond shape.
  // 2. Perform checks to take care of edge cases like when the index is at the edge or vertexes.
  // 3. Recursively repeat the function for the left, right, top and bottom until the required distance is reached
  const generateAcceptedBtns = (index, distance, red = false) => {
    if (distance === 0 || distance === null || index === null) return;

    let left = index - 1;
    let right = index + 1;
    let top = index - 8;
    let bottom = index + 8;

    // if the Y position of the index is different from the Y position of the left value, then it has spilled out of bounds and should not be computed. Same thing for the right value
    // if the X position of the index is different from the X position of the bottom then it has spilled out of bounds and should not be computed. Same thing for the top value.
    if (calcYPosition(index) !== calcYPosition(left)) {
      left = null;
    } else if (calcYPosition(index) !== calcYPosition(right)) {
      right = null;
    } else if (calcXPosition(index) !== calcXPosition(bottom)) {
      bottom = null;
    } else if (calcXPosition(index) !== calcXPosition(top)) {
      top = null;
    }

    // Recursively run the function on the left, right, top and bottom
    if (!red) {
      setBlueBtns((prev) => [...prev, left, right, top, bottom]);
      generateAcceptedBtns(left, distance - 1);
      generateAcceptedBtns(right, distance - 1);
      generateAcceptedBtns(top, distance - 1);
      generateAcceptedBtns(bottom, distance - 1);
    } else {
      setRedBtns((prev) => [...prev, left, right, top, bottom]);
      generateAcceptedBtns(left, distance - 1, true);
      generateAcceptedBtns(right, distance - 1, true);
      generateAcceptedBtns(top, distance - 1, true);
      generateAcceptedBtns(bottom, distance - 1, true);
    }
  };

  // set the coordinates of each positions and call the generateAcceptedBtns function
  const handlePostion = (index, orderVar) => {
    // Get the X and Y position of index
    const x = calcXPosition(index);
    const y = calcYPosition(index);

    if (orderVar === "first") {
      // if true then the button clicked on is a green one, set XP, YP
      setXPosition(x);
      setYPosition(y);
      setOrder("first"); // switch the order to first to keep track of this point
      setBlueBtns((prev) => []); // clear array to remove left over indexes before new ones are generated
      setPositionOne([x, y, index]);
      generateAcceptedBtns(index, firtValue); // generate indexes to turn blue
    } else if (orderVar === "second") {
      // if true then the button clicked on is a blue one, set XM, YM
      setSecondXPosition(x);
      setSecondYPosition(y);
      setShowBackBtn(false);
      setOrder("second");
      setRedBtns((prev) => []);
      setPositionTwo([x, y, index]);
      generateAcceptedBtns(index, secondValue, true); // generate indexes to turn red
    } else if (orderVar === "third") {
      // if true then the button clicked on is a red one, set XA, YA
      setShowBackBtn(true);
      setOrder("third");
      setThirdXPosition(x);
      setThirdYPosition(y);
      setPositionThree([x, y, index]);
    }

    const current = btnList.findIndex((item) => item.index === index);
    btnList[current].showMe = true;

    if (startMessage === "Move") {
      for (let i = 0; i < 64; i++) {
        if (btnList[i].index !== index && btnList[i].index !== positionOne[2]) {
          btnList[i].showMe = false;
        }
      }
    } else if (startMessage === "Act") {
      for (let i = 0; i < 64; i++) {
        if (
          btnList[i].index !== index &&
          btnList[i].index !== positionOne[2] &&
          btnList[i].index !== positionTwo[2]
        ) {
          btnList[i].showMe = false;
        }
      }
    } else {
      for (let i = 0; i < 64; i++) {
        if (btnList[i].index !== index) {
          btnList[i].showMe = false;
        }
      }
    }
  };

  // this useEffect hook makes sure if the firstValue (MC) changes it regenerates the blue buttons is the distance of the updated MC.
  useEffect(() => {
    if (positionOne) {
      handlePostion(positionOne[2], "first");
    }
  }, [firtValue]);

  

  

  // Now this functions checks if the index passed in it is in the acceptedBtns array, if it is it returns true else false.
  // This is for the blue buttons
  const checkFirstDistance = (index) => {
    let res = blueBtns.includes(index);
    return res;
  };

  // Now this functions checks if the index past is in the acceptedBtns array, if it is it returns true else false.
  // This is for the red buttons
  const checkSecondDistance = (index) => {
    let res = redBtns.includes(index);
    return res;
  };



	return (
		<Context.Provider value={{
			clickableBtn, 
			viewBoldFirst, 
			viewBoldSecond, 
			handleViewBold,
			setShowQuestionBtn, 
			handlePostion,
			selectedTitle,
			positionOne,
			positionTwo,
			positionThree,
			startMessage,
			handleStart,
			setFirstValue,
			setSecondValue,
			handleBtnTitle,
			showResults,
			btnList,
			neighbour,
			showBackBtn,
			handleBackBtn,
			handleQuestion,
			checkFirstDistance,
			checkSecondDistance,
			firtValue,
			secondValue,
			xposition,
			yposition,
			secondXPosition,
			secondYPosition,
			thirdXPosition,
			thirdYPosition,
			neighbourInside,
			showQuestionBtn
		}}>{children}</Context.Provider>
		);
}

export const usePlayScreenContext = () => useContext(Context)

