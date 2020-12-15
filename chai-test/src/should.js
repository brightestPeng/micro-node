const chai = require("chai");

chai.should();

var foo = "hello world!";
console.log(foo);

foo.should.equal("hello world!");
