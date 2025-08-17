import axios from "axios";

const API_BASE_URL = "http://localhost:5295/api/shorturl"; // 🔥 adjust if port different

// Get all short URLs
export const getLinks = async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data;
};

// Get details of a specific short URL
export const getUrlDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/details/${id}`);
  return response.data;
};

// Get analytics summary (total clicks, active links, etc.)
export const getSummary = async () => {
  const response = await axios.get(`${API_BASE_URL}/summary`);
  return response.data;
};

// Get clicks data for chart (time series)
export const getClicksOverTime = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/clicks/${id}`);
  return response.data;
};

// Create a short URL
export const createShortUrl = async (originalUrl: string) => {
  const response = await axios.post(`${API_BASE_URL}/shorten`, {
    originalUrl,
  });
  return response.data;
};
