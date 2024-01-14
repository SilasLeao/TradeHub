import "./investmentCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
export default function InvestmentCard({ investimento }) {
  const [rentabilidade, setRentabilidade] = useState();
  const nome = investimento.simbolo;
  const valorAplicado = investimento.valor_aplicado;
  const quantidade = investimento.quantidade;

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const resposta = await fetch(
          `https://brapi.dev/api/quote/${nome}?token=8QE9zJXLMnT7w6wppfyXEs`
        );
        const resultado = await resposta.json();
        setRentabilidade(resultado.results[0].regularMarketPrice * quantidade);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchInvestmentData();
  }, []);
  return (
    <>
      <div className="investmentCard">
        <p className="investmentCardTitle">{nome}</p>
        <p
          className={
            rentabilidade < valorAplicado
              ? "investmentCardPrice vermelho"
              : "investmentCardPrice verde"
          }
        >
          {rentabilidade !== undefined
            ? `R$ ${rentabilidade.toFixed(2)}`
            : "Loading..."}
        </p>
        <hr className="investmentCardHr" />
        <p
          className={
            rentabilidade < valorAplicado
              ? "investmentCardChange vermelho"
              : "investmentCardChange verde"
          }
        >
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
