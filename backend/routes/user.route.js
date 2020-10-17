import {
  controllerHandler,
  getUser,
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserChilds
} from "../controller";
import { Router } from "express";

const routes = new Router();

routes.get(
  "/read/:id",
  controllerHandler(getUser, (req, res, next) => [req.params.id])
);
routes.get(
  "/read",
  controllerHandler(getAllUsers, (req, res, next) => [])
);
routes.post(
  "/create",
  controllerHandler(addUser, (req, res, next) => [req.body])
);
routes.post(
  "/update",
  controllerHandler(updateUser, (req, res, next) => [req.body])
);
routes.delete(
  "/delete/:id",
  controllerHandler(deleteUser, (req, res, next) => [req.params.id])
);
export default routes;
