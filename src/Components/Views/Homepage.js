import React from "react";

import { useAuth } from "../../Auth/AuthModule";

export default function Homepage() {
  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();

  return (
    <div>
      Homepage
      {JSON.stringify(authUser)}
    </div>
  );
}
