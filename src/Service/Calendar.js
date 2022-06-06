const {
  findAllRepo,
  SaveOne,
  findOneRepo,
  saveOne,
} = require("../Repository/Calendar");
const { findOne } = require("../Repository/Upload");

async function findAllService() {
  const calendars = await findAllRepo();
  if (calendars) {
    return calendars;
  } else {
    return;
  }
}
async function findOneService(id) {
  const file = await findOne(id);
  if (file) {
    const calendars = await findOneRepo(file.filename);
    if (calendars) {
      return calendars;
    } else {
      return;
    }
  }
}
async function addCalendarService(id, calendar) {
  const { filename } = await findOne(id);
  const old = await findOneRepo(filename);
  if (old) {
    const newCalendar = [...old, calendar];
    const result = await saveOne(filename, newCalendar);
    if (result) {
      return result;
    } else {
      return;
    }
  }
  return;
}

module.exports = { findAllService, addCalendarService, findOneService };
