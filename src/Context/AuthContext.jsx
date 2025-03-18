// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check for login state in local storage on initialization
//     const storedLoginState = localStorage.getItem("isLoggedIn");
//     if (storedLoginState === "true") {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = () => {
//     setIsLoggedIn(true);
//     localStorage.setItem("isLoggedIn", "true");
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem("isLoggedIn");
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to Access Auth Context
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState(null); // 'email', 'phone', or 'google'
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New authentication state

  useEffect(() => {
    // Check for login state in local storage on initialization
    const storedLoginState = localStorage.getItem("isLoggedIn");
    const storedLoginMethod = localStorage.getItem("loginMethod");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedLoginState === "true") {
      setIsLoggedIn(true);
      setIsAuthenticated(true); // Set user as authenticated
      setLoginMethod(storedLoginMethod || null);
      setUserInfo(storedUserInfo ? JSON.parse(storedUserInfo) : null);
    }
  }, []);

  const login = (userEmail) => {
    setIsLoggedIn(true);
    setIsAuthenticated(true); // Set user as authenticated
    setLoginMethod("email");
    setUserInfo({ email: userEmail });
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginMethod", "email");
    localStorage.setItem("userInfo", JSON.stringify({ email: userEmail }));
    
    return Promise.resolve();
  };

  const loginWithPhone = (phoneNumber) => {
    setIsLoggedIn(true);
    setIsAuthenticated(true); // Set user as authenticated
    setLoginMethod("phone");
    setUserInfo({ phone: phoneNumber });
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginMethod", "phone");
    localStorage.setItem("userInfo", JSON.stringify({ phone: phoneNumber }));
    
    return Promise.resolve();
  };

  const loginWithGoogle = () => {
    setIsLoggedIn(true);
    setIsAuthenticated(true); // Set user as authenticated
    setLoginMethod("google");
    setUserInfo({ provider: "google" });
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loginMethod", "google");
    localStorage.setItem("userInfo", JSON.stringify({ provider: "google" }));
    
    return Promise.resolve();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false); // Reset authentication
    setLoginMethod(null);
    setUserInfo(null);
    
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("applyjob");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        loginMethod,
        userInfo,
        login, 
        loginWithPhone,
        loginWithGoogle,
        logout,
        isAuthenticated // Provide globally
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access Auth Context
export const useAuth = () => useContext(AuthContext);

