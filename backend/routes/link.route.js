import {
  controllerHandler,
  getLink,
  getAllLinks,
  addLink,
  deleteLink,
  updateLink
} from "../controller";
import { Router } from "express";

const routes = new Router();

routes.get(
  "/read/:id",
  controllerHandler(getLink, (req, res, next) => [req.params.id])
);
routes.get(
  "/read",
  controllerHandler(getAllLinks, (req, res, next) => [])
);
routes.post(
  "/create",
  controllerHandler(addLink, (req, res, next) => [req.body])
);
routes.post(
  "/update",
  controllerHandler(updateLink, (req, res, next) => [req.body])
);
routes.delete(
  "/delete/:id",
  controllerHandler(deleteLink, (req, res, next) => [req.params.id])
);
export default routes;
