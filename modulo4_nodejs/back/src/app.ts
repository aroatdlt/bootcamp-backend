import express from "express";
import path from "path";
import https from 'https'
import fs from 'fs';

import { accommodationsApi } from "./pods/accommodation";
import { createRestApiServer, connectToDBServer } from 'core/servers';
import { envConstants } from "core/constants";
import { logRequestMiddleware, logErrorRequestMiddleware} from "common/middlewares";

const serverOptions = {
  key: fs.readFileSync('certificates/key.pem'),
  cert: fs.readFileSync('certificates/cert.pem'),
}

const restApiServer = createRestApiServer();

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use("/", express.static(staticFilesPath));

restApiServer.use(logRequestMiddleware);

restApiServer.use("/api/accommodations", accommodationsApi);

restApiServer.use(logErrorRequestMiddleware);

const server = https.createServer(serverOptions, restApiServer);

server.listen(envConstants.PORT, async () => {
  if (!envConstants.isApiMock) {
    await connectToDBServer(envConstants.MONGODB_URI);
    console.log("Connected to DB");
  } else {
    console.log('Running API mock');
  }
  console.log(`Server ready at port ${envConstants.PORT}`);
});
