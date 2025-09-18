import axios from 'axios';
import { mockSuggestCareer, mockGeneratePlan } from '../mocks/mockApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const USE_MOCKS = !API_BASE_URL || import.meta.env.VITE_USE_MOCKS === 'true';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // TODO: Add auth token when Firebase is connected
    // const token = await auth.currentUser?.getIdToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Get career suggestions based on questionnaire data
 * @param {Object} questionnaireData - The questionnaire responses
 * @returns {Promise<Object>} Career suggestions and analysis
 */
export const suggestCareer = async (questionnaireData) => {
  try {
    if (USE_MOCKS) {
      console.log('Using mock API for career suggestions');
      return await mockSuggestCareer(questionnaireData);
    }

    const payload = {
      userId: questionnaireData.userId || null,
      questionnaire: questionnaireData
    };

    const response = await api.post('/api/ai/suggest', payload);
    return response.data;
  } catch (error) {
    console.error('Error getting career suggestions:', error);
    
    // Fallback to mock if real API fails
    if (!USE_MOCKS) {
      console.log('Real API failed, falling back to mock data');
      return await mockSuggestCareer(questionnaireData);
    }
    
    throw new Error('Failed to get career suggestions. Please try again.');
  }
};

/**
 * Generate detailed plan for selected career path
 * @param {Object} planRequest - Plan generation request data
 * @returns {Promise<Object>} Detailed career plan with milestones
 */
export const generatePlan = async (planRequest) => {
  try {
    if (USE_MOCKS) {
      console.log('Using mock API for plan generation');
      return await mockGeneratePlan(planRequest);
    }

    const response = await api.post('/api/ai/plan', planRequest);
    return response.data;
  } catch (error) {
    console.error('Error generating plan:', error);
    
    // Fallback to mock if real API fails
    if (!USE_MOCKS) {
      console.log('Real API failed, falling back to mock data');
      return await mockGeneratePlan(planRequest);
    }
    
    throw new Error('Failed to generate plan. Please try again.');
  }
};

/**
 * Save plan to backend (currently uses localStorage + context)
 * @param {Object} plan - Plan data to save
 * @returns {Promise<Object>} Saved plan with ID
 */
export const savePlan = async (plan) => {
  try {
    // This is handled by PlanContext for now
    // TODO: Implement actual API call when backend is ready
    
    if (USE_MOCKS) {
      // Just return the plan with an ID for mocking
      return {
        ...plan,
        id: `plan_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
    }

    const response = await api.post('/api/plans', plan);
    return response.data;
  } catch (error) {
    console.error('Error saving plan:', error);
    throw new Error('Failed to save plan. Please try again.');
  }
};

/**
 * Get all plans for current user
 * @returns {Promise<Array>} Array of user's plans
 */
export const getUserPlans = async () => {
  try {
    if (USE_MOCKS) {
      // Plans are handled by PlanContext/localStorage
      return [];
    }

    const response = await api.get('/api/plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching user plans:', error);
    throw new Error('Failed to fetch plans. Please try again.');
  }
};

export default api;