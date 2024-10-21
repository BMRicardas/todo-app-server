import express, { json } from "express";
import { connect } from "mongoose";

import { config } from "./config/env.config";
import todoRoutes from "./routes/todos";
import cors from "cors";
import helmet from "helmet";

const { port, host } = config.server;
const { connectionString } = config.database;

const app = express();

app.use(cors());

app.use(helmet());
app.use(json());

app.use(todoRoutes);

connect(connectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
