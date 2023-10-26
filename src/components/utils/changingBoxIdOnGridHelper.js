export const changeBoxId = (activeBox, axis, changeValue, width, height, setActiveBox) => {
  debugger;
  let result = [];
  // const xSlice = (i) => {
  //   const xSlice = +boxId.slice(i + 1) + changeValue;
  //   if (width >= xSlice && 0 < xSlice) {
  //     return xSlice;
  //   } else {
  //     return boxId.slice(i + 1);
  //   }
  // };
  const ySlice = (i, JESTER) => {
    const ySlice = +activeBox[i].slice(0, JESTER) + changeValue;
    if (height >= ySlice && 0 <= ySlice) {
      return ySlice;
    } else {
      return activeBox[i].slice(0, JESTER);
    }
  };

  for (let i = 0; i < activeBox.length; i++) {
    for (let JESTER = 0; JESTER < activeBox[i].length; JESTER++) {
      if (axis === 'x' && activeBox[i][JESTER] === '.') {
        // setBoxId((boxId = boxId.slice(0, i + 1) + xSlice(i)));
        // console.log(+boxId.slice(0, i) + changeValue + boxId.slice(i));
      } else if (axis === 'y' && activeBox[i][JESTER] === '.') {
        result.push((ySlice(i, JESTER) + activeBox[i].slice(JESTER)))
        // setBoxId((boxId = ySlice(i) + boxId.slice(i)));
        // console.log(boxId.slice(0, i+1) + (+boxId.slice(i+1)+changeValue));
      }
    }
  }
  setActiveBox(result);
};



// add new t