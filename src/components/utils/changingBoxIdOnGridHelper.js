export const changeBoxId = (activeBox, axis, changeValue, width, height, setActiveBox) => {
  let result = [];
  let YArraySlice = [];
  let XArraySlice = [];
  const XYSlices = (i, j, axis) => {
    if (axis === 'x') {
      const xSlice = +activeBox[i].slice(j + 1) + changeValue;
      XArraySlice.push(xSlice);
      return xSlice;
    } else {
      const ySlice = +activeBox[i].slice(0, j) + changeValue;
      YArraySlice.push(ySlice);
      return ySlice;
    }
  };

  for (let i = 0; i < activeBox.length; i++) {
    for (let j = 0; j < activeBox[i].length; j++) {
      if (axis === 'x' && activeBox[i][j] === '.') {
        result.push(activeBox[i].slice(0, j + 1) + XYSlices(i, j, axis));
      } else if (axis === 'y' && activeBox[i][j] === '.') {
        result.push(XYSlices(i, j, axis) + activeBox[i].slice(j));
      }
    }
  }



  const isGoingOutOfRange = (XArraySlice, YArraySlice) => {
    if (
      XArraySlice.every((xSlice) => width >= xSlice && xSlice > 0) &&
      YArraySlice.every((ySlice) => height >= ySlice && ySlice >= 0)
    ) {
      return setActiveBox(result);
    } else {
      return setActiveBox(activeBox);
    }
  };
  isGoingOutOfRange(XArraySlice, YArraySlice);



  ((XArraySlice, YArraySlice) => { // IIFE out of range function 
    if (
      XArraySlice.every((xSlice) => width >= xSlice && xSlice > 0) &&
      YArraySlice.every((ySlice) => height >= ySlice && ySlice >= 0)
    ) {
      return setActiveBox(result);
    } else {
      return setActiveBox(activeBox);
    }
  })(XArraySlice, YArraySlice);
};
