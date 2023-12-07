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
    acaoVermelho: variacao < 0,
    acaoVerde: variacao >= 0,
  });

  return (
    <>
      <div className="acaoCard">
        <p className="acaoCardTitle">{nome}</p>
        <p className="acaoCardPrice">R$ {valor}</p>
        <hr className="acaoCardHr" />
        <p className={`acaoCardChange ${corTextoClass}`}>
          {Number(variacao).toFixed(2)}%
        </p>
        <div className="acaoCardBtns">
          <FontAwesomeIcon className="acaoCardIcon" icon={faInfoCircle} />
          <button>Comprar</button>
          <FontAwesomeIcon className="acaoCardIcon" icon={faEmptyStar} />
        </div>
      </div>
    </>
  );
}
