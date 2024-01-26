import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useReducer,useEffect,useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, COLORS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { axiosInstance } from '../config/axios'
import BottomTabNavigation from '../navigation/BottomTabNavigation'

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const EditProfile = ({ navigation }) => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, inputValue, validationResult: result })
        },
        [dispatchFormState]
    )
    console.log('form: ',formState);
    const handleSubmit = () => {
        axiosInstance
            .put('/users/edit-profile', {
                name: formState.inputValues.fullName,
                email: formState.inputValues.email,
                number: formState.inputValues.phoneNumber,
                location: formState.inputValues.location,
                blood_group: formState.inputValues.bloodType,
                available: formState.inputValues.available,
            })
            .then(({ data }) => {
                navigation.navigate('Login')
            })
            .catch((error) => alert(error.message))
    }
    const [profile, setProfile] = useState({});

    useEffect(() => {
      // Fetch posts when the component mounts
      axiosInstance
        .get('/users/profile')
        .then(({ data }) => {
        setProfile(data);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }, []);
 
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.secondaryWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={28}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4, left: -20, }}>Edit Profile</Text>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <ScrollView>
                    {renderHeader()}
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
                                marginVertical: 22,
                            }}
                        />

                        <View style={{ marginVertical: 20 }}>
                            <Input
                                icon="user"
                                iconPack={FontAwesome}
                                id="fullName"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['fullName']
                                }
                                placeholder={profile.name}
                            />
                            <Input
                                icon="email"
                                iconPack={MaterialIcons}
                                id="email"
                                onInputChanged={inputChangedHandler}
                                errorText={formState.inputValidities['email']}
                                placeholder={profile.email}
                                keyboardType="email-address"
                            />
                            <Input
                                icon="phone"
                                iconPack={FontAwesome}
                                id="phoneNumber"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['phoneNumber']
                                }
                                placeholder={profile.number}
                            />

                            <Input
                                icon="blood-drop"
                                iconPack={Fontisto}
                                id="bloodType"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['bloodType']
                                }
                                placeholder={profile.blood_group}
                            />
                            <Input
                                icon="event-available"
                                iconPack={MaterialIcons}
                                id="available"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['available']
                                }
                                placeholder={profile.available}
                            />
                            <Input
                                icon="location-on"
                                iconPack={MaterialIcons}
                                id="location"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['location']
                                }
                                placeholder={profile.location}
                            />
                        </View>
                        <Button
                            title="Update Profile"
                            filled
                            onPress={() => handleSubmit()}
                            style={{
                                width: '100%',
                            }}
                        />

                        
                    </View>
                </ScrollView>
                {/* <BottomTabNavigation /> */}
            </PageContainer>
        </SafeAreaView>
    )
}

export default EditProfile
