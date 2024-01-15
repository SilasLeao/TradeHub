"use client";

import { InfoContainerContext } from "../mainPage/page";
import "./investmentCardInfo.css";
import { useContext } from "react";

export default function InvestmentCardInfo() {
  const infoContainerContext = useContext(InfoContainerContext);

  let codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  let nomeAcao = sessionStorage.getItem("nomeAcaoPesquisada");
  let marketCap = sessionStorage.getItem("marketCap");
  let valorAplicado = sessionStorage.getItem("valorAplicado");
  let quantidade = sessionStorage.getItem("quantidade");
  let valorAcao = sessionStorage.getItem("valorAcao");
  let rendimentoTotal = sessionStorage.getItem("rendimentoTotal");
  let rendimentoParcial = sessionStorage.getItem("rendimentoParcial");
  let rendimentoPorcentagem = sessionStorage.getItem("rendimentoPorcentagem");
  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus();
  }
  marketCapFormatted = parseFloat(marketCapFormatted)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  valorAplicadoFormatted = parseFloat(valorAplicadoFormatted)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  valorAcaoFormatted = parseFloat(valorAcaoFormatted).toFixed(2).replace(".", ",");
  rendimentoParcialFormatted = parseFloat(rendimentoParcialFormatted)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    rendimentoTotalFormatted = parseFloat(rendimentoTotalFormatted)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  rendimentoPorcentagemFormatted = parseFloat(rendimentoPorcentagemFormatted)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <>
      <div className="investmentInfoContainer">
        <div className="investmentInfoTitle">
          <h1>{codigoAcao}</h1>
          <p>{nomeAcao}</p>
        </div>
        <hr id="investmentFirstInfoHr" />
        <div className="investmentInfoMarketCap">
          <p>Capitalização de Mercado</p>
          <p>{marketCapFormatted}</p>
        </div>
        <hr id="investmentSecondInfoHr" />
        <div className="investmentInfo">
          <span>
            <p>Total Investido</p>
            <p>{valorAplicadoFormatted}</p>
          </span>
          <span>
            <p>Quantidade de Ações</p>
            <p>{quantidade}</p>
          </span>
          <span>
            <p>Valor Atual por Ação</p>
            <p>{valorAcaoFormatted}</p>
          </span>
          <span>
            <p>Rendimento Total</p>
            <p className={}>{rendimentoTotalFormatted}</p>
          </span>
          <span>
            <p>Rendimento Parcial</p>
            <p>{rendimentoParcialFormatted}</p>
          </span>
          <span>
            <p>Rendimento Parcial(%)</p>
            <p>{rendimentoPorcentagemFormatted}</p>
          </span>
        </div>
        <div className="investmentInfoBtns">
          <button className="investmentExitButton" onClick={handleExit}>
            Voltar
          </button>
          <button className="sellButton">Vender</button>
        </div>
      </div>
    </>
  );
}
