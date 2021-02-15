import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [driverId, setDriverId] = useState(null);

  const login = useCallback((driverId, token, expirationDate) => {
    setToken(token);
    setDriverId(driverId);

    // set token expiration date
    const tokenExpDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpDate);

    // save token to localStorage
    localStorage.setItem(
      'driverData',
      JSON.stringify({ driverId, token, expiration: tokenExpDate.toISOString() })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setDriverId(null);

    // remove token from localStorage
    localStorage.removeItem('driverData');
  }, []);

  // get token from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('driverData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.driverId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  // auto logout
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { driverId, token, login, logout }
};