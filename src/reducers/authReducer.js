const initialState = {
    isAuthenticated: false,
    jwtToken: null,
    loggedInUser: null,
    templates: [],
    subscribers: [],
    isAccountExpired: false,
    role: 'USER',
    lastBillingDate: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const { jwtToken } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                jwtToken
            }
        case 'FETCH_TEMPLATES':
            const { templates } = action.payload;
            return {
                ...state,
                templates
            }
        case 'FETCH_ALL_SUBSCRIBERS':
            const { subscribers } = action.payload;
            return {
                ...state,
                subscribers
            }
        case 'GET_BILLING_ACCOUNT':
            return {
                ...state,
                isAccountExpired: action.payload.isAccountExpired,
                role: action.payload.role,
                lastBillingDate: action.payload.lastBillingDate
            }
        case 'UPGRADE_ROLE': 
            return {
                ...state,
                role: 'OWNER',
                lastBillingDate: action.payload.lastBillingDate
            }
        case 'RENEW_SUBSCRIPTION': 
            return {
                ...state,
                isAccountExpired: false,
                lastBillingDate: action.payload.lastBillingDate
            }
        default:
            return state;
    }
}

export default authReducer;