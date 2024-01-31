const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todosRoutes = require("./routes/todos")

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 8000;
const URL = process.env.URI;

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose
  .connect(URL)
  .then(() => {
    app.listen(port, () => console.log(`Running en port: ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
  
// Api endpoints
app.use("/todos", todosRoutes);