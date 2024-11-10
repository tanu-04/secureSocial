import React from "react";
import { useNavigate } from "react-router-dom";

function RegisterButton() {
  const navigate = useNavigate();

  const registerRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <button
        className=" px-5 py-1 text-white rounded bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
        onClick={registerRedirect}
      >
        register
      </button>
    </div>
  );
}

export default RegisterButton;
