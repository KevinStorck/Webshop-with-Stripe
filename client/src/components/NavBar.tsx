import { NavLink } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { authorizeUser } from "../services/authServices";

export const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) return;
    const authorize = async () => {
      const isLoggedIn = await authorizeUser();

      if (isLoggedIn) {
        setUser(isLoggedIn);
      } else {
        setUser();
      }
    };
    authorize();
  });

  return (
    <div className="NavBar">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Home</h1>
      </NavLink>
      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Products</h1>
      </NavLink>
      <NavLink
        to={"/checkout"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Checkout</h1>
      </NavLink>
      {!user ? (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          <h1>Login</h1>
        </NavLink>
      ) : (
        <LogoutBtn />
      )}
      <NavLink
        to={"/register"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Register</h1>
      </NavLink>
      {user && (
        <NavLink
          to={"/orders"}
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          <h1>{user.username}</h1>
        </NavLink>
      )}
    </div>
  );
};
