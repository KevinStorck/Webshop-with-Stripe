import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const LogoutBtn = () => {
    const {setUser} = useContext(UserContext)
  return (
    <button
      onClick={async () => {
        const reponse = await axios.get(
          "http://localhost:3000/api/auth/logout", {withCredentials: true}
        );
        if (reponse.status === 200) setUser()
      }}
    >
      Log Out
    </button>
  );
};
