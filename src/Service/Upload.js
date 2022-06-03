const { saveOne, findAll } = require("../Repository/Upload");

async function uploadService(file) {
  const result = await saveOne(file);
  if (result) {
    return result;
  } else {
    return;
  }
}
async function findAllService() {
  const result = await findAll();
  if (result) {
    return result;
  } else {
    return;
  }
}
module.exports = { uploadService, findAllService };
