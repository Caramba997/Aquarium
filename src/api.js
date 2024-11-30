import axios from 'axios';

class Api {

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/`,
      timeout: 10000,
    });
  }

  async getFish(id) {
    let response;
    if (id) {
      response = await this.axiosInstance.get(`fish?id=${id}`);
    }
    else {
      response = await this.axiosInstance.get("fish");
    }
    return response.data;
  }

  async saveFish(data) {
    const response = await this.axiosInstance.post("fish", data);
    return response.data;
  }

  async deleteFish(id) {
    const response = await this.axiosInstance.delete(`fish?id=${id}`);
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
