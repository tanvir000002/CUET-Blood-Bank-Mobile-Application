import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import { images, COLORS, FONTS, SIZES } from '../constants';
import { MaterialIcons,FontAwesome } from '@expo/vector-icons'
import { axiosInstance } from '../config/axios'; 
import  { useEffect, useState } from 'react'
import moment from 'moment';

import { Entypo } from '@expo/vector-icons';
import { calculateTimeAgo } from '../utils/shared/calculateTime';


const Notification = ({ navigation }) => {
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
                    onPress={() => navigation.navigate('NotificationPost')}
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

  const [notifications, setPosts] = useState([]);
  
  useEffect(() => {
    // Fetch posts when the component mounts
    axiosInstance
      .get('/posts')
      .then(({ data }) => {
        const sorteddata = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sorteddata);
      })
      .catch((error) => console.error("Error fetching posts:", error));
      
  }, [notifications]);
  console.log('notification data:', notifications);




  // Render a single notification item
  const renderNotificationItem = ({ item }) => {
    const backgroundColor = '#FFD1DC';
    const formattedTime = calculateTimeAgo(item.createdAt);
    return (
        
      <TouchableOpacity
      onPress={() => navigation.navigate('NotificationPost',{ id: item.id })}
      //onPress={() => navigation.navigate('Home')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          paddingVertical: 12,
        //  borderBottomWidth: 1,
         // borderBottomColor: COLORS.lightGray,
          // backgroundColor,
          marginBottom: 8,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5, 
          zIndex: 1,
        }}
      >
        {/* Add an icon or image for the notification */}
        
        <Image
          source={images.Notification} // Replace with your notification icon or image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: -20,
          }}
        />
      <FontAwesome name="heartbeat" size={28} color={COLORS.red} />
        <View style={{ flex: 1 ,marginLeft: 10 ,backgroundColor: '#F9F9F9', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: COLORS.red  }}>
          <Text style={{ ...FONTS.h5,color: COLORS.pink}}>{item.notification}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.black }}>{formattedTime}</Text>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
      <PageContainer>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SIZES.padding *2,
            //paddingHorizontal: SIZES.padding,
          }}
        >
             {renderHeader()}
          {/* <Text style={{ ...FONTS.h2, color:COLORS.black }}>Notifications</Text> */}
          {/* Add a button or icon for clearing notifications or navigating back */}
        </View>

        {/* Notification List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
          contentContainerStyle={{ paddingBottom: SIZES.padding }}
        />
      </PageContainer>
    </SafeAreaView>
  );
};
export default Notification;
