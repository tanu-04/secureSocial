import React, { useState } from "react";
import axios from "axios";
import Header from "../components/header";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleRegister = async () => {
    try {
      const result = await axios.post(
        // "https://chatbot-edag.onrender.com/register",
        "http://localhost:8080/api/auth/register",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("successful Registration!");

      console.log("response : " + result.data.message);
    } catch (err) {
      if (err.response) {
        console.log("errpr message : " + err.response.data.message);
        alert(err.response.data.message);
      } else {
        console.log("error : " + err);
      }
    }
  };

  return (
    <div className="bg-gptGray-900 flex flex-col items-center justify-between h-screen text-white">
      <Header />
      <div className="inputs flex flex-col items-center justify-center">
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
          onClick={handleRegister}
        >
          Register
        </button>
      </div>

      <div>
        {statusMessage && (
          <p className=" bg-gptGray-400 p-10 mt-5 rounded-3xl">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
