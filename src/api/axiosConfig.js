import axios from "axios";

const BASE_URL = "http://localhost:8080";

const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const login = (authRequest) => {
    return apiService.post('/api/v1/auth/authenticate', authRequest);
};

export const signUp = (authRequest) => {
    return apiService.post('api/v1/auth/register', authRequest);
}

export const getAllTemplates = (jwtToken) => {
    return apiService.get('api/v1/templates/', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
};