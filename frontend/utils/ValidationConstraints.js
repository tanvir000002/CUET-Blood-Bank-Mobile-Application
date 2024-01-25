import { validate } from 'validate.js'

export const validateStringN = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.format = {
            
            pattern: '[a-zA-Z ]+',
            flags: 'i',
            message: 'Value can only contain letters.',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}
export const validateStringL = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.format = {
            
            pattern: '[a-zA-Z, ]+',
            flags: 'i',
            message: 'Value can only contain letters, comma & space',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateStringA = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.format = {
            
        pattern: '^[a-zA-Z, ]{1,50}$',
        flags: 'i',
        message: 'Value can only contain letters, comma & space and must not exceed 50 characters',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateEmail = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.email = true
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validatePassword = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.length = {
            minimum: 6,
            message: 'must be at least 6 characters',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}
export const validatePhoneNumber = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
        format: {
            pattern: /^01\d{9,10}$/,
            //pattern: /^\d{11}$/, // 11-digit phone number format
            message: 'Invalid phone number format',
        },
    };

    const validationResult = validate({ [id]: value }, { [id]: constraints });
    return validationResult && validationResult[id];
};

export const validateBloodGroup = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
        inclusion: {
            within: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: 'Invalid blood group',
        },
    };

    const validationResult = validate({ [id]: value }, { [id]: constraints });
    return validationResult && validationResult[id];
};