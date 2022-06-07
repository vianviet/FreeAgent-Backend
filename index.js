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
const axios = require("axios");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const crypto = require("crypto");
// const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const { generateToken } = require("./src/Auth/Auth");
// const GithubStrategy = require("passport-github").Strategy;

const port = process.env.PORT;

// const clientId = "daef521f0e5ef44e5aee";
// const clientSecret = "6d8a503b5481a84de81ed811d9eae482f08ce3c6";

const googleClientID =
  "752048205177-rmg85u5rm0bisge0pobn4tib5go4r9kd.apps.googleusercontent.com";
const googleClientSecret = "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";

const main = async () => {
  connectDB();
  const app = express();
  app.use(express.json());
  app.use(cors());

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        // console.log(accessToken);
        cb(null, { accessToken, profile });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  const setCookie = (req, res, next) => {
    next();
  };
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    setCookie,
    (req, res) => {
      res.cookie("token", " alo123");
      res.send(req.user.profile);
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
  app.get("/cookie", (req, res) => {
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("token", "10000", { maxAge: 10000, httpOnly: true }).send("ok");
  });

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
