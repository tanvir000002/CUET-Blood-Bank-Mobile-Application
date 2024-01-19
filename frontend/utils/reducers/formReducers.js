export const reducer = (state, action) => {
    const { validationResult, inputId, inputValue } = action
    // alert(JSON.stringify(action))
    // Update input values in the state
    const updatedValues = {
        ...state.inputValues,
        [inputId]: inputValue,
    }

    // Update input validities in the state
    const updatedValidities = {
        ...state.inputValidities,
        [inputId]: validationResult,
    }

    // Check if the overall form is valid
    let updatedFormIsValid = true

    for (const key in updatedValidities) {
        if (updatedValidities[key] !== undefined) {
            updatedFormIsValid = false
            break
        }
    }

    return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
    }
}
