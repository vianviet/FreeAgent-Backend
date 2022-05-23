var jwt = require('jsonwebtoken');
require("dotenv").config();

// var token = jwt.sign({ username: "vianviet" }, process.env.JWT_SECRET_STRING, { expiresIn: process.env.EXPIRED_TOKEN });

function generateToken(data) {
    // const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: '15s' });
    const token = jwt.sign(data, process.env.JWT_SECRET_STRING, { expiresIn: process.env.EXPIRED_TOKEN });
    return token
}

// console.log(generateToken({ username: 'admin', _id: '1111111' }))

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')
    if (token[0] !== "Bearer") {
        return res.status(401).json({ message: "Authorization must start with Bearer string" })
    } else if (!token[1]) {
        return res.status(401).json({ message: "token invalid" })
    }
    try {
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET_STRING)

        console.log(decoded)
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: error.message })
    }
}


module.exports = { generateToken, verifyToken }