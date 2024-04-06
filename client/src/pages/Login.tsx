import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Login = () => {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    nameOrEmail: "",
    password: ""
  });
  
  return (
    <>
      <input
        placeholder="Username or Email"
        value={loginInfo.nameOrEmail}
        type="text"
        onChange={(e) =>
          setLoginInfo({
            nameOrEmail: e.target.value,
            password: loginInfo.password
          })
        }
      />
      <input
        placeholder="password"
        value={loginInfo.password}
        type="password"
        onChange={(e) =>
          setLoginInfo({
            nameOrEmail: loginInfo.nameOrEmail,
            password: e.target.value,
          })
        }
      />
      <button
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:3000/api/auth/login", loginInfo, {withCredentials:true});
          if (response.status === 200) {
            setUser(response.data)
            navigate("/")
          }
        }}
      >
        Log In
      </button>
    </>
  );
};
