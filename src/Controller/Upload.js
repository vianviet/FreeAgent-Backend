const multer = require("multer");
const { upload } = require("../Middleware/Upload/upload");
const { uploadService, findAllService } = require("../Service/Upload");

async function uploadController(req, res) {
  console.log(req.file);
  try {
    const uploadFile = upload.single("NAPA");
    uploadFile(req, res, async (err) => {
      const file = req.file;
      console.log(file);
      if (err) {
        console.log("E", err);
        res.status(400).send({ error: err.message });
        return;
      } else if (!file) {
        res.status(404).send({ error: "please upload file" });
        return;
      }
      const result = await uploadService(file);
      if (result) {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log("error", error);
    res.json({ error: error.message });
  }
}
async function findAllController(req, res) {
  const result = await findAllService();
  if (result) {
    return res.status(200).json(result).end();
  } else {
    return res.status(404).json(result).end();
  }
}
module.exports = { uploadController, findAllController };
