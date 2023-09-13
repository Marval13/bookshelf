import morgan from "morgan";

import logger from "../utils/logger";

const morganMiddleware = morgan("tiny", {
  stream: {
    write: (message) => logger.http(message.trimEnd()),
  },
});

export default morganMiddleware;
