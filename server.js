import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbConfig.js";
import UserModel from "./models/userModel.js";

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());

connectToMongoDb();

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Invalid Password or Username");
      }
    } else {
      res.json("No user found");
    }
  });
});

app.post("/register", (req, res) => {
  try {
    UserModel.create(req.body).then((users) => res.json(users));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (error) => {
  error ? console.log("Error: ", error) : console.log("Connected to server");
});
