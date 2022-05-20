const express = require('express');
const { Authen, FindAll, Register, Delete, Update } = require('../Service/userService');
const userController = express.Router()

userController.get("/", async(req, res) => {
    FindAll(req, res)
});

userController.post("/authen", async(req, res) => {
    Authen(req, res);
});
userController.post("/", async(req, res) => {
    Register(req, res);
});
userController.put("/", async(req, res) => {
    Update(req, res);
});
userController.delete("/:id", async(req, res) => {
    Delete(req, res);
});


module.exports = userController