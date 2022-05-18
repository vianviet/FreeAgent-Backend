const { findAllRepo, SaveOne } = require("../Repository/calendarRepository");

async function FindAll(req, res) {
    const Calendars = await findAllRepo();
    if (Calendars) {
        return res.status(200).json(Calendars).end()
    } else {
        return res.status(400).json({ "message": "Loi" }).end()
    }
}
async function AddCalendar(req, res) {
    const calendar = { title: req.body.title, start: req.body.start, end: req.body.end, phone: req.body.phone, message: req.body.message }
    const result = await SaveOne(calendar);
    if (result) {
        return res.status(200).json(result).end()
    } else {
        return res.status(400).json({ message: "Co loi xay ra" }).end()
    }

}

module.exports = { FindAll, AddCalendar }