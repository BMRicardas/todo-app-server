import express, { json } from "express";
import { connect } from "mongoose";

import { config } from "./config/env.config";
import todoRoutes from "./routes/todos";
import helmet from "helmet";

const { port, host } = config.server;
const { connectionString } = config.database;

const app = express();

app.use(helmet());
app.use(json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(todoRoutes);

connect(connectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch((error) => console.error(error));
