import React, { createContext, useState } from "react";

export const AuthContext = createContext("");

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState();
  const [isLogged, setIslogged] = useState();

  const meta_data = {
    authUser,
    setAuthUser,
    isLogged,
    setIslogged,
  };

  return (
    <AuthContext.Provider value={meta_data}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
