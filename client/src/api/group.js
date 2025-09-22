import axios from "axios";

const API_URL = "http://localhost:8080/group";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    let token = null;
    
    if (!token) {
        token = localStorage.getItem("token");
    }

    if (!token) {
        throw new Error("Cannot Find Token, Please Login");
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const groupApi = {
  createGroup: (groupName, username) => {
    return api.post("/create", { groupName, username });
  },

  joinGroup: (groupName) => {
    return api.post("/join", { groupName });
  },
};


