import {
    validateEmail,
    validatePassword,
    validateStringN,
    validateStringL,
    validateStringA,
    validatePhoneNumber,
    validateBloodGroup,
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    if (
        inputId === 'fullName') {
        return validateStringN(inputId, inputValue)
    } else if (
        inputId === 'location') {
        return validateStringL(inputId, inputValue)
    }
    else if (inputId === 'available') {
        return validateStringA(inputId, inputValue)
    }
    else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'password') {
        return validatePassword(inputId, inputValue)
    } else if (inputId === 'bloodType') {
        return validateBloodGroup(inputId, inputValue)
    } else if (inputId === 'phoneNumber') {
        return validatePhoneNumber(inputId, inputValue)
    }
}
