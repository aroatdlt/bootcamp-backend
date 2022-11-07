"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accommodation = require("./accommodation.model");

Object.keys(_accommodation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _accommodation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _accommodation[key];
    }
  });
});

var _repositories = require("./repositories");

Object.keys(_repositories).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _repositories[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repositories[key];
    }
  });
});