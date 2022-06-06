const mongoose = require("mongoose");
const { default: readXlsxFile } = require("read-excel-file/node");
const { default: writeXlsxFile } = require("write-excel-file/node");
const CalendarModel = require("../Model/Calendar");
const CalendarSchema = require("../Model/Excel/CalendarSchema");

const Calendar = CalendarModel;

const schema = CalendarSchema;

const map = {
  title: "title",
  start: "start",
  end: "end",
  phone: "phone",
  message: "message",
};

async function findOneRepo(filename) {
  const result = await readXlsxFile(`./uploads/${filename}`, { map }).then(
    ({ rows }) => {
      return rows;
    }
  );
  return result;
}

async function findAllRepo() {
  const user = await Calendar.find();
  return user;
}
async function saveOne(filename, calendar) {
  // const old = await findOneRepo(filename);
  await writeXlsxFile(calendar, {
    schema,
    filePath: `./uploads/${filename}`,
  });
  return calendar;
}

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

module.exports = { findAllRepo, SaveOne, findOneRepo, saveOne };
