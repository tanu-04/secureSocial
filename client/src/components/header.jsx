import React, { useState, useEffect } from "react";
import LoginButton from "../components/loginButton";
import RegisterButton from "../components/registerButton";
import LogoutButton from "./logoutButton";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("token")]);
  return (
    <header className="w-full bg-gptGray-900 sticky top-0 rounded-b-3xl flex flex-row justify-between px-4 py-6 items-center">
      <a href="/" className="text-white pl-10 font-bold text-xl">
        SecureSocial
      </a>

      <div className="m-3 flex flex-row">
        {isLoggedIn ? (
          <LogoutButton setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginButton />
        )}

        <RegisterButton />
      </div>
    </header>
  );
}

export default Header;

// i am making a mern project where i have a header jsx file that holds the login button that is by default set to login and i use a hook called isLoggedIn and whenever login is successful i set it to true, and i use that value of true / false to conditionally change the login button to the logout button. when it is clicked, i remove the jwt token frmo the local storage and set the value to false. but i am confused about how to send this variable as a parameter to the logout function so that it does what i need it to do when it fires the function on clicking. here are my codes answer concisely in one line and don't give me any codes.
