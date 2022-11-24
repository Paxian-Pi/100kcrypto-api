const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTokenInput(data) {
    
    let errors = {}
    
    // Make the name field 'empty' instead of 'null'.
    data.token = !isEmpty(data.token) ? data.token : '';
    
    if (validator.isEmpty(data.token)) {
        errors.token = 'Enter a valid token';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}