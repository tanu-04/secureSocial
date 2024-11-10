import React, { useState, useEffect } from "react";
import LoginButton from "../components/loginButton";
import RegisterButton from "../components/registerButton";
import LogoutButton from "./logoutButton";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <header className="w-full bg-gptGray-900 sticky top-0 rounded-b-3xl flex flex-row justify-between px-4 py-6 items-center">
      <a href="/" className="text-white pl-10 font-bold text-xl">
        SecureSocial
      </a>

      <div className="m-3 flex flex-row">
        {isLoggedIn ? <LogoutButton /> : <LoginButton />}

        <RegisterButton />
      </div>
    </header>
  );
}

export default Header;
