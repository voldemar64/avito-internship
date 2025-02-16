import Logger from "./logger.js";

const { logger } = Logger;

const allowedCors = process.env.ALLOWED_CORS
  ? process.env.ALLOWED_CORS.split(",")
  : ["http://localhost:3000"];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  // Проверка разрешённых источников
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    logger.info(`CORS: Разрешён запрос с источника ${origin}`);
  } else if (origin) {
    logger.warn(`CORS: Запрос с неразрешённого источника: ${origin}`);
  }

  // Обработка preflight-запросов
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    logger.info("CORS: Обработан preflight-запрос");
    return res.end();
  }

  return next();
};

export default cors;
