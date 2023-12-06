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
          <p className="destaqueTitle">Ações em Destaque</p>
          <div className="acoesDestaque">
            <div
              className="acaoCardDestaque"
              style={{
                borderColor: " #5dec85",
                backgroundColor: "rgba(93, 236, 133, 0.1)",
              }}
            >
              <p className="cardTitleDestaque" style={{ color: "#5dec85" }}>
                CIEL3
              </p>
              <hr
                className="cardDestaqueFirstHr"
                style={{
                  backgroundColor: "#5dec85",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardPriceDestaque" style={{ color: "#5dec85" }}>
                R$ 4.34
              </p>
              <hr
                className="cardDestaqueSecondHr"
                style={{
                  backgroundColor: "#5dec85",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardChangeDestaque" style={{ color: "#5dec85" }}>
                7.96%
              </p>
            </div>

            <div
              className="acaoCardDestaque"
              style={{
                borderColor: "honeydew",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <p className="cardTitleDestaque" style={{ color: "honeydew" }}>
                ITSA4
              </p>
              <hr
                className="cardDestaqueFirstHr"
                style={{
                  backgroundColor: "honeydew",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardPriceDestaque" style={{ color: "honeydew" }}>
                R$ 9.75
              </p>
              <hr
                className="cardDestaqueSecondHr"
                style={{
                  backgroundColor: "honeydew",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardChangeDestaque" style={{ color: "honeydew" }}>
                0.21%
              </p>
            </div>

            <div
              className="acaoCardDestaque"
              style={{
                borderColor: "#F52A2A",
                backgroundColor: "rgba(245, 42, 42, 0.1)",
              }}
            >
              <p className="cardTitleDestaque" style={{ color: "#F52A2A" }}>
                KLBN4
              </p>
              <hr
                className="cardDestaqueFirstHr"
                style={{
                  backgroundColor: "#F52A2A",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardPriceDestaque" style={{ color: "#F52A2A" }}>
                R$ 4.25
              </p>
              <hr
                className="cardDestaqueSecondHr"
                style={{
                  backgroundColor: "#F52A2A",
                  height: "1px",
                  border: "none",
                }}
              />
              <p className="cardChangeDestaque" style={{ color: "#F52A2A" }}>
                -5.97%
              </p>
            </div>
          </div>
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
