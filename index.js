const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");


dotenv.config();

const app = express();

const connectDB = require("./config/db");
connectDB();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.get("/", (req,res)=>{
    res.send("Welcome to the Social Media API");
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






