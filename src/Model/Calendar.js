const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: 'String',
    start: 'Date',
    end: 'Date',
    phone: 'String',
    message: 'String'
});

const CalendarModel = mongoose.model('calendar', schema);
module.exports = CalendarModel