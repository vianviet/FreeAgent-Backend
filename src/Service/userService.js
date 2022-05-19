const { findUser, findAllRepo, AddUser, findByUserName, findByEmail, deleteOne, updateOne } = require("../Repository/userRepository")
const md5 = require('md5')

async function Authen(req, res) {
    const authen = await findUser(req.body.username, md5(req.body.password));
    if (authen) {
        return res.status(200).json({ "message": "Dang nhap thanh cong" }).end()
    } else {
        return res.status(400).json({ "message": "Dang nhap that bai" }).end()
    }
}

async function FindAll(req, res) {
    const allUser = await findAllRepo();
    if (allUser) {
        return res.status(200).json(allUser).end()
    } else {
        return res.status(400).json({ "message": "Loi" }).end()
    }
}
async function Register(req, res) {
    const existUserName = await findByUserName(req.body.username);
    const existEmail = await findByEmail(req.body.email);
    if (existEmail) {
        return res.status(400).json({ message: "email existing, please try another email" }).end()

    } else if (existUserName) {
        return res.status(400).json({ message: "username existing, please try another username" }).end()
    } else {
        const result = await AddUser(req.body);
        if (result) {
            return res.status(200).json(result).end()
        } else {
            return res.status(400).json({ message: "Da xay ra loi trong qua trinh dang ki" }).end()
        }

    }

}
async function Update(req, res) {
    const user = req.body
    if (user.password) {
        user.password = md5(user.password)
    }
    const result = await updateOne(user);
    if (result.modifiedCount > 0) {
        return res.status(200).json(result).end()
    } else {
        return res.status(400).json(result).end()
    }
}
async function Delete(req, res) {
    const result = await deleteOne(req.body);
    if (result.deletedCount > 0) {
        return res.status(200).json(result).end()
    } else {
        return res.status(400).json(result).end()
    }
}

module.exports = { Authen, FindAll, Register, Update, Delete }