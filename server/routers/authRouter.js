import { Router } from "express";
const router = Router();

import db from "../database/connection.js";
import { sendRegisterMail } from "../utils/emailUtil.js";
import {
  compareHashedPasswords,
  hashPassword,
} from "../utils/passwordHashing.js";
import logger from "../utils/LoggerUtil.js";
import { isLoggedIn } from "../middleWare/authMiddleWare.js";

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      data: { errorMessage: "Please fill out Username & Password" },
    });
  }

  const foundUserFromDatabase = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!foundUserFromDatabase) {
    return res.status(401).send({
      data: { errorMessage: "Wrong login information" },
    });
  }

  const passwordIsEqual = await compareHashedPasswords(
    password,
    foundUserFromDatabase.password,
  );

  if (!passwordIsEqual) {
    return res.status(401).send({
      data: { errorMessage: "Wrong login information" },
    });
  }

  const { password: _password, ...safeUser } = foundUserFromDatabase;
  req.session.user = safeUser;

  res.status(200).send({
    data: { successMessage: "Login succesfull" },
  });
});

router.post("/register", async (req, res) => {
  const { username, firstName, lastName, password1, password2, email } =
    req.body;

  if (
    !username ||
    !firstName ||
    !lastName ||
    !password1 ||
    !password2 ||
    !email
  ) {
    return res.status(400).send({
      data: { errorMessage: "Please fill out all information fields" },
    });
  }

  if (password1 !== password2) {
    return res.status(400).send({
      data: { errorMessage: "Passwords do not match" },
    });
  }

  try {
    const existingUser = db
      .prepare("SELECT username FROM users WHERE username = ?")
      .get(username);

    if (existingUser) {
      return res.status(409).send({
        data: { errorMessage: "Username already exists" },
      });
    }

    const hashedPassword = await hashPassword(password1);

    db.prepare(
      "INSERT INTO users (username, first_name, last_name, password, email) VALUES (?, ?, ?, ?, ?)",
    ).run(username, firstName, lastName, hashedPassword, email);

    sendRegisterMail(email).catch((error) => {
      logger.error({ error }, "Register email failed");
    });

    return res.status(201).send({
      data: { successMessage: "Account registered" },
    });
  } catch (error) {
    logger.error({ error }, "Error while registering user");
    return res.status(500).send({
      data: { errorMessage: "Something went wrong, please try again" },
    });
  }
});

router.get("/me", isLoggedIn, (req, res) => {
  res.status(200).json({ data: { user: { ...req.session.user } } });
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.status(200).json({ data: { successMessage: "Logged out" } });
});

export default router;
