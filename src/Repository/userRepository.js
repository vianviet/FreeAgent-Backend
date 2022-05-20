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
async function findOne(id) {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) })
    return user
}
async function AddUser(user) {
    const newUser = new User({
        username: user.username,
        password: md5(user.password),
        email: user.email,
        agentcode: user.agentcode,
        agentname: user.agentname,
        expireddate: user.expireddate,
        syncdate: Date.now(),
        status: user.status ? user.status : true,
    });
    await newUser.save(function(err) {
        if (err) {
            return handleError(err)
        }
    });
    console.log(newUser)
    return newUser
}

async function updateOne(id, user) {
    const newUser = await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, user);
    return newUser
}

async function deleteOne(id) {
    const newUser = await User.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    return newUser
}


module.exports = { findByUserName, findUser, findAllRepo, AddUser, findByEmail, deleteOne, updateOne, findOne }

// const admin = new User({ name: 'admin', password: 'admin' });
// admin.save(function(err) {
//     if (err) return handleError(err);
//     // saved!
// });