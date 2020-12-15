const expect = require("chai").expect;

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

describe("when a customer rolls a dice", () => {
  it("shoule return an integer number", () => {
    expect(rollDice()).to.be.an("number");
  });

  it("shoule get a number bigger than 0", () => {
    expect(rollDice()).to.be.above(0);
  });

  it("shoule get a number less than 7", () => {
    expect(rollDice()).to.be.below(7);
  });

  it("should not be null", () => {
    expect(rollDice()).to.not.be.null;
  });

  it("should not be undefined", () => {
    expect(rollDice()).to.not.be.undefined;
  });
});
