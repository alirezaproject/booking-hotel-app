import { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Alireza",
  email: "alireza@gmail.com",
  password: "1234",
};
export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function Login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function Logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  return useContext(AuthContext);
}
