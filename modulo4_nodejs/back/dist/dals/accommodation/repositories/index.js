"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accommodationRepository = void 0;

var _accommodation = require("./accommodation.mock-repository");

var _accommodation2 = require("./accommodation.db-repository");

var _constants = require("../../../core/constants");

const accommodationRepository = _constants.envConstants.isApiMock ? _accommodation.mockRepository : _accommodation2.dbRepository;
exports.accommodationRepository = accommodationRepository;