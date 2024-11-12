import React from "react";

const logoutUser = (setIsLoggedIn) => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  alert("log out success");
  window.location.href = "/login";
};

function LogoutButton({ setIsLoggedIn }) {
  return (
    <button
      className=" px-5 py-1 text-white rounded mr-2 bg-gptGray-300 hover:bg-white hover:text-gptGray-900 transition duration-300"
      onClick={() => logoutUser(setIsLoggedIn)}
    >
      logout
    </button>
  );
}

export default LogoutButton;
