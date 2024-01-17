"use client";
import "./watchlistInfo.css";
import { useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";
export default function WatchlistInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }
  return (
    <>
      <div className="watchlistInfoContainer">
        <button onClick={handleExit}>Voltar</button>
      </div>
    </>
  );
}
