import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/register", { name, email, password });
      alert(`Successfully registered`);
    } catch (error) {
      alert(`Registered Fail`);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form action="" className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="YourName"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Email@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Bạn đã có tài khoảng?
            <Link to={"/login"} className="underline text-black">
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
