const { findOne } = require("../Repository/User")
var jwt = require('jsonwebtoken');
const { generateToken } = require("../Auth/Auth");



async function refreshTokenService(token) {
    if (!token) return;
    const { _id, username, email } = jwt.decode(token)
    console.log("id", _id)
    if (!_id) return;
    const result = await findOne(_id)
    const refreshToken = await result.refreshtoken
    if (refreshToken === "") return;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_STRING)
        console.log("Decoded", decoded)
        return generateToken({ username, _id, email })
    } catch (err) {
        console.log(err)
        return;
    }
}

module.exports = { refreshTokenService }