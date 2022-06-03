const express = require("express");
const { uploadController, findAllController } = require("../Controller/Upload");
const uploadRouter = express.Router();
const { wrapHandle } = require("../Middleware/wrapHandle");

uploadRouter.post("/", wrapHandle(uploadController));
uploadRouter.get("/", wrapHandle(findAllController));
module.exports = { uploadRouter };
