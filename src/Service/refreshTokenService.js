const { findOne } = require("../Repository/userRepository")
var jwt = require('jsonwebtoken');
const { generateToken } = require("../Auth/Auth");



async function refreshToken(req, res) {
    const token = req.body.token
    if (!token) return res.status(401).json({ message: "Error" })
    const { _id, username, email } = jwt.decode(token)
    if (!_id) return res.status(401).json({ message: "token invalid" })
    const { refreshtoken } = await findOne(_id)
    if (refreshtoken === "") return res.status(401).json({ message: "refresh token expired" })
    try {
        const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET_STRING)
        console.log("Decoded", decoded)
        return res.status(200).json({ token: generateToken({ username, _id, email }) })
    } catch (err) {
        console.log(err)
        return res.status(403).json({ token: "" })
    }
}

module.exports = { refreshToken }