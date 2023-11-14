import { Box } from './boxGenerator';

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
  const box = new Box(Math.floor(Math.random() * (9 - 1 + 1) + 1), 0);

  let result = [];
  let YArraySlice = [];
  let XArraySlice = [];
  let prospectiveBoxStep = [];
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
        prospectiveBoxStep.push(
          Number(activeBox[i].slice(0, j)) +
            (axis === 'y' ? 1 : 0) +
            '.' +
            (Number(activeBox[i].slice(j + 1)) + (axis === 'x' ? 1 : 0)),
          Number(activeBox[i].slice(0, j)) +
            (axis === 'y' ? 1 : 0) +
            '.' +
            (Number(activeBox[i].slice(j + 1)) - (axis === 'x' ? 1 : 0)),
        );
      }
    }
  }

  ((XArraySlice, YArraySlice, prospectiveBoxStep) => {
    // IIFE - out of range function
    const isConfinesOfXAxis = XArraySlice.every((xSlice) => width >= xSlice && xSlice > 0);
    const isConfinesOfYAxis = YArraySlice.every((ySlice) => height >= ySlice && ySlice > 0);
    const isConfinesOfBoxes = prospectiveBoxStep.every((box) => {
      for (let i = 0; i < placedBoxes.length; i++) {
        if (box === placedBoxes[i]) {
          return false;
        }
      }
      return true;
    });
    if (isConfinesOfXAxis) {
      if (isConfinesOfYAxis && isConfinesOfBoxes) {
        return setActiveBox(result);
      } else {
        setPlacedBoxes([...placedBoxes, ...activeBox]);
        setActiveBox(box.getBox()); // here should be some random spawn system
      }
    } else {
      return setActiveBox(activeBox);
    }
  })(XArraySlice, YArraySlice, prospectiveBoxStep);
};
