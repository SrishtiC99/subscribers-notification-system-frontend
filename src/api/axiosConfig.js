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

export const createTemplate = (jwtToken, templateRequest) => {
    return apiService.post('api/v1/templates/', templateRequest, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const getAllSubscribers = (jwtToken) => {
    return apiService.get('api/v1/subscribers/', {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const addSubscriberList = (jwtToken, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.post('api/v1/subscribers/file', formData, {
        headers: {
            'Content-Type': 'multi-part/form-data',
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const getSubscriberById = (jwtToken, id) => {
    return apiService.get(`api/v1/subscribers/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const getSubscribersByTemplateId = (jwtToken, id) => {
    return apiService.get(`api/v1/subscribers/template/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const addTemplateSubscribers = (jwtToken, id, subscriberListRequest) => {
    return apiService.post(`api/v1/templates/${id}/subscribers`, subscriberListRequest, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}

export const deleteTemplateSubscribers = (jwtToken, id, subscriberListRequest) => {
    return apiService.delete(`api/v1/templates/${id}/subscribers`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        data: {
            subscriberIds: subscriberListRequest.subscriberIds
        }
    });
}

export const deleteSubscriber = (jwtToken, id) => {
    return apiService.delete(`api/v1/subscribers/${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
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

export const notifySubscribers = (jwtToken, templateId) => {
    console.log(jwtToken);
    return apiService.post(`api/v1/notifications/${templateId}`, null, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });
}