console.log("Task Manager App");

require("./db/connect");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
app.use(express.static("./public"));
app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app.use(express.urlencoded({ extended: true }));
// app.get("/hello", (req, res) => {
//   res.send("Task Manager App");
// });
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3009;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (err) {}
};
start();
