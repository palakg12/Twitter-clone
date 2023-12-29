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
  const [processingSignIn, setProcessingSignIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      setProcessingSignIn(true);
      const res = await api.post("/auth/login", { email, password });
      window.localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    } finally {
      setProcessingSignIn(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      setProcessingSignIn(true);
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    } finally {
      setProcessingSignIn(false);
    }
  };

  return (
    <form className="bg-custom-color text-white flex flex-col py-4 px-8 h-screen flex justify-center items-center">
      <form className="bg-white text-white flex flex-col py-4 px-12 rounded-lg w-8/12 md:w-6/12 mx-auto gap-8 py-1 px-10 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter">
        <h2 className="text-3xl font-bold text-center mt-2">Sign in to Twitter</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your email"
          className="mt-0 px-4 py-2 bg-custom-black border shadow-sm border-none placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-purple-800 block w-full rounded-lg sm:text-xl focus:ring-2"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="mt-1 px-4 py-2 bg-custom-black border shadow-sm border-none placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-purple-800 block w-full rounded-lg sm:text-xl focus:ring-2"
        />

        <button
          className={`text-xl py-2 rounded-lg px-4 bg-gradient-to-r from-purple-700 to-pink-700 text-white ${
            processingSignIn ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleLogin}
          disabled={processingSignIn}
        >
          {processingSignIn ? "Signing In..." : "Sign in"}
        </button>

        <p className="text-center text-l">Don't have an account?</p>

        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          className="mt-0 px-4 py-2 bg-custom-black border shadow-sm border-none placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-purple-800 block w-full rounded-lg sm:text-xl focus:ring-2"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          required
          className="mt-2 px-4 py-2 bg-custom-black border shadow-sm border-none placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-purple-800 block w-full rounded-lg sm:text-xl focus:ring-2"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="mt-2 px-4 py-2 bg-custom-black border shadow-sm border-none placeholder-slate-400 focus:outline-none focus:border-purple-800 focus:ring-purple-800 block w-full rounded-lg sm:text-xl focus:ring-2"
        />

        <button
          onClick={handleSignup}
          className={`text-xl py-2 rounded-lg px-4 bg-gradient-to-r from-purple-700 to-pink-700 text-white ${
            processingSignIn ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={processingSignIn}
        >
          {processingSignIn ? "Signing Up..." : "Sign up"}
        </button>
      </form>
    </form>
  );
};

export default Signin;



















