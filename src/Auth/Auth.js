var jwt = require('jsonwebtoken');
const { findOne } = require('../Repository/userRepository');
require("dotenv").config();

// var token = jwt.sign({ username: "vianviet" }, process.env.JWT_SECRET_STRING, { expiresIn: process.env.EXPIRED_TOKEN });

function generateToken(data) {
    // const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: '15s' });
    const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: process.env.EXPIRED_TOKEN });
    return token
}

function generateRefreshToken(data) {
    // const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: '15s' });
    const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: process.env.EXPIRED_TOKEN_REFRESH });
    return token
}


async function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization')
    console.log("verify", authHeader)
    if (!authHeader) return res.status(401).json({ message: "token invalid" })
    const token = authHeader && authHeader.split(' ')
    if (token[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization must start with Bearer string" })
    } else if (!token[1]) {
        return res.status(401).json({ message: "token invalid" })
    }
    try {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET_STRING)

        console.log("Decoded", decoded)
        next()
    } catch (err) {
        // if (err.name === "TokenExpiredError") {
        //     const { _id, username, email } = jwt.decode(token[1])
        //     if (!_id) return res.status(403).json({ token: "" })
        //     const { refreshtoken, } = await findOne(_id)
        //     if (refreshtoken === "") return res.status(403).json({ token: "" })
        //     try {
        //         const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET_STRING)
        //         console.log("Decoded", decoded)
        //         return res.status(403).json({ token: generateToken({ username, _id, email }) })
        //     } catch (err) {
        //         return res.status(403).json({ token: "" })
        //     }

        // }
        console.log("err", err)
        return res.status(401).json(err)
    }
}

module.exports = { generateToken, verifyToken, generateRefreshToken }