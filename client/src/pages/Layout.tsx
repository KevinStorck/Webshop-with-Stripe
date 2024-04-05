import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { User } from "../models/User";
import { useState } from "react";
import { IUserContext, UserContext } from "../context/UserContext";

export const Layout = () => {
  const [user, setUser] = useState<IUserContext>({
    user: null,
    setUser: () => {},
  });
  user.setUser = (newUser: User | null = null) => {
    setUser({ ...user, user: newUser });
  };

  return (
    <>
    <UserContext.Provider value={user}>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      </UserContext.Provider>
    </>
  );
};
