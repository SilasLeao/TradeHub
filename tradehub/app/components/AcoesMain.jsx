"use client";

import "./acoesMain.css";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcaoCard from "./AcaoCard";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { InfoContainerContext } from "../mainPage/page";
import CardInfo from "./cardInfo";

export default function AcoesMain() {
  const [codigoAcao, setCodigoAcao] = useState("");
  const [acaoData, setAcaoData] = useState(null);
  const [acaoCards, setAcaoCards] = useState([]);

  const infoContainerContext = useContext(InfoContainerContext);

  const fetchInvestmentData = async () => {
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
    fetchInvestmentData();
  }

  return (
    <>
      {infoContainerContext.infoContainerStatus ? (
        <div className="acoesMainContainer">
          <div className="backgroundContainer">
            <CardInfo />
          </div>
          <h1 className="acaoH1">Ações da Bolsa</h1>
          <div className="acaoDestaque">
            <p className="acaoDestaqueTitle">Ações em Destaque</p>
            <div className="acoesDestaque">
              <div
                className="acaoCardDestaque"
                style={{
                  borderColor: " #5dec85",
                  backgroundColor: "rgba(93, 236, 133, 0.1)",
                }}
              >
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "#5dec85" }}
                >
                  CIEL3
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "#5dec85",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "#5dec85" }}
                >
                  R$ 4.34
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "#5dec85",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "#5dec85" }}
                >
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
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "honeydew" }}
                >
                  ITSA4
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "honeydew",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "honeydew" }}
                >
                  R$ 9.75
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "honeydew",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "honeydew" }}
                >
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
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  KLBN4
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "#F52A2A",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  R$ 4.25
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "#F52A2A",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  -5.97%
                </p>
              </div>
            </div>
          </div>
          <div className="acaoSearchContainer">
            <div className="acaoSearchHeader">
              <div className="acaoSearchBar">
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
              <span id="acoesMainWhiteText">Filtrar por:</span>
              <button className="acaoFilterButton">
                Valor
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
              <button className="acaoFilterButton">
                Dividendos
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
              <button className="acaoFilterButton">
                Crescimento
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
            </div>
          </div>
          <div className="acaoCardContainer">
            {acaoCards.map((acao, index) => (
              <AcaoCard key={index} acao={acao} />
            ))}
          </div>
        </div>
      ) : (
        <div className="acoesMainContainer">
          <h1 className="acaoH1">Ações da Bolsa</h1>
          <div className="acaoDestaque">
            <p className="acaoDestaqueTitle">Ações em Destaque</p>
            <div className="acoesDestaque">
              <div
                className="acaoCardDestaque"
                style={{
                  borderColor: " #5dec85",
                  backgroundColor: "rgba(93, 236, 133, 0.1)",
                }}
              >
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "#5dec85" }}
                >
                  CIEL3
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "#5dec85",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "#5dec85" }}
                >
                  R$ 4.34
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "#5dec85",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "#5dec85" }}
                >
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
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "honeydew" }}
                >
                  ITSA4
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "honeydew",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "honeydew" }}
                >
                  R$ 9.75
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "honeydew",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "honeydew" }}
                >
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
                <p
                  className="acaoCardTitleDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  KLBN4
                </p>
                <hr
                  className="acaoCardDestaqueFirstHr"
                  style={{
                    backgroundColor: "#F52A2A",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardPriceDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  R$ 4.25
                </p>
                <hr
                  className="acaoCardDestaqueSecondHr"
                  style={{
                    backgroundColor: "#F52A2A",
                    height: "1px",
                    border: "none",
                  }}
                />
                <p
                  className="acaoCardChangeDestaque"
                  style={{ color: "#F52A2A" }}
                >
                  -5.97%
                </p>
              </div>
            </div>
          </div>
          <div className="acaoSearchContainer">
            <div className="acaoSearchHeader">
              <div className="acaoSearchBar">
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
              <span id="acoesMainWhiteText">Filtrar por:</span>
              <button className="acaoFilterButton">
                Valor
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
              <button className="acaoFilterButton">
                Dividendos
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
              <button className="acaoFilterButton">
                Crescimento
                <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
              </button>
            </div>
          </div>
          <div className="acaoCardContainer">
            {acaoCards.map((acao, index) => (
              <AcaoCard key={index} acao={acao} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
