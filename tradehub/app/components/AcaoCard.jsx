import "./acaoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
export default function AcaoCard({ acao }) {
  const nome = acao.symbol;
  const valor = acao.regularMarketPrice;
  const variacao = acao.regularMarketChangePercent;
  const corTextoClass = classNames({
    vermelho: variacao < 0,
    verde: variacao >= 0,
  });

  return (
    <>
      <div className="acaoCard">
        <p className="cardTitle">{nome}</p>
        <p className="cardPrice">R$ {valor}</p>
        <hr className="cardHr" />
        <p className={`cardChange ${corTextoClass}`}>
          {Number(variacao).toFixed(2)}%
        </p>
        <div className="cardBtns">
          <FontAwesomeIcon className="cardIcon" icon={faInfoCircle} />
          <button>Comprar</button>
          <FontAwesomeIcon className="cardIcon" icon={faEmptyStar} />
        </div>
      </div>
    </>
  );
}
