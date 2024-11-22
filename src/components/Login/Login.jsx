import React, { useEffect, useState } from "react";
import { UseAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("alireza@gmail.com");
  const [password, setPassword] = useState("1234");
  const { user, Login, isAuthenticated } = UseAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      Login(email, password);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            name="email"
            id="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            name="password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
