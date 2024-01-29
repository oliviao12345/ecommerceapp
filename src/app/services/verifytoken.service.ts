// import { OktaAuth, JWTObject } from '@okta/okta-auth-js';

// // Create an instance of OktaAuth
// const oktaAuth = new OktaAuth({
//   issuer: 'https://your-okta-domain.com/oauth2/default',
//   clientId: 'your-client-id',
//   redirectUri: 'http://localhost:4200/implicit/callback', // Your redirect URI
// });

// // Verify the access token
// async function verifyAccessToken(accessToken: string): Promise<boolean> {
//   try {
//     // Decode the access token to get its claims
//     const claims = await oktaAuth.token.decode(accessToken);

//     // Get the expiration time from the claims
//     const expirationTime = claims.exp * 1000; // Convert expiration time to milliseconds

//     // Get the current time
//     const currentTime = Date.now();

//     // Check if the token is expired
//     if (expirationTime < currentTime) {
//       console.log('Access token has expired');
//       return false;
//     }

//     console.log('Access token is valid');
//     return true;
//   } catch (error) {
//     console.error('Error verifying access token:', error);
//     return false;
//   }
// }

// // Usage
// const accessToken = 'eyJraWQiOiJvMURqSll3aldMM0YwYXRJRGI3SF81U0hpQS0yaXJiMXdpT3pLaDd0eF9vIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnhBTERKZE9FZng1a0phdk5kaE5BTk5lbjV2eUhIMnYycWM0Tkh2SVFKVXciLCJpc3MiOiJodHRwczovL2Rldi0';

// verifyAccessToken(accessToken);
