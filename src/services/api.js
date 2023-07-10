import axios from "axios";

const API = axios.create({
    baseURL : "https://localhost:44389"
});

export default API;