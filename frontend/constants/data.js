import { images, icons } from '../constants'

import { axiosInstance } from '../config/axios'; // Replace 'your-axios-instance' with the actual import path



export let donors; // Declare donors outside the fetchData function

export const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/users');
        donors = response.data;
        console.log('fetching data:', donors);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call the fetchData function to initiate the data fetching
fetchData();

// Export donors for use in other modules
//export { donors };














// const fetchData = async () => {
//     try {
//         const response = await axiosInstance.get('/users');
//         const donors = response.data;

//         // Log the start of the loop
//         console.log('Entering loop');
//         console.log('users',donors);

//     //     // Use a loop to iterate through the fetched data
//     //     for (const user of usersFromApi) {
//     //         // Log information about each user
//     //         console.log('Processing user:', user);

//     //         // Modify the 'donors' array with the fetched data
//     //         const donors = {
//     //             id: user.id,
//     //             name: user.name,
//     //             location: user.location,
//     //             bloodType: user.blood_group, // Assuming 'blood_group' is equivalent to 'bloodType'
//     //         };

//     //         // Log the donor information
//     //         console.log('Donor:', donors);
//     //     }

//     //     // Log the end of the loop
//     //     console.log('Exiting loop');
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// // Call the fetchData function to initiate the data fetching
// fetchData();



export const donor = [
    {
        id: '1',
        name: 'Yasin Hossain',
        location: 'Mohammedpur',
        bloodType: 'A+',
    },
    {
        id: '2',
        name: 'Mohammed Sami',
        location: 'Mirpur 10, Dhaka',
        bloodType: 'AB+',
    },
    {
        id: '3',
        name: 'Rahimun Islam',
        location: 'Chittagong',
        bloodType: 'B-',
    },
    {
        id: '4',
        name: 'Rumana',
        location: 'Lakshmipur',
        bloodType: 'O+',
    },
    {
        id: '5',
        name: 'Jubayer Ahmed',
        location: 'Mohammedpur, Dhaka',
        bloodType: 'A+',
    },
    {
        id: '6',
        name: 'Edward Lio',
        location: 'Mohammedpur, Dhaka',
        bloodType: 'B+',
    },
]
//console.log('Exiting',donors);
console.log('Exiting',donor);

export const donationRequests = [
    {
        name: 'Amir Hamza',
        location: 'Apollo Hospital',
        postedDate: '5 min',
    },
    {
        name: 'Abrar',
        location: 'Parkview Hospital',
        postedDate: '3 min',
    },
    {
        name: 'Roshni',
        location: 'AB Hospital',
        postedDate: '5 min',
    },
    {
        name: 'Amaira',
        location: 'Ctg Hospital',
        postedDate: '4 min',
    },
    {
        name: 'Tanvir',
        location: 'XYZ Hospital',
        postedDate: '5 min',
    },
    {
        name: 'Amir',
        location: 'Apollo Hospital',
        postedDate: '5 min',
    },
]

export const features = [
    {
        id: '1',
        substance: 'Glucose',
        volume: '6 mmol/L',
    },
    {
        id: '2',
        substance: 'Cholesterol',
        volume: '6.2 mmol/L',
    },
    {
        id: '3',
        substance: 'Bilirubin',
        volume: '12 mmol/L',
    },
    {
        id: '4',
        substance: 'RBC',
        volume: '3.6 ml/L',
    },
    {
        id: '5',
        substance: 'MCV',
        volume: '102 fl',
    },
    {
        id: '6',
        substance: '276 bL',
        volume: 'Platelets',
    },
]
