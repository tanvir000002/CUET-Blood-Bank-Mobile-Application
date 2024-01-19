import axios from 'axios'
import {baseURL} from './baseUrl'
export const axiosInstance =axios.create({
	baseURL,
})
export const setAuthToken =(token=undefined) =>{

	axiosInstance.defaults.headers.common['Authorization']=token
	? 'Bearer ${token}'
	: undefined
}
