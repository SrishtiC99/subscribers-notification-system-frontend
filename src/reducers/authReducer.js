const initialState = {
    isAuthenticated: false,
    jwtToken: null,
    loggedInUser: null,
    templates: []
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
        case 'LOGIN_FAILED':
            return state;
        default:
            return state;
    }
}

export default authReducer;