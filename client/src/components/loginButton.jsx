import React from "react";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const loginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <button
        className=" px-5 py-1 text-white rounded mr-2 bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
        onClick={loginRedirect}
      >
        login
      </button>
    </div>
  );
}

export default LoginButton;
