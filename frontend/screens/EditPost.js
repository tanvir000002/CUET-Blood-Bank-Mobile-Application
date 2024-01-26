import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import axios from 'axios'
import React, { useCallback, useReducer,useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, COLORS, SIZES, images } from '../constants'
import { MaterialIcons, FontAwesome, Fontisto,AntDesign } from '@expo/vector-icons'
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

const EditPost = ({ navigation,route}) => {
    const { id } = route.params;
    // const postId = localStorage.getItem("postId")
    console.log('navigation',id)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    
    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, inputValue, validationResult: result })
        },
        [dispatchFormState]
    )
    console.log('form: ',formState);
    const handleEditpost = () => {
        axiosInstance
            .put(`/posts/edit/${id}`, {
                name: formState.inputValues.fullName,
                number: formState.inputValues.phoneNumber,
                location: formState.inputValues.location,
                blood_group: formState.inputValues.bloodType,
                amount: parseInt(formState.inputValues.bloodBag),
                details: formState.inputValues.whyNeeded,
            })
            .then(({ data }) => {
                // localStorage.clear();
                navigation.replace('BottomTabNavigation');
            })
            .catch((error) => alert(error.message))
    }
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Fetch posts when the component mounts
      axiosInstance
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setPosts(data);

        })
        .catch((error) => console.error("Error fetching posts:", error));
    }, [posts]);
   console.log('post update',posts)
   console.log('amount',posts.amount);
   const amountString = posts.amount?.toString() || '';
  console.log('amomfnbjdnjfnunt', amountString);
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
                                marginVertical: 15,
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
                                placeholder={posts.name}
                            />
                           
                            <Input
                                icon="phone"
                                iconPack={FontAwesome}
                                id="phoneNumber"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['phoneNumber']
                                }
                                placeholder={posts.number}
                            />

                            <Input
                                icon="blood-drop"
                                iconPack={Fontisto}
                                id="bloodType"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['bloodType']
                                }
                                placeholder={posts.blood_group}
                            />
                            <Input
                                icon="blood"
                                iconPack={Fontisto}
                                id="bloodBag"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['bloodBag']
                                }
                                
                                placeholder={amountString}
                            />

                            <Input
                                icon="location-on"
                                iconPack={MaterialIcons}
                                id="location"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['location']
                                }
                                placeholder={posts.location}
                            />
                            <Input
                                icon="questioncircleo"
                                iconPack={AntDesign}
                                id="whyNeeded"
                                onInputChanged={inputChangedHandler}
                                errorText={
                                    formState.inputValidities['whyNeeded']
                                }
                                placeholder={posts.details}
                            />
                        </View>
                        <Button
                            title="UpdatePost"
                            filled
                            //whenever a post is done it will update database
                            onPress={() => handleEditpost()}
                            // onPress={() => navigation.navigate('Home')}
                            style={{
                                width: '100%',
                            }}
                        />
                    </View>
                </ScrollView>
            </PageContainer>
        </SafeAreaView>
    )
}

export default EditPost
