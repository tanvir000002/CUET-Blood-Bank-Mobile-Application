import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    SimpleLineIcons,
    AntDesign,
    FontAwesome,
    MaterialIcons,
    Fontisto,
} from '@expo/vector-icons'
import React from 'react'
import { COLORS } from '../constants'
import { DonationRequest, Home, Profile, Report, Search,Post,Notification,NotificationPost} from '../screens'
import { Platform } from 'react-native'

const Tab = createBottomTabNavigator()


// this is used for bottom option on home page-> Home, search, request, profile 
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white,
    },
}
const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SimpleLineIcons
                                name="home"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />
                 <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <FontAwesome
                                name="search"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />
               <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.secondary,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -5 : -20,
                                    borderRadius:
                                        Platform.OS == 'ios' ? 25 : 30,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                <AntDesign 
                                    name="profile"
                                    size={24}
                                    color={focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                                />
                            </View>
                        )
                    },
                }}
            />
       

         


            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialIcons
                                name="notifications"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <AntDesign
                            name="user"
                                size={24}
                                color={
                                    focused
                                        ? COLORS.primary
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
