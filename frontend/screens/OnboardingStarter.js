import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'

const Dots = ({ selected }) => {
    let backgroundColor
    backgroundColor = selected ? '#ff2156' : '#808080'
    return (
        <View
            style={{
                height: 5,
                width: 5,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    )
}

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{
            marginRight: 12,
        }}
        {...props}
    >
        <Text style={{ color: '#ff2156' }}>Done</Text>
    </TouchableOpacity>
)

//at first of every user shows some motivation for blood donation
const OnboardingStarter = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.navigate('GetStarted')}
            onDone={() => navigation.navigate('GetStarted')}
            DotComponent={Dots}
            bottomBarColor="#ffffff"
            DoneButtonComponent={Done}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('../assets/images/onboarding_1.png')}
                        />
                    ),
                    title: 'Be a Donor',
                    subtitle:
                        'Donating blood is not just a drop in the bucket; its a drop that fills a well of hope. Your contribution matters, and so does every heartbeat it sustains.',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('../assets/images/onboarding_2.png')}
                        />
                    ),
                    title: 'Find Blood Donors',
                    subtitle:
                        'In every drop of blood, there is a story of compassion. Be the author of a life-changing chapter – donate blood.',
                },
            ]}
        />
    )
}

export default OnboardingStarter
