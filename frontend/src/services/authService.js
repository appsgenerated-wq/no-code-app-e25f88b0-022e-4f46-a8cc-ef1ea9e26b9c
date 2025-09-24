import apiService from './apiService';

const authService = {
  async login(email, password) {
    return apiService.post('/login', { email, password });
  },

  async register(name, email, password) {
    return apiService.post('/register', { name, email, password });
  },

  async getProfile() {
    return apiService.get('/profile');
  },
};

export default authService;
