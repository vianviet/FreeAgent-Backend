const express = require('express');
const { FindAll, AddCalendar } = require('../Service/calendarService');
const calendarController = express.Router()


calendarController.get("/", async(req, res) => {
    FindAll(req, res)
});

calendarController.post("/", async(req, res) => {
    AddCalendar(req, res);
});

module.exports = calendarController