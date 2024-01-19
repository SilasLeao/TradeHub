import "./comprar.css";
import { InfoContainerContext } from "../mainPage/page";
import { useState, useContext, useEffect } from "react";

export default function Comprar() {
  const infoContainerContext = useContext(InfoContainerContext);
  function handleExitButton() {
    infoContainerContext.toggleInfoContainerStatus("");
  }
  return (
    <>
      <div className="comprarContainer">
        <h1>pika de jegue</h1>
        <button onClick={handleExitButton}>MIZERA</button>
      </div>
    </>
  );
}
