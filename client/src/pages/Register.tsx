import axios from "axios";
import { useState } from "react";

export const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  
  return (
    <>
      <input
        placeholder="email"
        value={registerInfo.email}
        type="text"
        onChange={(e) =>
          setRegisterInfo({
            username: registerInfo.username,
            email: e.target.value,
            password: registerInfo.password,
          })
        }
      />
      <input
        placeholder="username"
        value={registerInfo.username}
        type="text"
        onChange={(e) =>
          setRegisterInfo({
            email: registerInfo.email,
            username: e.target.value,
            password: registerInfo.password,
          })
        }
      />
      <input
        placeholder="password"
        value={registerInfo.password}
        type="password"
        onChange={(e) =>
          setRegisterInfo({
            email: registerInfo.email,
            username: registerInfo.username,
            password: e.target.value,
          })
        }
      />
      <button
        onClick={async () => {
          await axios.post(
            "http://localhost:3000/api/auth/register",
            registerInfo
          );
        }}
      >
        Log In
      </button>
    </>
  );
};
