import "./cardInfo.css";
import LineChart from "./LineChart";
import { InfoContainerContext } from "../mainPage/page";
import { useContext, useState } from "react";

export default function CardInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  const [dayChart, setDayChart] = useState(false);
  const [yearChart, setYearChart] = useState(false);

  const codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  const nomeAcao = sessionStorage.getItem("nomeAcaoPesquisada");
  let marketCap = sessionStorage.getItem("marketCap");
  marketCap = `R$ ${marketCap},00`;

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus();
  }

  return (
    <>
      <div className="infoContainer">
        <div className="infoTitle">
          <h1>{codigoAcao}</h1>
          <p>{nomeAcao}</p>
        </div>
        <hr />
        <div className="infoMarketCap">
          <p>Capitalização de mercado</p>
          <p>{marketCap}</p>
        </div>
        <div className="chart">
          <div className="chartBtns">
            <button>Day</button>
            <button>Year</button>
          </div>
          <LineChart /*parameter={chartTimeline}*/ />
        </div>
        <div className="infoBtns">
          <button onClick={handleExit}>Voltar</button>
          <button>Comprar</button>
        </div>
      </div>
    </>
  );
}
