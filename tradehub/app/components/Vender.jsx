import "./vender.css";
import { useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";

export default function Vender() {
  const infoContainerContext = useContext(InfoContainerContext);
  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }
  return (
    <>
      <div className="venderContainer">
        <h1>mizeraaaaa</h1>
        <button onClick={handleExit}>AAAAAA</button>
      </div>
    </>
  );
}
