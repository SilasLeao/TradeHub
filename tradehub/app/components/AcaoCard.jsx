import "./acaoCard.css";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import CardInfo from "./cardInfo";
import { InfoContainerContext } from "../mainPage/page";
export default function AcaoCard({ acao }) {
  const nome = acao.symbol;
  const marketCap = acao.marketCap;
  const fullName = acao.fullName;
  const valor = acao.regularMarketPrice;
  const variacao = acao.regularMarketChangePercent;
  const corTextoClass = classNames({
    acaoVermelho: variacao < 0,
    acaoVerde: variacao >= 0,
  });

  const infoContainerContext = useContext(InfoContainerContext);

  function handleInfoButton() {
    sessionStorage.setItem("codigoAcaoPesquisada", nome);
    sessionStorage.setItem("nomeAcaoPesquisada", fullName);
    sessionStorage.setItem("marketCap", marketCap);
    infoContainerContext.toggleInfoContainerStatus();
  }

  return (
    <>
      <div className="acaoCard">
        <p className="acaoCardTitle">{nome}</p>
        <p className="acaoCardPrice">R$ {valor.toFixed(2).replace(".", ",")}</p>
        <hr className="acaoCardHr" />
        <p className={`acaoCardChange ${corTextoClass}`}>
          {variacao > 0
            ? `+${variacao.toFixed(2)}%`
            : `${variacao.toFixed(2)}%`}
        </p>
        <div className="acaoCardBtns">
          <FontAwesomeIcon
            className="acaoCardIcon"
            icon={faInfoCircle}
            onClick={handleInfoButton}
          />
          <button>Comprar</button>
          <FontAwesomeIcon className="acaoCardIcon" icon={faEmptyStar} />
        </div>
      </div>
    </>
  );
}
