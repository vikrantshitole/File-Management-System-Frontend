import axios from './axios';

const authService = {
  // Function to generate token
  async generateToken() {
    try {
      const response = await axios.post('/auth/token');
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      throw error;
    }
  },

  // Function to validate token
  async validateToken() {
    try {
      const token = this.getToken();
      if (!token) {
        return false;
      }
      await axios.get('/auth/validate');
      return true;
    } catch (error) {
      this.removeToken();
      return false;
    }
  },

  // Function to get stored token
  getToken() {
    return localStorage.getItem('authToken');
  },

  // Function to remove token
  removeToken() {
    localStorage.removeItem('authToken');
  },

  // Function to check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
