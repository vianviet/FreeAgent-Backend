const express = require("express");
const {
  FindAll,
  AddCalendar,
  findAllController,
  addCalendarController,
} = require("../Controller/Calendar");
const {
  addCalendarValidation,
} = require("../Middleware/Validation/CalendarValidation");
const calendarRoute = express.Router();

calendarRoute.get("/", async (req, res) => {
  findAllController(req, res);
});

calendarRoute.post("/", addCalendarValidation, async (req, res) => {
  addCalendarController(req, res);
});

module.exports = calendarRoute;
