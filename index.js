const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./db');
const userController = require('./src/Controller/userController');
require("dotenv").config();

const port = process.env.PORT;

const main = async() => {
    connectDB();
    const app = express();
    app.use(express.json());
    app.use('/user', userController)
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

main();



// connectDB();
// const schema = new mongoose.Schema({ username: 'string', password: 'string' });
// const User = mongoose.model('user', schema);
// const query = User.findOne({ 'name': 'admin' })
// query.exec(function(err, person) {
//     if (err) return handleError(err);
//     // Prints "Space Ghost is a talk show host."
//     console.log('result', person.name, person.password, );
// })
// const admin = new User({ username: 'admin', password: 'admin' });
// admin.save(function(err) {
//     if (err) return handleError(err);
//     console.log(save)
// });