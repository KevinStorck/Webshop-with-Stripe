import { createContext } from "react";
import { User } from "../models/User";

export interface IUserContext {
  user: User | null,
  setUser: (user?: User) => void;
}

export const UserContext = createContext<IUserContext>({
  user: {
    email: "",
    username: ""
  },
  setUser: () => {},
});
