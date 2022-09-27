import axios from "axios";

const AxiosClient = axios.create({
    baseURL: process.env.VUE_APP_API,
});

export default AxiosClient;
