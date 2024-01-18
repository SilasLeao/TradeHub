import "./historyInfo.css";
import { useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";

export default function HistoryInfo() {
  const infoContainerContext = useContext(InfoContainerContext);

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }
  return (
    <>
      <div className="historyInfoContainer">
        <h1>alow</h1>
        <button onClick={handleExit}>Voltar</button>
      </div>
    </>
  );
}
