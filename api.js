// API Configuration for Just Decide App
// Based on API documentation: https://apijustdecide.navaacharan.com/docs

const API_BASE_URL = 'https://apijustdecide.navaacharan.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  
  // Preferences
  GET_QUESTIONS: '/preferences/questions',
  SUBMIT_PREFERENCES: '/preferences/submit',
  GET_USERS: '/users',
};

// API Helper Functions
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: { detail: 'Network error' },
      error,
    };
  }
};

// Authentication API calls
export const authAPI = {
  // Sign up a new user
  signup: async (userData) => {
    return apiCall(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        mobile: userData.mobile,
      }),
    });
  },

  // Sign in existing user
  signin: async (credentials) => {
    return apiCall(API_ENDPOINTS.SIGNIN, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  },
};

// Preferences API calls
export const preferencesAPI = {
  // Get questionnaire questions
  getQuestions: async () => {
    return apiCall(API_ENDPOINTS.GET_QUESTIONS, {
      method: 'GET',
    });
  },

  // Submit user preferences
  submitPreferences: async (answers, token) => {
    return apiCall(API_ENDPOINTS.SUBMIT_PREFERENCES, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });
  },
};

export const userAPI = {
  getAllUsers: async (token) => {
    return apiCall(API_ENDPOINTS.GET_USERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  authAPI,
  preferencesAPI,
  apiCall,
}; 