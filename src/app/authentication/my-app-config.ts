export default {
    oidc: {
        clientId: '0oaeoewdnbVaDgDb55d7', // Okta client id
        issuer: 'https://dev-33784196.okta.com/oauth2/default', // Okta domain/oauth2/default
        redirectUri: 'http://localhost:4200/login/callback', //Updated to HTTPS
        scopes: ['openid', 'profile', 'email'],
    }
}


//openid: required for authentication requests
//profile: users first name, last name, phone number
//email: users email address