export const loginSuccess = (jwtToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: { jwtToken }
});
