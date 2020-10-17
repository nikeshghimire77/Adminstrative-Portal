import { Router } from "express";
import HTTPStatus from "http-status";

import UserRoute from "./user.route";
import RoleRoute from "./role.route";
import LinkRoute from "./link.route";

import AuthRoute from "./auth.route";

import APIError from "../services/error";

// Middlewares
//import logErrorService from "../services/log";

const routes = new Router();

const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

routes.use("/users", UserRoute);
routes.use("/roles", RoleRoute);
routes.use("/links", LinkRoute);

routes.use("/auth", AuthRoute);

/* 
if (isDev || isTest) {
  routes.use("/seeds", SeedRoutes);
} */

routes.all("*", (req, res, next) =>
  next(new APIError("Not Found!", HTTPStatus.NOT_FOUND, true))
);

//routes.use(logErrorService);

export default routes;
