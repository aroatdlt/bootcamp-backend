import express from "express";
import path from "path";
import https from 'https'
import fs from 'fs';

import { accommodationsApi } from "./accommodations.api";
import { createRestApiServer } from "core/servers";
import { envConstants } from "core/constants";

const serverOptions = {
  key: fs.readFileSync('certificates/key.pem'),
  cert: fs.readFileSync('certificates/cert.pem'),
}

const restApiServer = createRestApiServer();

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use("/", express.static(staticFilesPath));

restApiServer.use(async (req, res, next) => {
  console.log(req.url);
  next();
});

restApiServer.use("/api/accommodations", accommodationsApi);

restApiServer.use(async (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500)
});

const server = https.createServer(serverOptions, restApiServer);

server.listen(envConstants.PORT, () => {
  console.log(`Server ready at port ${envConstants.PORT}`);
});
