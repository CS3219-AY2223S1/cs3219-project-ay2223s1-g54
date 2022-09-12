import {
  ormCreateUser as _createUser,
  ormCheckUserExists as _checkUserExists,
} from "../model/user-orm.js";
import UserModel from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { username, password, confirmPassword, email } = req.body;

    if (!username || !password || !confirmPassword || !email) {
      return res
        .status(400)
        .json({ message: "One of the required fields is missing!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "The passwords you entered do not match!" });
    }

    // prevent duplicate username creation in controller layer
    if (await _checkUserExists(username)) {
      console.log(`The username ${username} already exists!`);
      return res.status(409).json({ message: `The username already exists!` });
    }

    const newUser = await _createUser(email, username, password);
    if (newUser.username !== username) {
      return res.status(400).json({ message: "Could not create a new user" });
    } else {
      console.log(`Created new user ${newUser.username} successfully!`);
      return res.status(201).json({
        message: `Created new user ${newUser.username} successfully!`,
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and/or Password are missing!" });
    }
    UserModel.find({ email: email })
      .exec()
      .then((result) => {
        // Account doesn't exist
        if (result.length < 1) {
          return res.status(401).json({ message: "Email not exist" });
        }
        console.log(result);
        // Todo to verify hashes
        bcrypt.compare(password, result[0]["password"], (err, result) => {
          if (err) {
            return { err };
          }

          if (!result) {
            console.log("Invalid password");
            return res
              .status(401)
              .json({ message: "Incorrect Username and/or Password" });
          }

          console.log("Password matched");
          const priv_key = process.env.AUTH_PRIVATE_KEY || "superIdol";
          const token = jwt.sign({ email }, priv_key, { algorithm: "HS256" });
          res.cookie("token", token, { httpOnly: true });
          return res.status(200).json({ token });
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Authentication failure" });
  }
}
