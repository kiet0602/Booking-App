import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert(`Successfully logged in`);
      setRedirect(true);
    } catch (error) {
      alert(`Login faild`);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          action=""
          className="max-w-md mx-auto"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            placeholder="YourEmail@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Bạn chưa có tài khoảng?
            <Link to={"/register"} className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
