import "dotenv/config";
import express from "express";
import logger from "./utils/LoggerUtil.js";
import pinoHttp from "pino-http";
import session from "express-session";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRouter from "./routers/authRouter.js";
import path from "path";

const app = express();

app.use(express.static("../client/dist"));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    data: {
      errorMessage: "Too many auth attempts, please try again later",
    },
  },
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: {
    data: { errorMessage: "Too many attempts, please try again later" },
  },
});

app.use(helmet());
app.use("/auth", authLimiter);
app.use(generalLimiter);
app.use("/auth", authRouter);

app.get("/api/{*splat}", (req, res) => {
  res.status(404).send({
    data: { errorMessage: `${req.method} ${req.path} does not exist` },
  });
});

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

app.all("/{*splat}", (req, res) => {
  res.status(404).send({
    data: { errorMessage: `${req.method} ${req.path} does not exist` },
  });
});

const PORT = process.env.PORT ?? 8080;

const server = app.listen(PORT, () => {
  logger.info("Server is running on port " + server.address().port);
});
