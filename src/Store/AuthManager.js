import React, { useState, useEffect, useCallback } from "react";
import JwtDecoder from "../Components/Utils/JwtDecoder";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    userRole: "",
    login: (token, expirationTime) => { },
    logout: () => { },
});
const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedDateTime = new Date(expirationTime * 1000);

    const adjustedTime = adjustedDateTime.getTime();

    const remainingDuration = adjustedTime - currentTime;
    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);
    if (remainingTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userId');
        return null;
    }

    return { token: storedToken, duration: remainingTime, userId: storedUserId };
};

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialUserId;
    let role;
    if (tokenData) {
        let json = JwtDecoder(tokenData.token)
        role = json.userRole
        initialToken = tokenData.token;
        initialUserId = tokenData.userId;
    }

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);
    const [userRole, setUserRole] = useState(role);

    const userIsLoggedIn = !!token;

    const getUserRole = (token) => {
        let json = JwtDecoder(token)
        let role = json.role
        setUserRole(role);
    };

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userId');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', userId);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }

    }, [tokenData, logoutHandler]);

    useEffect(() => {
        { userIsLoggedIn === true && getUserRole(token) }
    })

    const contextValue = {
        token: token,
        userId: userId,
        userRole: userRole,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;