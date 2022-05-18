const express = require('express');
const { Authen, FindAll, Register } = require('../Service/userService');
const userController = express.Router()

userController.get("/", async(req, res) => {
    FindAll(req, res)
});

userController.post("/authen", async(req, res) => {
    Authen(req, res);
});
userController.post("/register", async(req, res) => {
    Register(req, res);
});
module.exports = userController