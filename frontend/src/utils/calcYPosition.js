// calc the Y coordinates of btns
  const calcYPosition = (index) => {
    if (index >= 0 && index <= 7) {
      return 8;
    } else if (index >= 8 && index <= 15) {
      return 7;
    } else if (index >= 16 && index <= 23) {
      return 6;
    } else if (index >= 24 && index <= 31) {
      return 5;
    } else if (index >= 32 && index <= 39) {
      return 4;
    } else if (index >= 40 && index <= 47) {
      return 3;
    } else if (index >= 48 && index <= 55) {
      return 2;
    } else if (index >= 56 && index <= 63) {
      return 1;
    } else {
      return "";
    }
  };

export default calcYPosition;