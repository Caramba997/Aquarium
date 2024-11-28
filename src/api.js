import axios from 'axios';

class Api {

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api/',
      timeout: 10000,
    });
  }

  async getFish() {
    const response = await this.axiosInstance.get("fish");
    return response.data;
  }

  async saveFish(data) {
    const response = await this.axiosInstance.post("fish", data);
    return response.data;
  }

  async getSpecies() {
    const response = await this.axiosInstance.get("species");
    return response.data;
  }

  async uploadImage(data) {
    const response = await this.axiosInstance.post("upload", data);
    return response.data;
  }

}

export default Api;
