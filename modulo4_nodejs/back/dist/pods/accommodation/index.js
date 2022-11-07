"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accommodations = require("./accommodations.rest-api");

Object.keys(_accommodations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _accommodations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _accommodations[key];
    }
  });
});