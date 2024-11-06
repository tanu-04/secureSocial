import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const makeQuery = async () => {
    let result;
    try {
      result = await axios.get("http://localhost:8080/geminiQuery", {
        params: { items: text },
      });
      setResponse(result.data);
      console.log(JSON.stringify(result));
    } catch (err) {
      console.log("error while making query : " + result);
    }
  };
  return (
    <div className="flex flex-col items-center bg-gptGray-900 justify-around h-screen">
      {response && (
        <p className="border border-none p-5 mt-2 w-10/12 h-auto bg-gptGray-400 text-white rounded-lg mb-3 max-h-screen overflow-y-scroll">
          <ReactMarkdown>{response}</ReactMarkdown>
        </p>
      )}

      <div className="border border-none bg bg-gptGray-400 text-white flex flex-row justify-between rounded-3xl w-3/4 p-1 lg:mb-0 sm:mb-2">
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

      {/* <div className="border border-none bg bg-gptGray-400 text-white flex flex-row justify-between rounded-3xl w-3/4 p-1">
        <input
          placeholder="enter item"
          className="w-3/4 m-3 bg-inherit focus:outline-none flex flex-grow"
        ></input>
        <button className=" px-5 py-1 text-white rounded-3xl bg-gptGray-300">
          click button
        </button>
      </div> */}
    </div>
  );
}

export default App;
