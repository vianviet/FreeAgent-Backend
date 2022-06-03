const mongoose = require("mongoose");
const { default: readXlsxFile } = require("read-excel-file/node");
const CalendarModel = require("../Model/Calendar");

const Calendar = CalendarModel;

const map = {
  title: "title",
  start: "start",
  end: "end",
  phone: "phone",
  message: "message",
};
async function findAllRepo() {
  const result = await readXlsxFile("./calendar.xlsx", { map }).then(
    ({ rows }) => {
      return rows;
    }
  );
  console.log("repo result", result);
  return result;
}
async function findOneRepo(filename) {
  const result = await readXlsxFile(`./uploads/${filename}`, { map }).then(
    ({ rows }) => {
      return rows;
    }
  );
  console.log("repo result", result);
  return result;
}

// async function findAllRepo() {
//     const user = await Calendar.find()
//     return user
// }

async function SaveOne(calendar) {
  const newCalendar = new Calendar({
    title: calendar.title,
    start: calendar.start,
    end: calendar.end,
    phone: calendar.phone,
    message: calendar.message,
  });
  await newCalendar.save(function (err) {
    if (err) {
      return handleError(err);
    }
  });
  console.log(newCalendar);
  return newCalendar;
}

module.exports = { findAllRepo, SaveOne, findOneRepo };
