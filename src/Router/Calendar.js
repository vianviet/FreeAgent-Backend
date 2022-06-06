const express = require("express");
const {
  findAllController,
  addCalendarController,
  findOneController,
} = require("../Controller/Calendar");
const {
  addCalendarValidation,
} = require("../Middleware/Validation/CalendarValidation");
const { wrapHandle } = require("../Middleware/wrapHandle");
const calendarRoute = express.Router();
calendarRoute.get("/findOne/:id", wrapHandle(findOneController));
calendarRoute.get("/", wrapHandle(findAllController));

calendarRoute.post(
  "/:id",
  addCalendarValidation,
  wrapHandle(addCalendarController)
);

module.exports = calendarRoute;
