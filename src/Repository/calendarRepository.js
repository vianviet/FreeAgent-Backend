const mongoose = require('mongoose');
const schema1 = new mongoose.Schema({ username: 'string', password: 'string' });
const schema = new mongoose.Schema({
    title: 'String',
    start: 'Date',
    end: 'Date',
    phone: 'String',
    message: 'String'
});

const Calendar = mongoose.model('calendar', schema);

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