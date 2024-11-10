import React from "react";

const logoutUser = () => {
  localStorage.removeItem("token");
  alert("log out success");
  window.location.href = "/login";
};

function LogoutButton() {
  return (
    <button
      className=" px-5 py-1 text-white rounded mr-2 bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
      onClick={logoutUser}
    >
      logout
    </button>
  );
}

export default LogoutButton;
