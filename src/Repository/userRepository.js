const mongoose = require('mongoose');
const schema = new mongoose.Schema({ username: 'string', password: 'string' });
const User = mongoose.model('user', schema);

// connectDB();


async function findUser(username, password) {
    const query = { username: [username], password: [password] }
    const user = await User.findOne(query)
    return user
}

module.exports = { findUser }

// const admin = new User({ name: 'admin', password: 'admin' });
// admin.save(function(err) {
//     if (err) return handleError(err);
//     // saved!
// });