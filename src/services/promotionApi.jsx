
import axios from 'axios';
import { backendUrl } from '../utility/constants';

const apiClient = axios.create({
    baseURL: backendUrl,
});

export const fetchPromotionRules = () => apiClient.get('/api/promo/rules');

// export const evaluatePromotions = async (orderId) => {
//     try {
//         const response = await apiClient.post(`/api/promo/apply`);
//         return response;
//     } catch (error) {
//         if (error.response && error.response.status === 404) {
//             throw new Error("Order ID cannot be found.");
//         }
//         throw new Error("An unexpected error occurred.");
//     }
// };

//new apis
export const createPromotionRule = (rule) =>
    apiClient.post('/api/promo/rule', rule);

export const fetchPromotionRuleById = (id) => {
    return apiClient.get(`/api/promo/rule/${id}`);
};

export const deletePromotionRule = (id) => {
    return apiClient.delete(`/api/promo/rule/${id}`);
};

export const updatePromotionRule = (id, updatedRule) => {
    return apiClient.put(`/api/promo/rule/${id}`, updatedRule);
};

export const evaluateOrder = (orderData) =>
    apiClient.post('/api/promo/apply', orderData);