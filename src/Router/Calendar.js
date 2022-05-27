const express = require('express');
const { FindAll, AddCalendar, findAllController, addCalendarController } = require('../Controller/Calendar');
const calendarRoute = express.Router()


calendarRoute.get("/", async(req, res) => {
    findAllController(req, res)
});

calendarRoute.post("/", async(req, res) => {
    addCalendarController(req, res);
});

module.exports = calendarRoute