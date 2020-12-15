const assert = require("chai").assert;

let myStr = "test my str";

assert.typeOf(myStr, "string", "myStr is not string!");
assert.lengthOf(myStr, 10, "myStr length is no equal 10!");
