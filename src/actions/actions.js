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

export const fetchBillingAccount = (isAccountExpired, role, lastBillingDate) => ({
    type: 'GET_BILLING_ACCOUNT',
    payload: { isAccountExpired, role, lastBillingDate }
});

export const upgradeAccount = (role, lastBillingDate) => ({
    type: 'UPGRADE_ROLE',
    payload: { role, lastBillingDate }
});

export const subscription = (lastBillingDate) => ({
    type: 'RENEW_SUBSCRIPTION',
    payload: { lastBillingDate }
});
