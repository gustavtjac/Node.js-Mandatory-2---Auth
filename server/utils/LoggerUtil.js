import pino from "pino";
import pretty from "pino-pretty";
import fs from "fs";
if (!fs.existsSync("logs")) fs.mkdirSync("logs");

const streams = [
  { stream: pretty({ colorize: true }) },
  { stream: fs.createWriteStream("logs/app.log", { flags: "a" }) },
];

const logger = pino({ level: "info" }, pino.multistream(streams));

logger.info("System started");

export default logger;
