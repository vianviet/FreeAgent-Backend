const express = require('express');
const { findAllController, findOneController, authenticateController, registerController, updateController, deleteController } = require('../Controller/User');
const userRoute = express.Router()
const { verifyToken } = require('../Auth/Auth')

userRoute.get("/", verifyToken, async(req, res) => {
    findAllController(req, res)
});
userRoute.get("/:id", verifyToken, async(req, res) => {
    findOneController(req, res)
});
userRoute.post("/authen", async(req, res) => {
    authenticateController(req, res);
});
userRoute.post("/", verifyToken, async(req, res) => {
    registerController(req, res);
});
userRoute.put("/:id", verifyToken, async(req, res) => {
    updateController(req, res);
});
userRoute.delete("/:id", verifyToken, async(req, res) => {
    deleteController(req, res);
});


module.exports = userRoute