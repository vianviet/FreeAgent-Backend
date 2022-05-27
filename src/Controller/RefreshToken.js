const { refreshTokenService } = require("../Service/RefreshToken");

async function refreshTokenController(req, res) {
    const token = req.body.token
    const result = await refreshTokenService(token)
    if (result) {
        return res.status(200).json({ token: result })
    } else {
        return res.status(403).json({ token: "" })
    }
}

module.exports = { refreshTokenController }