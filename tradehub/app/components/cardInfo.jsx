import "./cardInfo.css";
import LineChart from "./LineChart";
import { InfoContainerContext } from "../mainPage/page";
import { useContext, useState } from "react";
import { ChartTimelineContext } from "./AcoesMain";

export default function CardInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  const chartTimelineContext = useContext(ChartTimelineContext);

  const codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  const nomeAcao = sessionStorage.getItem("nomeAcaoPesquisada");
  let marketCap = sessionStorage.getItem("marketCap");
  marketCap = `R$ ${marketCap},00`;

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus();
  }

  function handleChartTimelineButtons() {
    chartTimelineContext.toggleChartTimeline();
  }

  console.log(chartTimelineContext.chartTimeline);

  return (
    <>
      <div className="infoContainer">
        <div className="infoTitle">
          <h1>{codigoAcao}</h1>
          <p>{nomeAcao}</p>
        </div>
        <hr id="firstInfoHr" />
        <div className="infoMarketCap">
          <p>Capitalização de mercado</p>
          <p>{marketCap}</p>
        </div>
        <hr id="secondInfoHr" />
        <div className="chart">
          <div className="chartBtns">
            <button
              className={`dayButton ${
                chartTimelineContext.chartTimeline === true
                  ? "selectedTimeButton"
                  : ""
              }`}
              onClick={handleChartTimelineButtons}
            >
              Day
            </button>
            <button
              className={`yearButton ${
                chartTimelineContext.chartTimeline === false
                  ? "selectedTimeButton"
                  : ""
              }`}
              onClick={handleChartTimelineButtons}
            >
              Year
            </button>
          </div>
          <LineChart /*parameter={chartTimeline}*/ />
        </div>
        <div className="infoBtns">
          <button className="exitButton" onClick={handleExit}>
            Voltar
          </button>
          <button className="buyButton">Comprar</button>
        </div>
      </div>
    </>
  );
}
