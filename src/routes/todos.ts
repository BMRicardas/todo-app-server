import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos";

const routes = Router();

routes.get("/todos", getTodos);

routes.get("/todos/:id", getTodo);

routes.post("/todos", createTodo);

routes.put("/todos/:id", updateTodo);

routes.delete("/todos/:id", deleteTodo);

export default routes;
