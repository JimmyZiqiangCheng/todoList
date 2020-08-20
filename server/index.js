const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwtGenerator = require("./utils/jwtGenerator");
// ROUTES //
const authRouter = require("./routes/jwtAuth");
const todoRouter = require("./routes/todos");
const dashboardRouter = require("./routes/dashboard");
// middleware
app.use(cors());
app.use(express.json());  //req.body

// ROUTERS //
// user registration and login
app.use("/auth", authRouter);
// user dashboard
app.use("/dashboard", dashboardRouter);
// todo list
app.use("/todos", todoRouter);

app.listen(5000, () => {
    console.log("server has started on port 5000");
})