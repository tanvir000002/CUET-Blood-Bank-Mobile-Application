import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useReducer } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { axiosInstance } from '../config/axios'

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const ResetPassword = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, inputValue, validationResult: result })
        },
        [dispatchFormState]
    )

    const handleSubmit = () => {
        axiosInstance
            .put('/users/reset-password', {
                email: formState.inputValues.email,
                password: formState.inputValues.password,
            })
            .then(({ data }) => {
                navigation.navigate('Profile')
            })
            .catch((error) => alert(error.message))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={{
                            tintColor: COLORS.primary,
                            marginVertical: 48,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Reset
                        </Text>
                        <Text
                            style={{
                                ...FONTS.h2,
                                color: COLORS.black,
                                marginHorizontal: 8,
                            }}
                        >
                            Your
                        </Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.primary }}>
                            Password
                        </Text>
                    </View>

                    <View style={{ marginVertical: 20 }}>
                        <Input
                            icon="email"
                            iconPack={MaterialIcons}
                            id="email"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['email']}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                        <Input
                            icon="lock"
                            iconPack={FontAwesome}
                            id="password"
                            onInputChanged={inputChangedHandler}
                            errorText={formState.inputValidities['password']}
                            autoCapitalize="none"
                            placeholder="Enter your new password"
                            secureTextEntry
                        />
                    </View>
                    <Text
                        style={{
                            ...FONTS.body3,
                            textAlign: 'center',
                            marginVertical: 1,
                        }}
                    >
                        {/* Your new password will be sent in your registered 
                        email */}
                    </Text>
                    <Button
                        title="Reset Password"
                        filled
                        onPress={() => handleSubmit()}
                        style={{
                            width: '100%',
                        }}
                    />

                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text
                            style={{
                                ...FONTS.body3,
                                color: COLORS.primary,
                                marginVertical: 12,
                            }}
                        >
                            Remember Password
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default ResetPassword
