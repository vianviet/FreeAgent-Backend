const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let error = null;
    // if (!file.originalname.startsWith("NAPA")) {
    //   error = "Name must start with NAPA word";
    // }
    cb(
      //   error ? new Error(error) : null,
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const maxSize = process.env.MAXSIZE;

const upload = multer({
  storage: storage,
  limits: { fileSize: Number(maxSize) },
});
module.exports = { upload };
