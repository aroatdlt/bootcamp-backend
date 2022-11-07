"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.connectToDBServer = void 0;

var _mongodb = require("mongodb");

let db;
exports.db = db;

const connectToDBServer = async connectionURI => {
  const client = new _mongodb.MongoClient(connectionURI);
  await client.connect();
  exports.db = db = client.db();
};

exports.connectToDBServer = connectToDBServer;