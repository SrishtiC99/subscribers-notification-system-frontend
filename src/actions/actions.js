export const loginSuccess = (jwtToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: { jwtToken }
});

export const fetchTemplates = (templates) => ({
    type: 'FETCH_TEMPLATES',
    payload: {templates}
})

export const fetchAllSubscribers = (subscribers) => ({
    type: 'FETCH_ALL_SUBSCRIBERS',
    payload: { subscribers }
});
