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

export const getAllSubscribers = (jwtToken) => {
    return apiService.get('api/v1/subscribers/', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const getBillingAccount = (jwtToken) => {
    return apiService.get('api/v2/billing/', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const renewSubscription = (jwtToken) => {
    return apiService.post('api/v2/billing/renew', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const upgadeToOwner = (jwtToken) => {
    return apiService.patch('api/v2/billing/upgrade/owner', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}