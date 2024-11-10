import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

const ChatBot = ({ token }) => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const navigate = useNavigate();
  //   const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyToken = async () => {
      console.log("token in verifytoken : " + token);
      try {
        const result = await axios.get(
          "https://chatbot-edag.onrender.com/chatbot",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsValidToken(true);
        console.log(
          "response on verifying token is : " +
            JSON.stringify(result.data.user.username)
        );
        alert("welcome, " + result.data.user.username);
      } catch (err) {
        setIsValidToken(false);
        alert("token verification failed, please log in again");
        navigate("/login");
      }
    };

    if (token) {
      verifyToken();
    } else {
      alert("token not found, please log in first!");
      navigate("/login");
    }
  }, [navigate, token]);

  const makeQuery = async () => {
    let result;
    try {
      result = await axios.get(
        "https://chatbot-edag.onrender.com/geminiQuery",
        {
          params: { items: text },
        }
      );
      setResponse(result.data);
      console.log(JSON.stringify(result));
    } catch (err) {
      console.log("error while making query : " + result);
    }
  };

  if (!isValidToken) {
    return null;
  }

  return (
    <div className="flex flex-col items-center bg-gptGray-900 justify-between min-h-screen">
      <Header />

      {response && (
        <p className="border border-none p-5 mt-2 w-10/12 h-auto bg-gptGray-400 text-white rounded-lg mb-3 max-h-screen overflow-y-scroll">
          <ReactMarkdown>{response}</ReactMarkdown>
        </p>
      )}

      <div className="border border-none bg bg-gptGray-400 text-white flex flex-row justify-between rounded-3xl w-3/4 p-1 lg:mb-3 sm:mb-2">
        <input
          className="w-3/4 m-3 bg-inherit focus:outline-none flex flex-grow"
          placeholder="enter prompt"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && makeQuery()}
        ></input>
        <button
          onClick={makeQuery}
          className=" px-5 py-1 text-white rounded-3xl bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
        >
          generate
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
