let expect = require('expect.js');
let jsreturn = require("../jsreturn.js");

describe("JsReturn", function(){

  it("let be as", function(){

    let orig = function (v) {
      let a = 5;
      let b = a + v;
      return b - 4;
    };

    let f = function (v) {
      jsreturn.let('v').be(v)
              .let('a').be(5)
              .let('b').as("a + v")
              .default('b - 4');
      return jsreturn.eval();
    };

    expect(f(7)).to.eql(orig(7));
  });

  it("let be order with if", function(){

    let orig = function (v) {
      let a = 5;

      if (v === a) return "five";

      a = 6;

      if (v === a) return "six";

      return "none";
    };

    let f = function (v) {

      jsreturn.clear()
              .let('v').be(v)
              .let('a').be(5)
              .if('v === a').ret('"five"')
              .let('a').be(6)
              .if('v === a').ret('"six"')
              .default('"none"');
      return jsreturn.eval();
    };

    expect(f(5)).to.eql(orig(5));
    expect(f(6)).to.eql(orig(6));
    expect(f(1)).to.eql(orig(1));
  });

});
