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
          <p>{marketCap}</p>
        </div>
        <hr id="investmentSecondInfoHr" />
        <div className="investmentInfo">
          <span>
            <p>Total Investido</p>
            <p>{valorAplicado}</p>
          </span>
          <span>
            <p>Quantidade de Ações</p>
            <p>{quantidade}</p>
          </span>
          <span>
            <p>Valor Atual por Ação</p>
            <p>{valorAcao}</p>
          </span>
          <span>
            <p>Rendimento Total</p>
            <p>{rendimentoTotal}</p>
          </span>
          <span>
            <p>Rendimento Parcial</p>
            <p>{rendimentoParcial}</p>
          </span>
          <span>
            <p>Rendimento Parcial(%)</p>
            <p>{rendimentoPorcentagem}</p>
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
