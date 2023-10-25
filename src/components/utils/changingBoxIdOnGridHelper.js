export const changeBoxId = (boxId, axis, changeValue, width, height, setBoxId) => {
  debugger;
  const xSlice = (i) => {
    const xSlice = +boxId.slice(i + 1) + changeValue;
    if (width >= xSlice && 0 < xSlice) {
      return xSlice;
    } else {
      return boxId.slice(i + 1);
    }
  };
  const ySlice = (i) => {
    const ySlice = +boxId.slice(0, i) + changeValue;
    if (height >= ySlice && 0 <= ySlice) {
      return ySlice;
    } else {
      return boxId.slice(0, i);
    }
  };
  for (let i = 0; i < boxId.length; i++) {
    if (axis === 'x' && boxId[i] === '.') {
      setBoxId((boxId = boxId.slice(0, i + 1) + xSlice(i)));
      // console.log(+boxId.slice(0, i) + changeValue + boxId.slice(i));
    } else if (axis === 'y' && boxId[i] === '.') {
      setBoxId((boxId = ySlice(i) + boxId.slice(i)));
      // console.log(boxId.slice(0, i+1) + (+boxId.slice(i+1)+changeValue));
    }
  }
};
