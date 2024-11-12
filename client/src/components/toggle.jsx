import React, { useState } from "react";

function ToggleButton() {
  const changeColor = () => {
    setBgColor("black");
  };

  return (
    <div style={{ backgroundColor: { bgColor } }} className="h-screen">
      <button onClick={changeColor} />
    </div>
  );
}

export default ToggleButton;
