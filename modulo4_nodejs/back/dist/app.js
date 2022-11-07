"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _http = _interopRequireDefault(require("http"));

var _accommodation = require("./pods/accommodation");

var _servers = require("./core/servers");

var _constants = require("./core/constants");

var _middlewares = require("./common/middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restApiServer = (0, _servers.createRestApiServer)();

const staticFilesPath = _path.default.resolve(__dirname, _constants.envConstants.STATIC_FILES_PATH);

restApiServer.use("/", _express.default.static(staticFilesPath));
restApiServer.use(_middlewares.logRequestMiddleware);
restApiServer.use("/api/accommodations", _accommodation.accommodationsApi);
restApiServer.use(_middlewares.logErrorRequestMiddleware);

const server = _http.default.createServer(restApiServer);

server.listen(_constants.envConstants.PORT, async () => {
  if (!_constants.envConstants.isApiMock) {
    await (0, _servers.connectToDBServer)(_constants.envConstants.MONGODB_URI);
    console.log("Connected to DB");
  } else {
    console.log('Running API mock');
  }

  console.log(`Server ready at port ${_constants.envConstants.PORT}`);
});