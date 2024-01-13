"use client";

import "./acoesMain.css";
import { useContext, createContext } from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcaoCard from "./AcaoCard";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { InfoContainerContext } from "../mainPage/page";
import CardInfo from "./cardInfo";
import AcaoDestaqueCard from "./AcaoDestaqueCard";

export const ChartTimelineContext = createContext();

export default function AcoesMain() {
  const [codigoAcao, setCodigoAcao] = useState("");
  const [acaoCards, setAcaoCards] = useState([]);

  const infoContainerContext = useContext(InfoContainerContext);

  const fetchInvestmentData = async () => {
    try {
      const resposta = await fetch(
        `https://brapi.dev/api/quote/${codigoAcao}?range=5y&token=8QE9zJXLMnT7w6wppfyXEs`
      );
      const resultado = await resposta.json();
      console.log(resultado);
      if (resultado.results[0].marketCap) {
        setAcaoCards((prevCards) => [
          ...prevCards,
          {
            marketCap: resultado.results[0].marketCap
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
            symbol: resultado.results[0].symbol,
            fullName: resultado.results[0].longName,
            regularMarketPrice: resultado.results[0].regularMarketPrice,
            regularMarketChangePercent:
              resultado.results[0].regularMarketChangePercent,
          },
        ]);
      } else {
        setAcaoCards((prevCards) => [
          ...prevCards,
          {
            marketCap: "Não informado.",
            symbol: resultado.results[0].symbol,
            fullName: "Não informado.",
            regularMarketPrice: resultado.results[0].regularMarketPrice,
            regularMarketChangePercent:
              resultado.results[0].regularMarketChangePercent,
          },
        ]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    const fetchAcaoDestaqueData = async () => {
      try {
        const acaoDestaqueLista = await fetch(
          "https://brapi.dev/api/quote/list?sortBy=change&sortOrder=asc&limit=4&token=8QE9zJXLMnT7w6wppfyXEs"
        );
        const lista = await acaoDestaqueLista.json();
        console.log(lista);
      } catch (error) {
        console.error("Erro ao buscar ações, ", error);
      }
    };
    fetchAcaoDestaqueData();
  }, []);

  let [chartTimeline, setChartTimeline] = useState(true);

  const toggleChartTimeline = () => {
    setChartTimeline(!chartTimeline);
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
            <ChartTimelineContext.Provider
              value={{ chartTimeline, toggleChartTimeline }}
            >
              <CardInfo />
            </ChartTimelineContext.Provider>
          </div>
          <div
            className={`${
              infoContainerContext.infoContainerStatus ? "blurEffect" : ""
            } acoesMainContainerContent`}
          >
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
