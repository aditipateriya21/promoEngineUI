import axios from 'axios';
import { backendUrl } from '../utility/constants'; 

const apiClient = axios.create({
    baseURL: backendUrl,
});


export const analyzeOrder = (orderId) => {
    return apiClient.post(`/api/orderNew/analyze/${orderId}`);
};