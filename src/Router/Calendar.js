const express = require("express");
const {
  findAllController,
  addCalendarController,
} = require("../Controller/Calendar");
const {
  addCalendarValidation,
} = require("../Middleware/Validation/CalendarValidation");
const { wrapHandle } = require("../Middleware/wrapHandle");
const calendarRoute = express.Router();

calendarRoute.get("/", wrapHandle(findAllController));

calendarRoute.post(
  "/",
  addCalendarValidation,
  wrapHandle(addCalendarController)
);

module.exports = calendarRoute;
