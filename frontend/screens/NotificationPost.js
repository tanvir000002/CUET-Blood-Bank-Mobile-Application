import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons, Ionicons, AntDesign, FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import { COLORS, SIZES, FONTS } from '../constants'
import Slideshow from 'react-native-image-slider-show'
import { categories } from '../constants/data'
import DonationCard from '../components/DonationCard'
import { donationRequests } from '../constants/data'
import axios from 'axios';
import { axiosInstance } from '../config/axios'
import Post from './Post'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import BottomTabNavigation from '../navigation/BottomTabNavigation
const NotificationPost =  ({ navigation,route }) => {
    const { id } = route.params;
  // const postId = localStorage.getItem("postId")
    console.log('navigation',id)
    const [position, setPosition] = useState(0)
    
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
   console.log('post',posts)

    
    useEffect(() => {
        const toggle = setInterval(() => {
            setPosition(position === dataSource.length - 1 ? 0 : position + 1)
        }, 3000)

        return () => clearInterval(toggle)
    })


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
                      borderRadius: 8,
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
    function renderDonationCard() {
        return (
          // <ScrollView>
          
          //    {posts.slice().reverse().map((post, index) => (
              <DonationCard
                //key={index}
                name={posts.name}
                location={posts.location}
                amount={posts.amount}
                blood_group={posts.blood_group}
                number={posts.number}
                details={posts.details}
                id = {posts.id}
                // Adjust the properties based on your post structure
                postedDate={posts.postedDate}
                navigation={navigation} 
              />
          //   ))}
          // </ScrollView>
        );
      }
    
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
             <ScrollView>
             {renderHeader()}
          <View style={{ marginHorizontal: 22 }}>
            {renderDonationCard()}
          </View>
          </ScrollView>
          {/* <BottomTabNavigation /> */}
        </SafeAreaView>
      );
    };
    
    export default NotificationPost;
