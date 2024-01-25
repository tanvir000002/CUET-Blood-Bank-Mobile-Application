import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons, Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons'
import { COLORS, SIZES, FONTS } from '../constants'
import Slideshow from 'react-native-image-slider-show'
import { categories } from '../constants/data'
import DonationCard from '../components/DonationCard'
import { donationRequests } from '../constants/data'
import axios from 'axios';
import { axiosInstance } from '../config/axios'
import Post from './Post'

const Home =  ({ navigation }) => {
    const [position, setPosition] = useState(0)
    const [dataSource, setDataSource] = useState([
      {
        // url: 'https://i.ibb.co/vhBbSQf/16262056-tp227-facebookeventcover-04.jpg',
        url:'https://bestinformationguru.com/wp-content/uploads/2020/04/Blood-Donation-2.jpg',
     },
    {
       url: 'data:image/jpeg;base64,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',
     // url:'https://media.istockphoto.com/id/1349428314/video/blood-donation-animation-video-illustration-4k-video.jpg?s=640x640&k=20&c=IKuxsLSfdQNP5q0c93o4_EjMVPEJc2lcAqpWHfsAIKw=',
   },
     {

       url:'https://cdn.arstechnica.net/wp-content/uploads/2013/05/donate_blood_rotator.jpg'
     },
    ])
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Fetch posts when the component mounts
      axiosInstance
        .get('/posts')
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((error) => console.error("Error fetching posts:", error));
    }, [posts]);

    
    useEffect(() => {
        const toggle = setInterval(() => {
            setPosition(position === dataSource.length - 1 ? 0 : position + 1)
        }, 3000)

        return () => clearInterval(toggle)
    })
  

    function renderSliderBanner() {
        return (
            <View
                style={{
                    height: 200,
                    width: '100%',
                }}
            >
                <Slideshow position={position} dataSource={dataSource} />
            </View>
        )
    }

    function renderDonationCard() {
        return (
          <ScrollView>
          
             {posts.slice().reverse().map((post, index) => (
              <DonationCard
                key={index}
                name={post.name}
                location={post.location}
                amount={post.amount}
                blood_group={post.blood_group}
                number={post.number}
                details={post.details}
                id = {post.id}
                userId = {post.userId}
                // Adjust the properties based on your post structure
                postedDate={post.postedDate}
                navigation={navigation} 
              />
            ))}
          </ScrollView>
        );
      }
    
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
             <ScrollView>
          <View style={{ marginHorizontal: 22 }}>
            {/* {renderHeader()} */}
            {renderSliderBanner()}
            {renderDonationCard()}
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    export default Home;
