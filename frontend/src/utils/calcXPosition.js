// calc the X coordinates of btns
  const calcXPosition = (index) => {
    if (
      index === 0 ||
      index === 8 ||
      index === 16 ||
      index === 24 ||
      index === 32 ||
      index === 40 ||
      index === 48 ||
      index === 56
    ) {
      return 1;
    } else if (
      index === 1 ||
      index === 9 ||
      index === 17 ||
      index === 25 ||
      index === 33 ||
      index === 41 ||
      index === 49 ||
      index === 57
    ) {
      return 2;
    } else if (
      index === 2 ||
      index === 10 ||
      index === 18 ||
      index === 26 ||
      index === 34 ||
      index === 42 ||
      index === 50 ||
      index === 58
    ) {
      return 3;
    } else if (
      index === 3 ||
      index === 11 ||
      index === 19 ||
      index === 27 ||
      index === 35 ||
      index === 43 ||
      index === 51 ||
      index === 59
    ) {
      return 4;
    } else if (
      index === 4 ||
      index === 12 ||
      index === 20 ||
      index === 28 ||
      index === 36 ||
      index === 44 ||
      index === 52 ||
      index === 60
    ) {
      return 5;
    } else if (
      index === 5 ||
      index === 13 ||
      index === 21 ||
      index === 29 ||
      index === 37 ||
      index === 45 ||
      index === 53 ||
      index === 61
    ) {
      return 6;
    } else if (
      index === 6 ||
      index === 14 ||
      index === 22 ||
      index === 30 ||
      index === 38 ||
      index === 46 ||
      index === 54 ||
      index === 62
    ) {
      return 7;
    } else if (
      index === 7 ||
      index === 15 ||
      index === 23 ||
      index === 31 ||
      index === 39 ||
      index === 47 ||
      index === 55 ||
      index === 63
    ) {
      return 8;
    } else {
      return "";
    }
  };

  export default calcXPosition;