import express from "express";
import { config } from "./config/env.config";
import { connect } from "mongoose";

const { port, host } = config.server;
const { connectionString } = config.database;

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello World");
});

connect(connectionString).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
});
