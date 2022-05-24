const express = require('express');
const refreshTokenController = express.Router()
const { verifyToken } = require('../Auth/Auth');
const { refreshToken } = require('../Service/refreshTokenService');

refreshTokenController.post("/", async(req, res) => {
    refreshToken(req, res)
});

module.exports = refreshTokenController