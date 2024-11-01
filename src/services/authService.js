// src/services/authService.js
import axios from "axios";

// const API_URL = 'http://localhost:8000/api/';

const API_URL = "https://react-courseform-backend.onrender.com/api/";

const authService = {
  register: async (username, password, department, isHod) => {
    try {
      const response = await axios.post(API_URL + "register/", {
        username,
        password,
        department,
        is_hod: isHod,
      });

      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(
          "Registration successful, but no access token received."
        );
      }
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.error ||
            "An unknown error occurred during registration."
        );
      } else {
        throw new Error(
          "Unable to reach the server. Please check your connection."
        );
      }
    }
  },

  login: async (username, password) => {
    const response = await axios.post(API_URL + "login/", {
      username,
      password,
    });

    if (response.data.access) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Retrieved User:", user); // Log the user object
      return user;
    } catch (e) {
      console.error("Error retrieving user:", e);
      return null;
    }
  },

  updateProfile: async (username, department, isHod) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser.access) {
      throw new Error("User not authenticated");
    }

    const response = await axios.put(
      API_URL + "profile/update/",
      { username, department, is_hod: isHod },
      { headers: { Authorization: `Bearer ${currentUser.access}` } }
    );

    const updatedUser = { ...currentUser, user: response.data };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return response.data;
  },

  getStudents: async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.access) {
      throw new Error("User not authenticated");
    }

    const response = await axios.get(API_URL + "students/", {
      headers: { Authorization: `Bearer ${currentUser.access}` },
    });
    return response.data;
  },

  getHods: async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.access) {
      throw new Error("User not authenticated");
    }

    const response = await axios.get(API_URL + "hods/", {
      headers: { Authorization: `Bearer ${currentUser.access}` },
    });
    return response.data;
  },
};

export default authService;
