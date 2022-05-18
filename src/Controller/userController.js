const express = require('express');
const { Authen } = require('../Service/userService');
const userController = express.Router()

userController.post("/authen", async(req, res) => {
    Authen(req, res);
});
module.exports = userController