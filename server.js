const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt library

const UserModel = require("./user.model");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://guzalmazitova:rayana2015@cluster0.ynanytb.mongodb.net/mortex?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ username, password: hashedPassword });
    res.json({ status: "ok", user: { username: newUser.username } });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err.message });
  }
});

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.on('SIGINT', function() {
  console.log('Server shutting down');
  server.close(function() {
    console.log('Server closed');
    process.exit(0);
  });
});
