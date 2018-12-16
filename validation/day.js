const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDaysInput(data) {
  let errors = {};

  data.cities[0] = !isEmpty(data.cities[0]) ? data.cities[0] : "";

  if (Validator.isEmpty(data.cities[0])) {
    errors.cities = "cities field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
