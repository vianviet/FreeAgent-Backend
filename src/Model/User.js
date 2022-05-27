const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    agentcode: { type: String },
    agentname: { type: String },
    expireddate: { type: Date },
    syncdate: { type: Date },
    status: { type: Boolean },
    refreshtoken: { type: String },
});
const UserModel = mongoose.model('user', schema);
module.exports = UserModel