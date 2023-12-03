"use client";

import "./acoesMain.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcaoCard from "./AcaoCard";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

export default function AcoesMain() {
  const [codigoAcao, setCodigoAcao] = useState("");
  const [acaoData, setAcaoData] = useState(null);
  const [acaoCards, setAcaoCards] = useState([]);

  const fetchData = async () => {
    try {
      const resposta = await fetch(
        `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
      );
      const resultado = await resposta.json();
      setAcaoData(resultado);

      // setAcaoCards([
      //   resultado.results[0].symbol,
      //   resultado.results[0].regularMarketPrice,
      //   resultado.results[0].regularMarketChangePercent,
      // ]);

      setAcaoCards((prevCards) => [
        ...prevCards,
        {
          symbol: resultado.results[0].symbol,
          regularMarketPrice: resultado.results[0].regularMarketPrice,
          regularMarketChangePercent:
            resultado.results[0].regularMarketChangePercent,
        },
      ]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  function handleChange(event) {
    setCodigoAcao(event.target.value);
  }

  function handleSearch() {
    fetchData();
  }

  return (
    <>
      <div className="acoesMainContainer">
        <h1>Ações da Bolsa</h1>
        <div className="destaque">
          <p>Ações em Destaque</p>
          <div className="acoesDestaque"></div>
        </div>
        <div className="searchContainer">
          <div className="searchHeader">
            <div className="searchBar">
              <button onClick={handleSearch}>
                <FontAwesomeIcon
                  className="acoesIcon"
                  icon={faMagnifyingGlass}
                />
              </button>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Pesquisar"
              />
            </div>
            <span>Filtrar por:</span>
            <button className="filterButton">
              Valor
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button className="filterButton">
              Dividendos
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button className="filterButton">
              Crescimento
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
          </div>
        </div>
        <div className="cardContainer">
          {acaoCards.map((acao, index) => (
            <AcaoCard key={index} acao={acao} />
          ))}
        </div>
      </div>
    </>
  );
}
