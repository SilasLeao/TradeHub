import "./investmentCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";

export default function InvestmentCard({ investimento }) {
  const [rentabilidadeTotal, setRentabilidadeTotal] = useState();
  const [rentabilidadeParcial, setRentabilidadeParcial] = useState();
  const [valorAcao, setValorAcao] = useState();
  const [variacao, setVariacao] = useState();
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
        setValorAcao(resultado.results[0].regularMarketPrice);
        const total = resultado.results[0].regularMarketPrice * quantidade;
        setRentabilidadeTotal(total);
        setRentabilidadeParcial(total - valorAplicado);
        const porcentagem = (
          (rentabilidadeParcial / valorAplicado) *
          100
        ).toFixed(2);
        setVariacao(porcentagem);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchInvestmentData();
  }, [nome, quantidade, valorAplicado, rentabilidadeParcial]);

  let rentabilidadeTotalFormatted = rentabilidadeTotal
    ? rentabilidadeTotal.toFixed(2).replace(".", ",")
    : "Loading...";

  rentabilidadeTotalFormatted = rentabilidadeTotalFormatted
    ? rentabilidadeTotalFormatted.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "Loading...";

  const infoContainerContext = useContext(InfoContainerContext);

  function handleInfoButton() {
    sessionStorage.setItem("codigoAcaoPesquisada", nome);
    sessionStorage.setItem("nomeAcaoPesquisada", fullName);
    sessionStorage.setItem("marketCap", marketCap);
    sessionStorage.setItem("valorAcao", valorAcao);
    infoContainerContext.toggleInfoContainerStatus();
  }

  return (
    <>
      <div className="investmentCard">
        <p className="investmentCardTitle">{nome}</p>
        <p
          className={
            rentabilidadeTotal < valorAplicado
              ? "investmentCardPrice vermelho"
              : "investmentCardPrice verde"
          }
        >
          {rentabilidadeTotal !== undefined
            ? `R$ ${rentabilidadeTotalFormatted}`
            : "Loading..."}
        </p>
        <hr className="investmentCardHr" />
        <p
          className={
            rentabilidadeTotal < valorAplicado
              ? "investmentCardChange vermelho"
              : "investmentCardChange verde"
          }
        >
          {rentabilidadeTotal !== undefined
            ? rentabilidadeTotal < valorAplicado
              ? `${variacao}%`
              : `${variacao}%`
            : "Loading..."}
        </p>
        <div className="investmentCardBtns">
          <FontAwesomeIcon
            className="investmentCardIcon"
            icon={faInfoCircle}
            onClick={handleInfoButton}
          />
          <button>Vender</button>
          <p id="quantidade">{quantidade}</p>
        </div>
      </div>
    </>
  );
}
