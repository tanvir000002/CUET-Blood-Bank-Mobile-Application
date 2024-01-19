import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../components/PageContainer';
import { images, COLORS, FONTS, SIZES } from '../constants';
import { MaterialIcons } from '@expo/vector-icons'
import { axiosInstance } from '../config/axios'; 
import  { useEffect, useState } from 'react'




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
  // Sample notification data
  // const notifications = [
  //   { id: 1, message: 'New message from John Doe', date: '2 hours ago' },
  //   { id: 2, message: 'You have a new follower', date: '1 day ago' },
  //   { id: 3, message: 'Your post has been liked', date: '3 days ago' },
  //   // Add more notification data as needed
  // ];

  const [notifications, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    axiosInstance
      .get('/posts')
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, [notifications]);
  console.log('notification data:', notifications);


    // let notifications; 
    // console.log('notification data:');
    // const fetchData = async () => {
    //     try {
    //         const response = await axiosInstance.get('/posts');
    //         notifications = response.data;
    //         console.log('notification data:', notifications);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // fetchData();
















  // Render a single notification item
  const renderNotificationItem = ({ item }) => {
    return (
        
      <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.primary,
        }}
      >
        {/* Add an icon or image for the notification */}
        <Image
          source={images.Notification} // Replace with your notification icon or image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h3 }}>{item.notification}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.secondary }}>{item.createdAt}</Text>

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SIZES.padding * 2,
          }}
        >
             {renderHeader()}
          <Text style={{ ...FONTS.h2 }}>Notifications</Text>
          {/* Add a button or icon for clearing notifications or navigating back */}
        </View>

        {/* Notification List */}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotificationItem}
        />
      </PageContainer>
    </SafeAreaView>
  );
};

export default Notification;
