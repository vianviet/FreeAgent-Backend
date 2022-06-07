const {
  findUser,
  findAllRepo,
  AddUser,
  findByUserName,
  findByEmail,
  deleteOne,
  updateOne,
  findOne,
} = require("../Repository/User");
const md5 = require("md5");
const { generateToken, generateRefreshToken } = require("../Auth/Auth");

async function authenticateService(username, password) {
  const authen = await findUser(username, md5(password));
  if (authen) {
    const { username, _id, email } = authen;
    const result = await updateOne(_id, {
      refreshtoken: generateRefreshToken({ username, _id, email }),
    });
    return generateToken({ username, _id, email });
  } else {
    return;
  }
}

async function findAllService() {
  const result = await findAllRepo();
  if (result) {
    return result;
  } else {
    return;
  }
}
async function findOneService(id) {
  const result = await findOne(id);
  if (result) {
    return result;
  } else {
    return;
  }
}
async function registerService(user) {
  const existUserName = await findByUserName(user.username);
  const existEmail = await findByEmail(user.email);
  if (existEmail) {
    return;
  } else if (existUserName) {
    return;
  } else {
    const result = await AddUser(user);
    return result;
  }
}
async function updateService(user, id) {
  if (user.password) {
    user.password = md5(user.password);
  }
  const result = await updateOne(id, user);
  if (result.modifiedCount > 0) {
    return result;
  } else {
    return;
  }
}
async function deleteService(id) {
  const result = await deleteOne(id);
  if (result.deletedCount > 0) {
    return result;
  } else {
    return;
  }
}

module.exports = {
  authenticateService,
  findAllService,
  registerService,
  updateService,
  deleteService,
  findOneService,
};
