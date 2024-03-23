import express from "express";
import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loginRoutes = express.Router();

loginRoutes.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const [existingEmail] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingEmail.length !== 0) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const [existingUsername] = await db.execute(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (existingUsername.length !== 0) {
      return res
        .status(408)
        .json({ message: "User with this username already exists" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      try {
        const [newUser] = await db.execute(
          `INSERT into users (username, email, password) VALUES (?, ?, ?)`,
          [username, email, hash]
        );
        res.status(200).json({ message: "User registered successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

loginRoutes.post("/login", async (req, res) => {
  try {
    const payload = req.body;

    const [verifyEmail] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [payload.email]
    );

    if (verifyEmail.length == 0) {
      return res.status(404).send("no user found");
    }

    bcrypt.compare(
      payload.password,
      verifyEmail[0].password,
      async (_err, result) => {
        if (!result) {
          return res.status(400).send("invalid credentials");
        } else {
          const token = jwt.sign(
            { email: payload.email, status:verifyEmail[0].email_status },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );

          res.status(200).json(token);
        }
      }
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default loginRoutes;
