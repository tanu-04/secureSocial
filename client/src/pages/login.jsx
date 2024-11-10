import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("userame : " + username);
    console.log("entered password : " + password);
    try {
      const res = await axios.post(
        "https://chatbot-edag.onrender.com/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setStatusMessage(res.data.message);
      alert(res.data.message);

      //   setToken(res.data.token);

      localStorage.setItem("token", res.data.token);
      //   navigate("/chatbot");

      console.log("res.message : " + JSON.stringify(res));
    } catch (err) {
      if (err.response) {
        setStatusMessage(err.response.data.message);
        alert(statusMessage);
        console.log("error message : ", err.response.data.message);
      } else {
        console.log("error : " + err);
      }
    }
  };

  return (
    <div className="bg-gptGray-900 flex flex-col items-center justify-start min-h-screen text-white">
      <Header />
      <div className="inputs flex flex-1 flex-col items-center justify-center">
        <input
          placeholder="username"
          className=" bg-gptGray-400 p-5 rounded-3xl mb-3"
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <input
          placeholder="password"
          type="password"
          className=" bg-gptGray-400 p-5 rounded-3xl"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className=" bg-gptGray-400 px-5 py-3 hover:bg-white hover:text-gptGray-900 transition delay-100 rounded-3xl mt-5"
          onClick={handleLogin}
        >
          login
        </button>
      </div>

      {/* <div>
        {statusMessage && (
          <p className=" bg-gptGray-400 p-10 mt-5 rounded-3xl">
            {statusMessage}
          </p>
        )}
      </div> */}
    </div>
  );
};

export default Login;
