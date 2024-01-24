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
            url: 'https://i.ibb.co/YXKSm0q/16262070-tp227-facebookeventcover-06.jpg',
        },
        {
            url: 'https://i.ibb.co/vhBbSQf/16262056-tp227-facebookeventcover-04.jpg',
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
