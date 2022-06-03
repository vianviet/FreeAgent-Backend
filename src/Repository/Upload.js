const mongoose = require("mongoose");
const UploadModel = require("../Model/Upload");

const Upload = UploadModel;

async function findAll() {
  return await Upload.find();
}

async function findOne(id) {
  return await Upload.findOne({ _id: mongoose.Types.ObjectId(id) });
}

async function saveOne(file) {
  const newFile = new Upload(file);
  const result = await newFile.save();
  return result;
}
module.exports = { saveOne, findOne, findAll };
