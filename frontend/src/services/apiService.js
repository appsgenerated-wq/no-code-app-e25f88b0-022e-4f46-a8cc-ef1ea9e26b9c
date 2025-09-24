import config from '../constants';

const apiService = {
  authToken: null,

  setAuthToken(token) {
    this.authToken = token;
  },

  async request(endpoint, options = {}) {
    const url = `${config.API_BASE_URL}/${config.APP_ID}${endpoint}`;
    const headers = {
      ...options.headers,
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const responseData = await response.json();

      if (!response.ok) {
          const error = new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
          error.data = responseData;
          throw error;
      }

      if (response.status === 204) return null;
      return responseData;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  get(endpoint) {
    return this.request(endpoint);
  },

  post(endpoint, data) {
    const isFormData = data instanceof FormData;
    return this.request(endpoint, { 
        method: 'POST', 
        body: isFormData ? data : JSON.stringify(data)
    });
  },

  put(endpoint, data) {
    const isFormData = data instanceof FormData;
    return this.request(endpoint, { 
        method: 'PUT', 
        body: isFormData ? data : JSON.stringify(data)
    });
  },

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  },
};

export default apiService;
