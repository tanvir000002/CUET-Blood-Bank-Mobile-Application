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