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
  const valorAplicado = investimento.valor_aplicado;
  const quantidade = investimento.quantidade;
  let rentabilidade = 0;
  const fetchInvestmentData = async () => {
    try {
      const resposta = await fetch(
        `https://brapi.dev/api/quote/${nome}?token=8QE9zJXLMnT7w6wppfyXEs`
      );
      const resultado = await resposta.json();
      rentabilidade = resultado.results[0].regularMarketPrice * quantidade;
      console.log(rentabilidade);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  fetchInvestmentData();

  // const corTextoClass = classNames({
  //   vermelho: variacao < 0,
  //   verde: variacao >= 0,
  // });

  return (
    <>
      <div className="investmentCard">
        <p className="investmentCardTitle">{nome}</p>
        <p className="investmentCardPrice">
          {/* R$ {Number(valor * quantidade).toFixed(2)} */}
        </p>
        <hr className="investmentCardHr" />
        <p className={`investmentCardChange`}>
          {" "}
          {/* corTextoClass*/}
          {/* {Number(variacao).toFixed(2)}% */}
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
