// Imports the necessary modules and components
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    GetStarted,
    Home,
    Login,
    OnboardingStarter,
    Register,
    ResetPassword,
    SuccessVerification,
    Profile,
    Notification,
    Post,
    EditProfile,
    EditPost, 
    NotificationPost
} from './screens'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomTabNavigation from './navigation/BottomTabNavigation'

// Prevents the splash screen from automatically hiding
SplashScreen.preventAutoHideAsync()


const Stack = createNativeStackNavigator()

export default function App() {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false)
            }
        })
    }, [])

    // Font Loading
    const [fontsLoaded] = useFonts({
        black: require('./assets/fonts/Poppins-Black.ttf'),
        bold: require('./assets/fonts/Poppins-Bold.ttf'),
        medium: require('./assets/fonts/Poppins-Medium.ttf'),
        regular: require('./assets/fonts/Poppins-Regular.ttf'),
        semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <Stack.Navigator
                initialRouteName={
                    isFirstLaunch ? 'OnboardingStarter' : 'GetStarted'
                }
            >
                <Stack.Screen
                    name="OnboardingStarter"
                    component={OnboardingStarter}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SuccessVerification"
                    component={SuccessVerification}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Post"
                    component={Post}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditPost"
                    component={EditPost}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="NotificationPost"
                    component={NotificationPost}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
