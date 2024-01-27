import { StyleSheet } from 'react-native';
import {
    Linking,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Modal,
    Image,
    FlatList,
} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS, images, icons } from '../constants'
import {
    AntDesign,
    MaterialIcons,
    Ionicons,
    EvilIcons,
    MaterialCommunityIcons,
    Entypo,
} from '@expo/vector-icons'
import { donors } from '../constants/data'
import MapView from 'react-native-maps'
import axios from 'axios';

const Search = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [filteredDonors, setFilteredDonors] = useState(donors)
    const [modalVisible, setModalVisible] = useState(false)

    const handleSearch = (location, bloodGroup) => {
        setSearch({ location, bloodGroup });
        let filteredData = donors;
       /* const filteredData = donors.filter((donor) =>
            donor.location.toLowerCase().includes(data.toLowerCase())
        )*/
       if (location) {
            filteredData = filteredData.filter((donor) =>
                donor.location.toLowerCase().includes(location.toLowerCase())
            );
        }
    
        if (bloodGroup) {
            filteredData = filteredData.filter((donor) =>
                donor.blood_group.toLowerCase().includes(bloodGroup.toLowerCase())
            );
        }
        setFilteredDonors(filteredData)
    }
   
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
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4 }}>Search</Text>
            </View>
        )
    }

    function renderSearchBar() {
        return (
            <View>
                {/* Location Bar */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.secondaryWhite,
                        height: 48,
                        marginVertical: 12,
                        paddingHorizontal: 22,
                        borderRadius: 4,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            width: SIZES.width - 144,
                            height: '100%',
                            marginHorizontal: 6,
                        }}
                        placeholder="Location"
                        value={search.location}
                        onChangeText={(location) => handleSearch(location, search.bloodGroup)}
                    />
                </View>
                
    
                {/* Blood Group Bar */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.secondaryWhite,
                        height: 48,
                        marginVertical: -8,
                        paddingHorizontal: 22,
                        marginBottom: 12,
                        borderRadius: 4,
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            width: SIZES.width - 144,
                            height: '100%',
                            marginHorizontal: 6,
                        }}
                        placeholder="Blood Group"
                        value={search.bloodGroup}
                        onChangeText={(bloodGroup) => handleSearch(search.location, bloodGroup)}
                    />
                </View>
            </View>
        );
    }
    
    const renderItem = ({ item, index }) => {
        // const handleLocationPress = () => {
        //     // Use Linking.openURL to open the default map application with the donor's location
        //     Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.location}`);
        //   };
        return (
            <TouchableOpacity
                onPress={() => setModalVisible(true,item)}
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 220,
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 0.5,
                    marginVertical: 3,
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginVertical: 15, 
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginVertical: 12, 
                            marginTop: 21, 
                        }}
                    >
                        <Entypo
                            name="user"
                            size={23}
                            color={COLORS.primary}
                        />
                        <Text
                        style={{
                            ...FONTS.body4,
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                            marginLeft: 14,
                            marginBottom: 8,
                        }}
                    >
                        {item.name}
                    </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                            justifyContent: 'center',
                        }}
                    >
                        <EvilIcons
                            name="location"
                            size={33}
                            color={COLORS.primary}
                        />
                        <TouchableOpacity style={styles0.button}
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.location}`);
                    }}
                    
                >
                    <Text style={styles0.text}>{item.location}</Text>
                    
                </TouchableOpacity>
                </View>

                <View >
                <TouchableOpacity
                    onPress={() => {
                        const url = `tel:${item.number}`;
                        Linking.openURL(url).catch((err) => console.error('Error opening phone app:', err));
                    }}
                    style={styles.callNowButton}
                >
                    <AntDesign name="phone" size={20} color={COLORS.white} />
                    <Text style={styles.callNowButtonText}>Call Now</Text>
                </TouchableOpacity>
                </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons
                            name="event-available"
                            size={24}
                            color={COLORS.primary}
                        />
                        <Text
                            style={{
                                ...FONTS.body4,
                                marginLeft: 2,
                            }}
                        >
                            <Text style={{ ...FONTS.body3 }}>Availability: </Text>
                             {item.available}
                        </Text>
                    </View>
                </View>



                <View
                    style={{
                        position: 'absolute',
                        right: 2,
                    }}
                >
                    <Image
                        source={icons.bloodVectorIcon}
                        resizeMode="contain"
                    />
                    <Text
                        style={{
                            ...FONTS.body3,
                            color: COLORS.white,
                            position: 'absolute',
                            top: 20,
                            left: 8,
                        }}
                    >
                        {item.blood_group}
                    </Text>
                </View>
                
            </TouchableOpacity>
        )
    }

    function renderDonorsList() {
        return (
            <View>
                <FlatList
                    data={filteredDonors}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                />
            </View>
        )
    }

    console.log("donors",donors)
    // change this for accurate view on the click
    function renderDonorsDetails(donors) {
        return (
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            bottom: 0,
                        }}
                    >
                        <View
                            style={{
                                height: SIZES.height * 0.7,
                                width: SIZES.width,
                                backgroundColor: '#F5F5FF',
                                borderTopLeftRadius: 30,
                                borderTopRightRdius: 30,
                                position: 'absolute',
                                bottom: 0,
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ marginTop: 30 }}>
                                <Text
                                    style={{
                                        ...FONTS.h3,
                                        marginTop: 24,
                                    }}
                                >
                                    {donors.name}
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
                                    {/* const handleLocationPress = () => {
    // Use Linking.openURL to open the default map application with the donor's location
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${donors.location}`);
  }; */}
                                    <TouchableOpacity onPress={Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${donors.location}`)}>
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            marginLeft: 8,
                                        }}
                                    >
                                        {donors.location}
                                    </Text>
                                     </TouchableOpacity>
                                </View>
                            </View>

       
                            <View
                                style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    width: '100%',
                                    paddingHorizontal: 22,
                                    marginVertical: 22,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="hand-heart-outline"
                                        size={48}
                                        color={COLORS.primary}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                                marginRight: 6,
                                            }}
                                        >
                                            6
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondaryBlack,
                                            }}
                                        >
                                            Times Donated
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <MaterialIcons
                                        name="approval"
                                        size={48}
                                        color={COLORS.primary}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.primary,
                                                marginRight: 6,
                                            }}
                                        >
                                            Blood Type
                                        </Text>
                                        <Text
                                            style={{
                                                ...FONTS.body3,
                                                color: COLORS.secondaryBlack,
                                            }}
                                        >
                                            {donors.blood_group}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    paddingHorizontal: 22,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => console.log('Pressed')}
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
                                    <Ionicons
                                        name="person-add-outline"
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
                                    onPress={() => console.log('Pressed')}
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
                                    <Entypo
                                        name="forward"
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
                                        Share
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* just an example to show the maps */}
                            <View
                                style={{
                                    marginHorizontal: 22,
                                    borderRadius: 60,
                                }}
                            >
                                <MapView
                                    style={{
                                        height: 200,
                                        width: SIZES.width - 44,
                                        marginVertical: 22,
                                    }}
                                    intialRegion={{
                                        latitude: 17.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.09222,
                                        longitudeDelta: 0.0421,
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{ marginHorizontal: 22, flex: 1, marginBottom: 200 }}
                >
                    {renderHeader()}
                    {renderSearchBar()}
                    {renderDonorsList()}
                    
                    
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}
const styles0 = StyleSheet.create({
    button: {
      padding: 7,
      backgroundColor: '#3498db',
      borderRadius: 5,
    },
    text: {
      color: '#fff',
      fontSize: 16,
    },
  });
  

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
      marginLeft: 28, // Adjust margin to align with icons
      fontSize: 25,
    },
    callNowButton: {
      backgroundColor: COLORS.primary,
      marginVertical: 20,
      marginBottom: 25,
      marginLeft: 25,
      width: 104,
      height: 35,
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
  });

export default Search
