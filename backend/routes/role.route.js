import {
  controllerHandler,
  getRole,
  getAllRoles,
  addRole,
  deleteRole,
  updateRole
} from "../controller";
import { Router } from "express";

const routes = new Router();

routes.get(
  "/read/:id",
  controllerHandler(getRole, (req, res, next) => [req.params.id])
);
routes.get(
  "/read",
  controllerHandler(getAllRoles, (req, res, next) => [])
);
routes.post(
  "/create",
  controllerHandler(addRole, (req, res, next) => [req.body])
);
routes.post(
  "/update",
  controllerHandler(updateRole, (req, res, next) => [req.body])
);
routes.delete(
  "/delete/:id",
  controllerHandler(deleteRole, (req, res, next) => [req.params.id])
);
export default routes;
