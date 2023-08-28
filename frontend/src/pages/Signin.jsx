import React, { useState } from "react";
import api from "../redux/api";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await api.post("/auth/login", {email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      window.localStorage.setItem("token" ,res.token)
      // window.localStorage.setItem(key, value);
      console.log(res.data.token)
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  // localStorage.setItem("res.data");

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign in to Twitter</h2>

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter your email"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />

      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        onClick={handleLogin}
      >
        Sign in
      </button>

      <p className="text-center text-xl">Don't have an account?</p>

      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Enter your name"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="email"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />

      <button
        onClick={handleSignup}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signin;