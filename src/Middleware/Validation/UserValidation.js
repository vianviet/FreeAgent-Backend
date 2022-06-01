const Joi = require("joi");

function addNewUserValidation(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    agentcode: Joi.string().empty(""),
    agentname: Joi.string().empty(" "),
    expireddate: Joi.string().empty(" "),
  });
  validateRequest(req, res, next, schema);
}
function loginValidation(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, res, next, schema);
}
function updateUserValidation(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    agentcode: Joi.string().empty(""),
    agentname: Joi.string().empty(" "),
    expireddate: Joi.string().empty(" "),
  });
  validateRequest(req, res, next, schema);
}

function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    res.status(406).send(
      error.details.reduce((result, item) => {
        result[item.path[0]] = item.message;
        return result;
      }, {})
    );
  } else {
    req.body = value;
    next();
  }
}
module.exports = {
  addNewUserValidation,
  loginValidation,
  updateUserValidation,
};
