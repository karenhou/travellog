const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDaysInput(data) {
  let errors = {};

  data.cities = !isEmpty(data.cities) ? [...data.cities] : [];

  if (Validator.isEmpty(data.cities)) {
    errors.cities = "cities field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
