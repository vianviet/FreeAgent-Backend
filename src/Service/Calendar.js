const { findAllRepo, SaveOne } = require("../Repository/Calendar");

async function findAllService() {
    const calendars = await findAllRepo();
    if (calendars) {
        return calendars
    } else {
        return;
    }
}
async function addCalendarService(calendar) {
    const result = await SaveOne(calendar);
    if (result) {
        return result
    } else {
        return;
    }

}

module.exports = { findAllService, addCalendarService }