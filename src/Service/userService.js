const { findUser, findAllRepo, AddUser, findByUserName } = require("../Repository/userRepository")

async function Authen(req, res) {
    // console.log('tren', findUser(req.body.username, req.body.password));
    const authen = await findUser(req.body.username, req.body.password);
    console.log('authen', authen)
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
    if (!existUserName) {
        const user = { username: req.body.username, password: req.body.password }
        const result = await AddUser(user);
        if (result) {
            return res.status(200).json(result).end()
        } else {
            return res.status(400).json({ message: "Da xay ra loi trong qua trinh dang ki" }).end()
        }
    } else {
        return res.status(400).json({ message: "Ten dang nhap da ton tai" }).end()
    }

}

module.exports = { Authen, FindAll, Register }