import axios from "axios"
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const clientAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

clientAxios.interceptors.request.use(
  async (config) => {
    if (config.url === '/login' || config.url === '/signup') {
      return config;
    }

    const accessToken = Cookies.get('token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

clientAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      Cookies.remove('accessToken');

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userImage");
      localStorage.setItem("TempLoginMessage", "Seu login está sendo usado por outro dispositivo, faça o login novamente!");

      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);
