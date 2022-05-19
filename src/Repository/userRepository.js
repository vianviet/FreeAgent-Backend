const md5 = require('md5');
const mongoose = require('mongoose');
const { unsubscribe } = require('../Controller/calendarController');
const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    agentcode: { type: String },
    agentname: { type: String },
    expireddate: { type: Date },
    syncdate: { type: Date },
    status: { type: Boolean },
    key: { type: Number }
});
const User = mongoose.model('user', schema);

async function findByUserName(username) {
    const query = { username: [username] }
    const users = await User.findOne(query)
    return users

}
async function findByEmail(email) {
    const query = { email: [email] }
    const users = await User.findOne(query)
    return users

}

async function findUser(username, password) {
    const query = { username: [username], password: [password] }
    const user = await User.findOne(query)
    return user
}
async function findAllRepo() {
    const user = await User.find()
    return user
}
async function AddUser(user) {
    const newUser = new User({
        username: user.username,
        password: md5(user.password),
        email: user.email,
        agentcode: user.agentcode ? user.agentcode : "none",
        agentname: user.angentname ? user.angentname : "none",
        expireddate: user.expireddate ? user.expireddate : Date.now(),
        syncdate: Date.now(),
        status: user.status ? user.status : true,
        key: (await findAllRepo()).length + 1
    });
    await newUser.save(function(err) {
        if (err) {
            return handleError(err)
        }
    });
    console.log(newUser)
    return newUser
}

async function updateOne(user) {
    const newUser = await User.updateOne(
        user.username ? { username: user.username } : { email: user.email }, user);
    return newUser
}

async function deleteOne(user) {
    const newUser = await User.deleteOne(user.username ? { username: user.username } : {
        email: user.email
    });
    return newUser
}


module.exports = { findByUserName, findUser, findAllRepo, AddUser, findByEmail, deleteOne, updateOne }

// const admin = new User({ name: 'admin', password: 'admin' });
// admin.save(function(err) {
//     if (err) return handleError(err);
//     // saved!
// });