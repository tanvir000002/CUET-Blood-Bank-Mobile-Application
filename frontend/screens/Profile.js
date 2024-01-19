import { View, Text, Image, TouchableOpacity,Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { axiosInstance } from '../config/axios'
import {
    MaterialIcons,
    Feather,
    EvilIcons,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    AntDesign,
} from '@expo/vector-icons'
import { COLORS, FONTS, SIZES, images } from '../constants'
import * as Location from 'expo-location'

const Profile = ({ navigation }) => {
    const [address, setAddress] = useState('Chittagong')
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return
            }

            // device's current location, including latitude and longitude
            let location = await Location.getCurrentPositionAsync()
            const text = JSON.stringify(location)
            const parsedData = JSON.parse(text)
            const longitude = parsedData.coords.longitude
            const latitude = parsedData.coords.latitude
            // everse geocoding step converts the latitude and longitude into a human-readable address
            let address = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            })

            setAddress(
                `${address[0].name},${address[0].district},${address[0].city}`
            )
        }

        getPermissions()
    }, [])
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
    console.log("profile",profile)
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
                    // Top left corner on profile "<" 
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
                        name="keyboard-arrow-left" //"<"
                        size={28}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4 }}>Profile</Text>
                <TouchableOpacity 
                 //A new page need to create for profile update so we should change the pressed or do the similar thing like register
                    onPress={() => navigation.navigate('EditProfile')
                }>
                    <Feather name="edit" size={20} color={COLORS.black} />
                </TouchableOpacity>
            </View>
        )
    }

    function renderProfile() {
        //const {name,location,number,blood_group,available} = profile
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginVertical: 22,
                }}
            >
              
                <Text style={{ ...FONTS.h2, marginTop: 24 }}>{profile.name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.padding,
                    }}
                >
                    <EvilIcons
                        name="location"
                        size={24}
                        color={COLORS.primary}
                    />
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 8,
                        }}
                    >
                        {profile.location}
                    </Text>
                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        const phoneNumber = profile.number; // Replace this with the actual phone number
                        const url = `tel:${phoneNumber}`;

                        Linking.openURL(url).catch((err) => console.error('Error opening phone app:', err));
                    }}
                    style={{
                        backgroundColor: COLORS.secondary,
                        width: 150,
                        height: 50,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AntDesign 
                        name="phone"
                        size={24}
                        color={COLORS.white}
                    />
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.white,
                            marginLeft: 12,
                        }}
                    >
                        Call Now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Post')}
                    style={{
                        backgroundColor: COLORS.primary,
                        width: 150,
                        height: 50,
                        borderRadius: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons name="post-add" size={24} color={COLORS.white} />
                    <Text
                        style={{
                            ...FONTS.body4,
                            color: COLORS.white,
                            marginLeft: 12,
                        }}
                    >
                        Request
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderFeatures() {
        return (
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 33,
                        marginBottom: 33,
                    }}
                >
                    <Text style={{ ...FONTS.body3 }}>Blood Type</Text>
                    <Text style={{ ...FONTS.h1 }}>{profile.blood_group}</Text>
                </View>
            
            // </View>
        )
    }

    function renderSettings() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => console.log('Pressed')}
                >
                    <MaterialCommunityIcons
                        name="calendar-clock-outline"
                        size={24}
                        color={COLORS.primary}
                    />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        {profile.available? "Available for donate": "Not Available for donate"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <MaterialCommunityIcons name="lock-reset" size={24} color={COLORS.primary} />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        Reset Password
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 12,
                    }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <AntDesign name="logout" size={24} color={COLORS.primary} />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: 24,
                        }}
                    >
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ marginHorizontal: 22 }}>
                    {renderHeader()}
                    {renderProfile()}
                    {renderButtons()}
                    {renderFeatures()}
                    {renderSettings()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Profile