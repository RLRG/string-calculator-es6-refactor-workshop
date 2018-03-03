require('should');
const sc = require('./string-calculator.js');

describe("The string calculator", () => {
  it("Sums numbers separated by comma in a text", () => {
    sc("").should.eql(0);
    sc("1").should.eql(1);
    sc("11").should.eql(11);
    sc("1,2").should.eql(3);
    sc("11,22").should.eql(33);
    sc("1,2,3").should.eql(6);
  });

  it("Numbers can be separated with \\n", () => {
    sc("1\n2\n3").should.eql(6);
  });

  it("A custom separator can be defined", () => {
    sc("//;\n1;2;3").should.eql(6);
  });

  it("Throws with negative numbers", () => {
    (() => sc("-1,2")).should.throw(/-1/);
    (() => sc("-1,2,-3")).should.throw(/-1/);
    (() => sc("-1,2,-3")).should.throw(/-3/);
  });

  it("Ignores numbers greater than 1000", () => {
    sc("1000,1").should.eql(1);
  });

  it("A custom separator of length > 1 can be defined", () => {
    sc("//[***]\n1***2***3").should.eql(6);
  });

  it("More than one separators can be defined", () => {
    sc("//[*][%]\n1*2%3").should.eql(6);
  });
});
