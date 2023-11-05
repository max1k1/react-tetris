export const changeBoxId = (
  activeBox,
  placedBoxes,
  axis,
  changeValue,
  width,
  height,
  setActiveBox,
  setPlacedBoxes,
) => {
  let result = [];
  let YArraySlice = [];
  let XArraySlice = [];
  let XYArraySlice = [];
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
      if (activeBox[i][j] === '.') {
        XYArraySlice.push(
          Number(activeBox[i].slice(0, j)) + 1 + '.' + (Number(activeBox[i].slice(j + 1)) + 1),
          Number(activeBox[i].slice(0, j)) + 1 + '.' + (Number(activeBox[i].slice(j + 1)) - 1),
        );
      }
    }
  }

  ((XArraySlice, YArraySlice, XYArraySlice) => {
    // IIFE - out of range function
    // console.log(activeBox);
    const avb = XYArraySlice.every((box) => {
      for (let i = 0; i < placedBoxes.length; i++) {
        if (box === placedBoxes[i]) {
          return false;
        }
      }
      return true;
    });
    if (avb) {
      if (XArraySlice.every((xSlice) => width >= xSlice && xSlice > 0)) {
        if (YArraySlice.every((ySlice) => height >= ySlice && ySlice > 0)) {
          return setActiveBox(result);
        } else {
          setPlacedBoxes([...placedBoxes, ...activeBox]);
          setActiveBox(['0.2', '0.3', '0.4', '1.3']); // here should be some random spawn system
        }
      } else {
        return setActiveBox(activeBox);
      }
    } else {
      setPlacedBoxes([...placedBoxes, ...activeBox]);
      setActiveBox(['0.2', '0.3', '0.4', '1.3']); // here should be some random spawn system
    }
  })(XArraySlice, YArraySlice, XYArraySlice);
};
