const { findAllRepo, SaveOne, findOneRepo } = require("../Repository/Calendar");
const { findOne } = require("../Repository/Upload");

async function findAllService() {
  const calendars = await findAllRepo();
  if (calendars) {
    console.log(calendars);
    return calendars;
  } else {
    console.log(calendars);
    return;
  }
}
async function findOneService(id) {
  const file = await findOne(id);
  if (file) {
    console.log(file);
    const calendars = await findOneRepo(file.filename);
    if (calendars) {
      console.log(calendars);
      return calendars;
    } else {
      console.log(calendars);
      return;
    }
  }
}
async function addCalendarService(calendar) {
  const result = await SaveOne(calendar);
  if (result) {
    return result;
  } else {
    return;
  }
}

module.exports = { findAllService, addCalendarService, findOneService };
