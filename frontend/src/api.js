import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './context.js';

function useApi() {
  const userContext = useContext(UserContext);

  class Api {
  
    constructor() {
      this.axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL || '/'}`,
        timeout: 30000,
        headers: {
          'token': this.token
        }
      });
      this.token = localStorage.getItem('token');
    }
  
    verifyUser(err) {
      if (err.response.status === 403) {
        this.logout();
        return {
          auth: false
        }
      }
      else {
        throw err;
      }
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('token_expiration');
      userContext.setUsername('');
    }
  
    async login(username, password) {
      try {
        const response = await this.axiosInstance.post("login", { username, password });
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token_expiration', response.data.expiration);
        userContext.setUsername(response.data.username);
      } catch(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('token_expiration');
        userContext.setUsername('');
        throw e;
      }
    }
  
    async getFish(id) {
      let response;
      if (id) {
        response = await this.axiosInstance.get(`api/fish?id=${id}`);
      }
      else {
        response = await this.axiosInstance.get("api/fish");
      }
      return response.data;
    }
  
    async saveFish(data) {
      try {
        const response = await this.axiosInstance.post("api/admin/fish", data);
        return response.data;
      }
      catch(e) {
        return this.verifyUser(e);
      }
    }
  
    async deleteFish(id) {
      try {
        const response = await this.axiosInstance.delete(`api/admin/fish?id=${id}`);
        return response.data;
      }
      catch(e) {
        return this.verifyUser(e);
      }
    }
  
  }

  return new Api();
}

export default useApi;
