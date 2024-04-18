"use client";

import InfoContainerContext from "../context/InfoContainerContext";
import "./investmentCardInfo.css";
import { useContext } from "react";

export default function InvestmentCardInfo() {
  const infoContainerContext = useContext(InfoContainerContext);

  let codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  let nomeAcao = sessionStorage.getItem("nomeAcaoPesquisada");
  let marketCap = "Não Informado.";
  let valorAplicado = sessionStorage.getItem("valorAplicado");
  let quantidade = sessionStorage.getItem("quantidade");
  let valorAcao = sessionStorage.getItem("valorAcao");
  let rendimentoTotal = sessionStorage.getItem("rendimentoTotal");
  let rendimentoParcial = sessionStorage.getItem("rendimentoParcial");
  let rendimentoPorcentagem = sessionStorage.getItem("rendimentoPorcentagem");
  let custoMedio = valorAplicado / quantidade;

  function handleSellButton() {
    infoContainerContext.toggleInfoContainerStatus("vender");
  }

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }

  let valorAplicadoFormatted = parseFloat(valorAplicado)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let valorAcaoFormatted = parseFloat(valorAcao).toFixed(2).replace(".", ",");
  let rendimentoParcialFormatted = parseFloat(rendimentoParcial)
    .toFixed(2)
    .replace("-", "")
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let rendimentoTotalFormatted = parseFloat(rendimentoTotal)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let rendimentoPorcentagemFormatted = parseFloat(rendimentoPorcentagem)
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let custoMedioFormatted = parseFloat(custoMedio)
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
          <p>{marketCap}</p>
        </div>
        <hr id="investmentSecondInfoHr" />
        <div className="investmentInfo">
          <span>
            <p>Total Investido</p>
            <p>R$ {valorAplicadoFormatted}</p>
          </span>
          <span>
            <p>Quantidade de Ações</p>
            <p>{quantidade}</p>
          </span>
          <span>
            <p>Custo Médio</p>
            <p>R$ {custoMedioFormatted}</p>
          </span>
          <span>
            <p>Preço Atual</p>
            <p>R$ {valorAcaoFormatted}</p>
          </span>
          <span>
            <p>Rendimento Total</p>
            <p
              className={
                Number(rendimentoTotal) >= Number(valorAplicado)
                  ? "investmentVerde"
                  : "investmentVermelho"
              }
            >
              R$ {rendimentoTotalFormatted}
            </p>
          </span>
          <span>
            <p>Rendimento Parcial</p>
            <p
              className={
                Number(rendimentoTotal) >= Number(valorAplicado)
                  ? "investmentVerde"
                  : "investmentVermelho"
              }
            >
              {Number(rendimentoTotal) >= Number(valorAplicado)
                ? `+R$ ${rendimentoParcialFormatted}`
                : `-R$ ${rendimentoParcialFormatted}`}
            </p>
          </span>
          <span>
            <p>Rendimento Parcial(%)</p>
            <p
              className={
                Number(rendimentoTotal) >= Number(valorAplicado)
                  ? "investmentVerde"
                  : "investmentVermelho"
              }
            >
              {Number(rendimentoTotal) >= Number(valorAplicado)
                ? `+${rendimentoPorcentagemFormatted}%`
                : `${rendimentoPorcentagemFormatted}%`}
            </p>
          </span>
        </div>
        <div className="investmentInfoBtns">
          <button className="investmentExitButton" onClick={handleExit}>
            Voltar
          </button>
          <button onClick={handleSellButton} className="sellButton">
            Vender
          </button>
        </div>
      </div>
    </>
  );
}
