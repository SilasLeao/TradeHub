import "./cardInfo.css";
import LineChart from "./LineChart";
import { InfoContainerContext } from "../mainPage/page";
import { useContext } from "react";

export default function CardInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  function handleTeste() {
    console.log(sessionStorage.getItem("acaoPesquisada"));
  }

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus();
  }

  return (
    <>
      <div className="infoContainer">
        <h1>Testando123</h1>
        <p>aaaa</p>
        <button onClick={handleTeste}>asdasd</button>
        <button onClick={handleExit}>Sair</button>
        <LineChart />
      </div>
    </>
  );
}
