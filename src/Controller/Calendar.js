const { findAllService, addCalendarService } = require("../Service/Calendar");

async function findAllController(req, res) {
    const result = await findAllService()
    if (result) {
        return res.status(200).json(result).end()
    } else {
        return res.status(400).json({ "message": "Loi" }).end()
    }
}
async function addCalendarController(req, res) {
    const calendar = { title: req.body.title, start: req.body.start, end: req.body.end, phone: req.body.phone, message: req.body.message }
    const result = await addCalendarService(calendar)
    if (result) {
        return res.status(200).json(result).end()
    } else {
        return res.status(400).json({ message: "Co loi xay ra" }).end()
    }

}

module.exports = { findAllController, addCalendarController }