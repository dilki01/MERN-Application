// const express = require('express');  MERNpassword123
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json()); //whenever data sent from frontend it will convert it into json
app.use(cors());

app.use("/auth", userRouter); //al the endpoints of auhtnentication will start with /auth
app.use("/recipes", recipesRouter);

mongoose.connect(
    "mongodb+srv://dillenora:MERNpassword123@recipes.u9dfv.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes"
);

app.listen(3001, () => 
    console.log('Server is running on port 3001')
);