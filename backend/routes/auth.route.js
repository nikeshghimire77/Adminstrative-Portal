import { controllerHandler, loginUser } from "../controller";
import { Router } from "express";

const routes = new Router();
routes.post(
  "/login",
  controllerHandler(loginUser, (req, res, next) => [req.body])
);

export default routes;
