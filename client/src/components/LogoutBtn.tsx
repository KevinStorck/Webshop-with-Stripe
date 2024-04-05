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
        console.log(reponse);
        if (reponse.status === 200) setUser()
      }}
    >
      Log Out
    </button>
  );
};
