const expect = require("chai").expect;

// var foo = "hello world!";

// expect(foo).to.equal("hello world!");

var animals = ["dog", "cat"];

expect(animals).to.have.length.above(1);
