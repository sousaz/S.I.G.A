import axios from "../services/api";

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    error => Promise.reject(error)
)

export default axios