const express = require('express');
const { Authen, FindAll, Register, Delete, Update, FindOne } = require('../Service/userService');
const userController = express.Router()
const { verifyToken } = require('../Auth/Auth')

userController.get("/", verifyToken, async(req, res) => {
    FindAll(req, res)
});
userController.get("/:id", verifyToken, async(req, res) => {
    FindOne(req, res)
});
userController.post("/authen", async(req, res) => {
    Authen(req, res);
});
userController.post("/", verifyToken, async(req, res) => {
    Register(req, res);
});
userController.put("/:id", verifyToken, async(req, res) => {
    Update(req, res);
});
userController.delete("/:id", verifyToken, async(req, res) => {
    Delete(req, res);
});


module.exports = userController