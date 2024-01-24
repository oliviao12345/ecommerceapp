export default {

    oidc: {
        clientId: '0oaeoewdnbVaDgDb55d7', //okta client id
        issuer: 'https://dev-33784196.okta.com/oauth2/default', //okta domain/oauth2/default
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'] 
        
    }
}

//openid: required for authentication requests
//profile: users first name, last name, phone number
//email: users email address