const Joi = require("joi");

function addCalendarValidation(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().max(6).required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    phone: Joi.string().max(11).min(9).required(),
    message: Joi.string().required(),
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
module.exports = { addCalendarValidation };
