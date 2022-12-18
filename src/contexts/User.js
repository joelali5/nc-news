import { createContext, useState } from "react";

//create a context
export const userContext = createContext();

//create a component to provide a value to the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};