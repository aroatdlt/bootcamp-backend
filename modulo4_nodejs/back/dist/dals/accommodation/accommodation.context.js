"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccommodationContext = void 0;

var _servers = require("../../core/servers");

const getAccommodationContext = () => _servers.db === null || _servers.db === void 0 ? void 0 : _servers.db.collection("listingsAndReviews");

exports.getAccommodationContext = getAccommodationContext;