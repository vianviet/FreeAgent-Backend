const { findUser, findAllRepo, AddUser, findByUserName, findByEmail } = require("../Repository/userRepository")
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
    if (!existUserName || !existEmail) {
        // const user = { username: req.body.username, password: md5(req.body.password) }
        const result = await AddUser(req.body);
        if (result) {
            return res.status(200).json(result).end()
        } else {
            return res.status(400).json({ message: "Da xay ra loi trong qua trinh dang ki" }).end()
        }
    } else {
        return res.status(400).json({ message: "Ten dang nhap hoac email da ton tai" }).end()
    }

}

module.exports = { Authen, FindAll, Register }