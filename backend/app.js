import express from "express";
import bodyParser from "body-parser";
import database from "./database";
import { Constants } from "./config/Constants";

const app = express();
const router = express.Router();
import ApiRoutes from "./routes";

app.use(express.json());
let port = 2000;
//catch mongodb error
app.use((request, response, next) => {
  if (database.connection.readyState != 1) {
    var err = new Error("Failed to connect to mongodb!");
    err.status = 500;
    next(err);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var showRequestBody = function(req, res, next) {
  "use strict";
  console.debug(
    "Request Body",
    require("util").inspect(req.body, { depth: null })
  );
  next();
};
app.use(showRequestBody);
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
//app.use("/", route);
app.use("/api", ApiRoutes);
app.listen(port);
console.log("app running on port ", port);
