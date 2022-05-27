const mongoose = require('mongoose');
const CalendarModel = require('../Model/Calendar');

const Calendar = CalendarModel

async function findAllRepo() {
    const user = await Calendar.find()
    return user
}
async function SaveOne(calendar) {
    const newCalendar = new Calendar({ title: calendar.title, start: calendar.start, end: calendar.end, phone: calendar.phone, message: calendar.message });
    await newCalendar.save(function(err) {
        if (err) {
            return handleError(err)
        }
    });
    console.log(newCalendar)
    return newCalendar
}


module.exports = { findAllRepo, SaveOne }