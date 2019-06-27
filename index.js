require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const logger = require("./util/logger");
const { init: initCron } = require("./util/cron")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,HEAD");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(router);

// initialize routes
require("./routes")(app);
require("http")
  .Server(app)
  .listen(process.env.API_PORT, () => "Api server ready");

(({
  NODE_ENV,
  DB_NAME,
  DB_TEST,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  API_PORT,
  CMP_TOKEN,
  CMP_URL,
  CRON
}) =>
  logger.log({
    level: "verbose",
    message: `Initializing server with \
    Environment: ${NODE_ENV} \
    Database Name: ${DB_NAME} \
    Database User: ${DB_USER} \
    Database Port: ${DB_PORT} \
    Server Listening on: ${API_PORT} \
    Cron job parameter: ${CRON}
    Coin Market Cap API Token: ${CMP_TOKEN}
    Coin Market Cap API URL: ${CMP_URL}`
  }))(process.env);

initCron()
