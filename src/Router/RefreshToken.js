const express = require('express');
const refreshTokenRoute = express.Router()
const { verifyToken } = require('../Auth/Auth');
const { refreshTokenController } = require('../Controller/RefreshToken');

refreshTokenRoute.post("/", async(req, res) => {
    refreshTokenController(req, res)
});
refreshTokenRoute.get("/", async(req, res) => {
    return res.status(200).json({ data: "hello" }).end();
});

module.exports = refreshTokenRoute