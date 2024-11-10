import React from "react";
import Header from "../components/header";

export default function LandingPage() {
  return (
    <div className="bg-gptGray-900 text-white h-screen flex flex-col justify-start">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <p>Welcome, proceed to login !</p>
      </div>
    </div>
  );
}
