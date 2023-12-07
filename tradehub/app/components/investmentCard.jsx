import "./investmentCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
export default function InvestmentCard({ investimento }) {
  const nome = investimento.simbolo;
  const valor = investimento.cotacao;
  const variacao = investimento.variacao;
  const quantidade = investimento.quantidade;
  const corTextoClass = classNames({
    vermelho: variacao < 0,
    verde: variacao >= 0,
  });

  return (
    <>
      <div className="investmentCard">
        <p className="investmentCardTitle">{nome}</p>
        <p className="investmentCardPrice">
          R$ {Number(valor * quantidade).toFixed(2)}
        </p>
        <hr className="investmentCardHr" />
        <p className={`investmentCardChange ${corTextoClass}`}>
          {Number(variacao).toFixed(2)}%
        </p>
        <div className="investmentCardBtns">
          <FontAwesomeIcon className="investmentCardIcon" icon={faInfoCircle} />
          <button>Vender</button>
          <p id="quantidade">{quantidade}</p>
        </div>
      </div>
    </>
  );
}
