// init 1-64 buttons with index and display status
const populateBtnList = () => {
  let temp = [];
  for (let i = 0; i < 64; i++) {
    temp.push({ index: i, showMe: false });
  }
  return temp;
};

export default populateBtnList;