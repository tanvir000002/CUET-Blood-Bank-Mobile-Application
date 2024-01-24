import React, { useEffect, useState } from 'react'
import { View, Text, Linking } from 'react-native';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign,Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { Image } from 'react-native';
import Button from '../components/Button';
import { axiosInstance } from '../config/axios'
import { PostUpdate } from '../screens';

const DonationCard = ({ name, location, postedDate, number, details, amount, blood_group, id, userId,navigation }) => {
  // localStorage.setItem("postId",id);

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

  const handleDelete = () => {
    axiosInstance
        .delete(`/posts/${id}`)
        .then(({ data }) => {
            navigation.navigate('Home')
        })
        .catch((error) => alert(error.message))
}
//console.log("users",profile.id)
const handleUpdate = () => {
      if(profile.id==userId){
        navigation.navigate('EditPost',{id})
      }
        else {
          console.error("You don't have permission to delete this post.");
        }
      console.log('userid',userId)
}
  return (
    <TouchableOpacity style={styles.cardContainer}>
      
      <View style={styles.iconContainer}>
        <AntDesign name="user" size={20} color={COLORS.primary} />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="enviroment" size={20} color={COLORS.primary} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <Text style={styles.postedDateText}>{postedDate}</Text>

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="blood-bag" size={20} color={COLORS.primary} />
        <Text style={styles.infoText}>Amount: {amount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Fontisto name="blood-drop" size={23} color={COLORS.primary} />
        <Text style={styles.infoText}> Blood Group: {blood_group}</Text>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="phone" size={20} color={COLORS.primary} />
        <Text style={styles.infoText}>Number: {number}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          const url = `tel:${number}`;
          Linking.openURL(url).catch((err) => console.error('Error opening phone app:', err));
        }}
        style={styles.callNowButton}
      >
        <AntDesign name="phone" size={24} color={COLORS.white} />
        <Text style={styles.callNowButtonText}>Call Now</Text>
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <AntDesign name="info" size={20} color={COLORS.primary} />
        <Text style={styles.infoText}>Details: {details}</Text>
      </View>

      {/* Container for edit and delete icons */}
      <View style={styles.editDeleteContainer}>
        <TouchableOpacity 
          onPress={handleUpdate}
          //onPress={() => navigation.navigate('EditPost',{id})}
          style={styles.editIcon}
        >
          <AntDesign name="edit" size={20} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleDelete}
          style={styles.deleteIcon}
        >
          <AntDesign name="delete" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.gray,
    borderRadius: 20,
    padding: 16,
    marginVertical: 12,
    elevation: 3,
    borderWidth: 4,
    borderColor: COLORS.lightGray,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameText: {
    marginLeft: 28,
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    marginLeft: 28,
    fontSize: 18,
  },
  postedDateText: {
    fontSize: 14,
    marginLeft: 28,
    color: COLORS.gray,
  },
  infoText: {
    marginLeft: 28, 
    fontSize: 14,
  },
  callNowButton: {
    backgroundColor: COLORS.primary,
    marginVertical: 16,
    width: 120,
    height: 30,
    borderRadius: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callNowButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    marginLeft: 12,
  },
  editDeleteContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginTop: 1, 
    paddingRight: 8, 
  },
  editIcon: {
    
    marginTop: 8, 
  },
  deleteIcon: {
    // Keep marginRight for deleteIcon
  },
});

export default DonationCard;
