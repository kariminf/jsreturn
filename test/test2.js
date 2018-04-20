
function func(val) {
  let m;
  if (/^()able$/.test(val)) return

  return "value is " + val;
}

function func2(val) {
  let jsreturn = require("../jsreturn");

  jsreturn.let('val').be(val)
          .let("b").be(5)
          .if('typeof val === "string"').ret('val')
          .if('val === 0').ret('"zero"')
          .let('a').as('val - 1')
          .if('a === 0').ret('"one"')
          .if('a === b').ret('"Our fixed value minus one"')
          .default('"value is " + val');

  return jsreturn.eval();

}

const args = process.argv;
let val = parseInt(args[2]);

let hrstart = process.hrtime();
console.log(func(val));
let hrend = process.hrtime(hrstart);
console.info("Normal: %ds %dms", hrend[0], hrend[1]/1000000);

hrstart = process.hrtime();
console.log(func2(val));
hrend = process.hrtime(hrstart);
console.info("JsReturn: %ds %dms", hrend[0], hrend[1]/1000000);
