import {
    validateEmail,
    validatePassword,
    validateString,
    validatePhoneNumber,
    validateBloodGroup,
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    if (
        inputId === 'fullName' ||
        inputId === 'location'
    ) {
        return validateString(inputId, inputValue)
    } else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'password') {
        return validatePassword(inputId, inputValue)
    } else if (inputId === 'bloodType') {
        return validateBloodGroup(inputId, inputValue)
    } else if (inputId === 'phoneNumber') {
        return validatePhoneNumber(inputId, inputValue)
    }
}
