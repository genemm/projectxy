import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Button from "../components/Button";
import ViewButton from "../components/ViewButton";
import ViewButtonResult from "../components/ViewButtonResult";
import "../app.css";

import { usePlayScreenContext } from "../context/PlayScreenContext"
import { useSocketContext } from "../context/SocketContext";
import { FM, FA, SM, SA, LeftCounter, bottomCounter } from "../constants/playScreenConstants"
import calcXPosition from "../utils/calcXPosition"
import calcYPosition from "../utils/calcYPosition"
import { useEffect } from "react";


const PlayScreen = () => {
  const [opponentMoveData, setOpponentMoveData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasOpponentAttacked, setHasOppoentAttacked] = useState(false);

  const {
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
  } = usePlayScreenContext();

  const { socket } = useSocketContext();

  const checkWinningCondition = () => {
    if (startMessage !== "Act") return;
    if (socket) {
    console.log("From winning condition: ", opponentMoveData);

      if(opponentMoveData) {
        const { iXM, iYM } = opponentMoveData;
        // winning condition
        if (thirdXPosition === iXM && thirdYPosition === iYM) {
          socket.emit("gameover")
          setHasOppoentAttacked(false);
          setOpponentMoveData(null);
          alert("You won game!")
            return <Navigate to="/" replace={true} />
          
        }
      } else {
        console.log("No opponent move data")
      }
      
		} else {
      alert("No socket connection. Please refresh game.")
    }
    setHasOppoentAttacked(false);
    setOpponentMoveData(null)
  }


  useEffect(() => {
    socket.on("move", handleMovePhase);
    socket.on("attack", handleAttack);
    socket.on("gameover", handleGameOver);

    return () => {
      socket.off("move", handleMovePhase);
      socket.off("attack", handleAttack);
      socket.off("gameover", handleGameOver);

    }

  }, [socket])

  const handleMovePhase = (data) => {
    console.log("From handleMovePhase: ", data);
    setOpponentMoveData(data);
  }

  const handleAttack = () => {
    setIsWaiting(false);
    setHasOppoentAttacked(true)
    // console.log("Opponent has attacked")
    // checkWinningCondition()
    // handleQuestion()
  }

  const handleGameOver = (data) => {
    alert("You lost game!");
    setHasOppoentAttacked(false);
    setOpponentMoveData(null)
    return <Navigate to="/" replace={true} />
  }

  const handleNext = () => {
    if(isWaiting) return;
    if(startMessage === "Act") {
      socket.emit("attack")
    }
    if(!opponentMoveData && startMessage === "Act") {
      setIsWaiting(true);
      return
    }
    checkWinningCondition()
    handleQuestion()
  }

  useEffect(() => {
    if(isWaiting || !opponentMoveData || !hasOpponentAttacked) return;
    console.log("I am logging!")
    handleNext()
  }, [isWaiting, hasOpponentAttacked])

  // useEffect(() => {
  //   if(opponentActData) {
  //     console.log(opponentActData)
  //     const {iXA, iYA, iXP, iYP } = opponentActData;
  //     // winning condition
  //     if (thirdXPosition === iXP && thirdYPosition === iYA) {
  //       alert("You won game!")
  //       socket.emit("gameover")
  //     }
  //   }
  // }, [opponentActData])
  
  // retrun one btn and helps to shorten the code
  const customButton = (index, showMe) => {
    return (
      <Button
        key={index}
        clickable={clickableBtn}
        viewBoldFirst={viewBoldFirst}
        viewBoldSecond={viewBoldSecond}
        setShowQuestionBtn={setShowQuestionBtn}
        index={index}
        handlePostion={handlePostion}
        showMe={showMe}
        selectedTitle={selectedTitle}
        positionTwo={positionTwo}
        positionThree={positionThree}
      />
    );
  };

  return (
    <div className="homeWrapper">
      <h3>Project XY</h3>
      {/* Message div */}
      <div
        className={`${startMessage === "Start" && "clickable"} start ${
          (startMessage === "Move" || startMessage === "Act") && "makeMeDisable"
        }`}
        onClick={handleStart}
      >
        {startMessage}
      </div>

      {/* MC, AC, XP, Yp, XM, YM, XA and YA */}
      <div className="viewBtnWrapper">
        {startMessage === "Move" || startMessage === "Act" ? (
          <div className="viewBtns">
            {viewBoldFirst && (
              <ViewButton
                title="First"
                M={FM}
                A={FA}
                viewBold={viewBoldFirst}
                handleViewBold={handleViewBold}
                setFirstValue={setFirstValue}
                setSecondValue={setSecondValue}
                startMessage={startMessage}
                handleBtnTitle={handleBtnTitle}
              />
            )}
            {viewBoldSecond && (
              <ViewButton
                title="Second"
                M={SM}
                A={SA}
                viewBold={viewBoldSecond}
                handleViewBold={handleViewBold}
                setFirstValue={setFirstValue}
                setSecondValue={setSecondValue}
                startMessage={startMessage}
                handleBtnTitle={handleBtnTitle}
              />
            )}
          </div>
        ) : (
          startMessage === "Choose" && (
            <div className="viewBtns">
              <ViewButton
                title="First"
                M={FM}
                A={FA}
                viewBold={viewBoldFirst}
                handleViewBold={handleViewBold}
                setFirstValue={setFirstValue}
                setSecondValue={setSecondValue}
                handleBtnTitle={handleBtnTitle}
              />
              <ViewButton
                title="Second"
                M={SM}
                A={SA}
                viewBold={viewBoldSecond}
                handleViewBold={handleViewBold}
                setFirstValue={setFirstValue}
                setSecondValue={setSecondValue}
                handleBtnTitle={handleBtnTitle}
              />
            </div>
          )
        )}
        {showResults && (
          <div className="viewBtnResult">
            <ViewButtonResult title="MC" value1={firtValue} />
            <ViewButtonResult title="AC" value1={secondValue} />
            <ViewButtonResult title="XP" value1={xposition} />
            <ViewButtonResult title="YP" value1={yposition} />
            <ViewButtonResult title="XM" value1={secondXPosition} />
            <ViewButtonResult title="YM" value1={secondYPosition} />
            <ViewButtonResult title="XA" value1={thirdXPosition} />
            <ViewButtonResult title="YA" value1={thirdYPosition} />
          </div>
        )}
      </div>

      <div className="contentWrapper">
        <div className="btnWrapper">
          {/* empty vertical column helps to the bottom/x axsis verically */}
          <div className="labelGrid">
            {LeftCounter.map((item, index) => (
              <h6 key={index} className="counter">
                {""}
              </h6>
            ))}
          </div>
          <div className="btnGrid">
            {/* 
            1st condition: render all the 64 btns
            2nd condition: render each btn with blue background if they are within the specifying distance and dont include the current selected position(position one)
            3rd condition:
              3.1 condition: render each btn with red background if they are within the specifying distance from position two and position one as well and dont include the current selected position(position two)
              3.2 condition: repeat 2nd condition
              3.3 condition: render each button with green background
            */}
            {positionOne === null &&
            positionTwo === null &&
            positionThree === null
              ? btnList.map((item, index) => customButton(index, item.showMe))
              : (positionOne !== null &&
                  positionTwo === null &&
                  positionThree === null) ||
                startMessage === "Move"
              ? btnList.map((item, index) =>
                  checkFirstDistance(index, FM) &&
                  (positionOne[0] !== calcXPosition(index) ||
                    positionOne[1] !== calcYPosition(index)) ? (
                    <Button
                      key={index}
                      clickable={true}
                      viewBoldFirst={viewBoldFirst}
                      viewBoldSecond={viewBoldSecond}
                      setShowQuestionBtn={setShowQuestionBtn}
                      index={index}
                      handlePostion={handlePostion}
                      startMessage={startMessage}
                      neighbour={neighbour}
                      showMe={item.showMe}
                      selectedTitle={selectedTitle}
                      positionTwo={positionTwo}
                      positionThree={positionThree}
                    />
                  ) : (
                    customButton(index, item.showMe)
                  )
                )
              : btnList.map((value, index) =>
                  checkSecondDistance(index) &&
                  startMessage === "Act" &&
                  (positionTwo[0] !== calcXPosition(index) ||
                    positionTwo[1] !== calcYPosition(index)) ? (
                    <Button
                      key={index}
                      clickable={true}
                      viewBoldFirst={viewBoldFirst}
                      viewBoldSecond={viewBoldSecond}
                      setShowQuestionBtn={setShowQuestionBtn}
                      index={index}
                      handlePostion={handlePostion}
                      startMessage={startMessage}
                      neighbourInside={neighbourInside}
                      showMe={value.showMe}
                      selectedTitle={selectedTitle}
                      positionTwo={positionTwo}
                      positionThree={positionThree}
                    />
                  ) : checkFirstDistance(index) &&
                    (positionTwo[0] !== calcXPosition(index) ||
                      positionTwo[1] !== calcYPosition(index)) &&
                    (positionOne[0] !== calcXPosition(index) ||
                      positionOne[1] !== calcYPosition(index)) ? (
                    <Button
                      key={index}
                      clickable={false}
                      viewBoldFirst={viewBoldFirst}
                      viewBoldSecond={viewBoldSecond}
                      setShowQuestionBtn={setShowQuestionBtn}
                      index={index}
                      handlePostion={handlePostion}
                      startMessage={startMessage}
                      neighbour={neighbour}
                      showMe={value.showMe}
                      selectedTitle={selectedTitle}
                      positionTwo={positionTwo}
                      positionThree={positionThree}
                    />
                  ) : (
                    customButton(index, value.showMe)
                  )
                )}
          </div>
          {/* render Y axsis values */}
          <div className="labelGrid">
            {LeftCounter.map((item, index) => (
              <h6 key={index} className="counter">
                {item}
              </h6>
            ))}
          </div>
        </div>

        {/* render X axsis values */}
        <div className="bottomLabelGrid">
          <h6 className="bottomCounter">X</h6>
          {bottomCounter.map((item, index) => (
            <h6 key={index} className="bottomCounter">
              {item}
            </h6>
          ))}
          <h6 className="bottomCounter">Y</h6>
        </div>

        {/* Back button and ? button */}
        <div className="bottomBtnwrapper">
          {showBackBtn && (
            <div className="questionBtn" onClick={handleBackBtn}>
              Back
            </div>
          )}
          {showQuestionBtn && (
            <div className="questionBtn" onClick={handleNext}>
              {isWaiting ? "Waiting for opponent" : "Next"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayScreen;
