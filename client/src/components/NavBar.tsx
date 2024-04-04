import { NavLink } from "react-router-dom";

export const NavBar = () => {
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
      <NavLink
        to={"/login"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Login</h1>
      </NavLink>
      <NavLink
        to={"/register"}
        className={({ isActive }) =>
          isActive ? "nav-link-active" : "nav-link"
        }
      >
        <h1>Register</h1>
      </NavLink>
    </div>
  );
};
