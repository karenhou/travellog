const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTripInput(data) {
  let errors = {};

  data.country = !isEmpty(data.country) ? data.country : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (Validator.isEmpty(data.country)) {
    errors.country = "country field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }
  if (Validator.isEmpty(data.to)) {
    errors.to = "to field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
