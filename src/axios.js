import axios from 'axios'
import router from './router' // Ensure you import your router

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include Authorization header if token is available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle responses and errors globally
axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export default axiosClient
