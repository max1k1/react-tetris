export const Box = class {
  constructor(XA = 0, YA = 0) {
    this.tetrominos = 3;
    this.XA = XA;
    this.XB = XA + 1;
    this.XC = XA + 2;
    this.XD = XA + 3;
    /////////////////////////////////
    this.YA = YA;
    this.YB = YA + 1;
    this.YC = YA + 2;
    this.YD = YA + 3;
    this.boxPatern = [
      [
        this.YA + '.' + this.XA,
        this.YA + '.' + this.XB,
        this.YB + '.' + this.XA,
        this.YB + '.' + this.XB,
      ], //cube
      [
        this.YA + '.' + this.XA,
        this.YA + '.' + this.XB,
        this.YA + '.' + this.XC,
        this.YA + '.' + this.XD,
      ], //line
      [
        this.YA + '.' + this.XA,
        this.YA + '.' + this.XB,
        this.YA + '.' + this.XC,
        this.YB + '.' + this.XB,
      ], //pyramid
    ];
  }
  getBox() {
    return this.boxPatern[Math.floor(Math.random() * this.tetrominos)];
  }
};

// const box = new Box(Math.floor(Math.random() * 3), 0);
// box.getBox();
// console.log(box.getBox());
