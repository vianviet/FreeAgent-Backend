const { findUser, findAllRepo } = require("../Repository/userRepository")




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
module.exports = { Authen, FindAll }