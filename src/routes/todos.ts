import { Router } from "express";

const routes = Router();

routes.get("/todos", (req, res) => {
  res.send("Hello Todos");
});

export default routes;
