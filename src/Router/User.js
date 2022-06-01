const express = require("express");
const {
  findAllController,
  findOneController,
  authenticateController,
  registerController,
  updateController,
  deleteController,
} = require("../Controller/User");
const userRoute = express.Router();
const { verifyToken } = require("../Auth/Auth");
const { wrapHandle } = require("../Middleware/wrapHandle");
const {
  addNewUserValidation,
  loginValidation,
  updateUserValidation,
} = require("../Middleware/Validation/UserValidation");

userRoute.get("/", verifyToken, wrapHandle(findAllController));
userRoute.get("/:id", verifyToken, wrapHandle(findOneController));
userRoute.post("/authen", loginValidation, wrapHandle(authenticateController));
userRoute.post(
  "/",
  [verifyToken, addNewUserValidation],
  wrapHandle(registerController)
);
userRoute.put(
  "/:id",
  [verifyToken, updateUserValidation],
  wrapHandle(updateController)
);
userRoute.delete("/:id", verifyToken, wrapHandle(deleteController));

module.exports = userRoute;
