const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const logs = require("./routes/api/logs");

const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connect"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Testing"));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/logs", logs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
