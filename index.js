const express = require("express");
// const mongoose = require("mongoose");
const { connectDB } = require("./db");
const calendarRoute = require("./src/Router/Calendar");
require("dotenv").config();
const cors = require("cors");
const refreshTokenRoute = require("./src/Router/RefreshToken");
const userRoute = require("./src/Router/User");
const handleError = require("./src/Middleware/handleError");
const { uploadRouter } = require("./src/Router/Upload");
// const { default: axios } = require("axios");
const port = process.env.PORT;

// const clientId = "daef521f0e5ef44e5aee";
// const clientSecret = "6d8a503b5481a84de81ed811d9eae482f08ce3c6";

const main = async () => {
  connectDB();
  const app = express();
  // app.get("/", (req, res) => {
  //   res.redirect(
  //     `https://github.com/login/oauth/authorize?client_id=${clientId}`
  //   );
  // });
  // app.get("/oauth-callback", (req, res) => {
  //   // console.log(req.query.code);
  //   const body = {
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     code: req.query.code,
  //   };
  //   const opts = { headers: { accept: "application/json" } };
  //   axios
  //     .post(`https://github.com/login/oauth/access_token`, body, opts)
  //     .then((res) => {
  //       console.log(res);
  //       return res.data.access_token;
  //     })
  //     .then((_token) => {
  //       console.log("My token:", _token);
  //       axios
  //         .get(`https://api.github.com/user/repos`, {
  //           headers: { Authorization: `token ${_token}` },
  //         })
  //         .then((resp) => res.json(resp.data))
  //         .catch((err) => res.status(401).json({ message: err.message }));
  //     })
  //     .catch((err) => res.status(500).json({ message: err.message }));
  // });
  app.use(cors());
  app.use(express.json());
  app.use("/user", userRoute);
  app.use("/calendar", calendarRoute);
  app.use("/refreshToken", refreshTokenRoute);
  app.use("/upload", uploadRouter);
  app.use(handleError);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();

// connectDB();
// const schema = new mongoose.Schema({ username: 'string', password: 'string' });
// const User = mongoose.model('user', schema);
// const query = User.findOne({ 'name': 'admin' })
// query.exec(function(err, person) {
//     if (err) return handleError(err);
//     // Prints "Space Ghost is a talk show host."
//     console.log('result', person.name, person.password, );
// })
// const admin = new User({ username: 'admin', password: 'admin' });
// admin.save(function(err) {
//     if (err) return handleError(err);
//     console.log(save)
// });
