import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/rest/v1`,
  headers: {
    apikey: API_KEY,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default axiosInstance;
