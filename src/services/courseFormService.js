// src/services/courseFormService.js
import axios from 'axios';
import authService from './authService';

// const API_URL = 'http://localhost:8000/api/';

const API_URL = 'https://react-courseform-backend.onrender.com/api';




const courseFormService = {
  uploadCourseForm: async (userId, file) => {
    try {
      const formData = new FormData();
      formData.append('student', userId);
      formData.append('file', file);

      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.access) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(API_URL + 'courseform/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentUser.access}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to upload course form:", error);
      throw error;
    }
  },

  getCourseForms: async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.access) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get(API_URL + 'courseforms/', {
        headers: {
          Authorization: `Bearer ${currentUser.access}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch course forms:", error);
      throw error;
    }
  },

  stampCourseForm: async (courseFormId, stampFile) => {
    try {
      const formData = new FormData();
      formData.append('stamp', stampFile);

      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.access) {
        throw new Error('User not authenticated');
      }

      const response = await axios.patch(API_URL + `courseforms/${courseFormId}/stamp/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${currentUser.access}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to stamp course form:", error);
      throw error;
    }
  },

  // Add the getStampedForms method here
  getStampedForms: async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.access) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get(API_URL + 'stampedforms/', {
        headers: {
          Authorization: `Bearer ${currentUser.access}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch stamped course forms:", error);
      throw error;
    }
  },
};

export default courseFormService;


