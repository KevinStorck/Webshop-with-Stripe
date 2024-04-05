import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Home = () => {
  const {user} = useContext(UserContext)
  console.log(user);
  
  return <h1>Home</h1>;
};
