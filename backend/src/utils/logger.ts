import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "http",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.printf(({ timestamp, level, message }) =>
      [timestamp.padEnd(25), level.toUpperCase().padEnd(8), message].join("")
    )
  ),
  transports: [
    new transports.Console({}),
    new transports.File({
      filename: "logs/bookshelf.log",
    }),
  ],
});

export default logger;
