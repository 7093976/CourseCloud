import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const clientId = '696683235688-kejvkrvs55ukqhra8576fl9k5gc4be7i.apps.googleusercontent.com'; // Replace with your actual client ID

const GoogleLoginComponent = () => {
    const onSuccess = (response) => {
        console.log('Login Successful:', response.profileObj);
        // Send the access token to your backend for authentication
    };

    const onFail = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFail}
            cookiePolicy="single_host_origin" // Optional: Improve security
        />
    );
};

export default GoogleLoginComponent;
