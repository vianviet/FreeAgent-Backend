const { default: axios } = require("axios");
const { generateToken } = require("../Auth/Auth");
const {
  authenticateService,
  findAllService,
  findOneService,
  updateService,
  deleteService,
  registerService,
} = require("../Service/User");

async function authenticateController(req, res) {
  const { username, password } = req.body;
  const result = await authenticateService(username, password);
  if (result) {
    return res.status(200).json({ token: result }).end();
  } else {
    return res.status(400).json({ message: "Fail to Login" }).end();
  }
}
async function authenticateGoogleController(req, res) {
  const token = req.params.token;
  axios
    .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
    .then((rest) => {
      console.log(rest.data);
      const { email } = rest.data;
      return res
        .status(200)
        .json({ token: generateToken({ email }) })
        .end();
    })
    .catch((err) => console.log(err));

  //   const result = await authenticateService(username, password);
  //   if (result) {
  //     return res.status(200).json({ token: result }).end();
  //   } else {
  //     return res.status(400).json({ message: "Fail to Login" }).end();
  //   }
}

async function findAllController(req, res) {
  const allUser = await findAllService();
  if (allUser) {
    return res.status(200).json(allUser).end();
  } else {
    return res.status(400).json({ message: "Loi" }).end();
  }
}
async function findOneController(req, res) {
  const user = await findOneService(req.params.id);
  if (user) {
    return res.status(200).json(user).end();
  } else {
    return res.status(400).json({ message: "user not found" }).end();
  }
}
async function registerController(req, res) {
  const result = await registerService(req.body);
  if (result) {
    return res.status(200).json(result).end();
  } else {
    return res
      .status(400)
      .json({ message: "Da xay ra loi trong qua trinh dang ki" })
      .end();
  }
}
async function updateController(req, res) {
  const result = await updateService(req.body, req.params.id);
  if (result) {
    return res.status(200).json(result).end();
  } else {
    return res.status(400).json({ message: "Da co loi xay ra" }).end();
  }
}
async function deleteController(req, res) {
  const result = await deleteService(req.params.id);
  if (result) {
    return res.status(200).json(result).end();
  } else {
    return res.status(400).json({ message: "Error" }).end();
  }
}

module.exports = {
  authenticateController,
  findAllController,
  findOneController,
  updateController,
  deleteController,
  registerController,
  authenticateGoogleController,
};
