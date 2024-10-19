import { NextFunction, Request, Response } from "express";
import Todo from "../models/todo";

export async function getTodos(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
  }
}

export async function getTodo(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
  }
}

export async function createTodo(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { text } = req.body;

  const todo = new Todo({
    text,
  });

  try {
    await todo.save();
    res.status(201).json({ message: "Todo created successfully" });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  const { text, status } = req.body;

  try {
    await Todo.findByIdAndUpdate(id, {
      text,
      status,
    });
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
  }
}
