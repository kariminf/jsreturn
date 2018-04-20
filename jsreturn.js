
(function() {

  "use strict";

  let JsReturn = {};

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = JsReturn;
  }
  else {
    window.JsLingua.Cls.Info = JsReturn;
  }

  //{code: string}, {cond: string, ret: string}
  let cache = [];
  let current = {};
  let vars = {};
  let varsL = "";
  let def = "";

  let eif = false;
  let letvar = "";

  function repVars(val) {
    return val.replace(new RegExp( "(^| )(" + varsL + ")([ ;]|$)", "g"), "$1vars.$2$3");
  }

  function toCache() {
    cache.push(current);
    current = {};
    eif = false;
  }

  JsReturn.clear = function(v) {
    cache = [];
    current = {};
    vars = {};
    varsL = "";
    def = "";

    eif = false;
    letvar = "";
    return JsReturn;
  };

  JsReturn.let = function(v) {

    letvar = v + " = ";
    if(varsL) varsL += "|";
    varsL += v;
    return JsReturn;
  };

  JsReturn.be = function(val) {
    letvar += val + ";";
    JsReturn.code(letvar);
    letvar = "";
    return JsReturn;
  };

  JsReturn.as = function(val) {
    letvar += val;
    JsReturn.code(letvar);
    letvar = "";
    return JsReturn;
  };

  JsReturn.if = function (cond) {
    if (eif) {
      current.ret = "";
      toCache();
    }

    eif = true;

    current.cond = repVars(cond);

    return JsReturn;
  };

  JsReturn.ret = function (ret) {
    if (! eif) return JsReturn;

    current.ret = repVars(ret);

    toCache();

    return JsReturn;

  };

  JsReturn.code = function (code) {
    if (eif) {
      current.ret = "";
      toCache();
    }

    current.code = repVars(code);
    toCache();

    return JsReturn;

  };

  JsReturn.default = function (ret) {
    def = repVars(ret);
  };



  JsReturn.eval = function () {
    for(let i = 0; i < cache.length; i++) {
      let item = cache[i];
      if (item.code) eval(item.code);
      else if (item.cond) {
        if (eval(item.cond)) return eval(item.ret);
      }
    }

    return eval(def);

  };

  JsReturn.prog = function () {
    let prg = "";
    for(let i = 0; i < cache.length; i++) {
      let item = cache[i];
      if (item.code) prg += item.code + "\n";
      else if (item.cond) {
        prg += "if (" + item.cond + ") return " + item.ret + "\n";
      }
    }

    return prg;

  };



}());
