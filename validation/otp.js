const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOTPInput(data) {
    let errors = {}

    // Make the name field 'empty' instead of 'null'.
    data.otp = !isEmpty(data.otp) ? data.otp : '';

    if (validator.isEmpty(data.otp)) {
        errors.otp = 'OTP is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}