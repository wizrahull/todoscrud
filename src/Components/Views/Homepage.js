import React from "react";

import { useAuth } from "../../Auth/AuthModule";
import ProfileCard from "./Crud/ProfileCard";

export default function Homepage() {
  const { authUser, setAuthUser, isLogged, setIslogged } = useAuth();

  return (
    <div>
      <ProfileCard />
    </div>
  );
}
