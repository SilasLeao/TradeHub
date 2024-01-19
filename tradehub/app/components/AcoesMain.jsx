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
import Comprar from "./Comprar";

export const ChartTimelineContext = createContext();

export default function AcoesMain() {
  const [codigoAcao, setCodigoAcao] = useState("");
  const [acaoCards, setAcaoCards] = useState([]);
  const [acaoDestaque, setAcaoDestaque] = useState([]);

  const infoContainerContext = useContext(InfoContainerContext);

  const fetchInvestmentData = async () => {
    try {
      const resposta = await fetch(
        `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
      );
      const resultado = await resposta.json();
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
  const fetchAcaoDestaqueNegativa = async () => {
    try {
      const acaoDestaqueListaNegativa = await fetch(
        "https://brapi.dev/api/quote/list?sortBy=change&sortOrder=asc&limit=4&token=8QE9zJXLMnT7w6wppfyXEs"
      );
      const lista = await acaoDestaqueListaNegativa.json();
      return lista.stocks.map((stock) => ({
        nome: stock.stock,
        cotacao: stock.close,
        variacao: stock.change,
      }));
    } catch (error) {
      console.error("Erro ao buscar ações, ", error);
    }
  };
  const fetchAcaoDestaquePositiva = async () => {
    try {
      const acaoDestaqueListaPositiva = await fetch(
        "https://brapi.dev/api/quote/list?sortBy=change&sortOrder=desc&limit=4&token=8QE9zJXLMnT7w6wppfyXEs"
      );
      const lista = await acaoDestaqueListaPositiva.json();
      return lista.stocks.map((stock) => ({
        nome: stock.stock,
        cotacao: stock.close,
        variacao: stock.change,
      }));
    } catch (error) {
      console.error("Erro ao buscar ações, ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [negativas, positivas] = await Promise.all([
          fetchAcaoDestaquePositiva(),
          fetchAcaoDestaqueNegativa(),
        ]);

        if (negativas && positivas) {
          const acoesIntercaladas = [];
          for (
            let i = 0;
            i < Math.max(negativas.length, positivas.length);
            i++
          ) {
            if (positivas[i]) {
              acoesIntercaladas.push(positivas[i]);
            }
            if (negativas[i]) {
              acoesIntercaladas.push(negativas[i]);
            }
          }

          setAcaoDestaque(acoesIntercaladas);
        } else if (negativas) {
          setAcaoDestaque([...negativas]);
        } else if (positivas) {
          setAcaoDestaque([...positivas]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados, ", error);
      }
    };

    fetchData();
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

  let renderedContent;
  switch (infoContainerContext.infoContainerStatus) {
    case "acoes":
      renderedContent = (
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
              infoContainerContext.infoContainerStatus === "acoes"
                ? "blurEffect"
                : ""
            } acoesMainContainerContent`}
          >
            <h1 className="acaoH1">Ações da Bolsa</h1>
            <div className="acaoDestaqueSection">
              <p className="acaoDestaqueTitle">Ações em Destaque</p>
              <div className="acoesDestaque">
                {acaoDestaque.map((acao, index) => (
                  <AcaoDestaqueCard key={index} acao={acao} />
                ))}
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
      );
      break;

    case "comprar":
      renderedContent = (
        <div className="acoesMainContainer">
          <div className="backgroundContainer">
            <Comprar />
          </div>
          <div
            className={`${
              infoContainerContext.infoContainerStatus === "comprar"
                ? "blurEffect"
                : ""
            } acoesMainContainerContent`}
          >
            <h1 className="acaoH1">Ações da Bolsa</h1>
            <div className="acaoDestaqueSection">
              <p className="acaoDestaqueTitle">Ações em Destaque</p>
              <div className="acoesDestaque">
                {acaoDestaque.map((acao, index) => (
                  <AcaoDestaqueCard key={index} acao={acao} />
                ))}
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
      );
      break;

    default:
      renderedContent = (
        <div className="acoesMainContainer">
          <h1 className="acaoH1">Ações da Bolsa</h1>
          <div className="acaoDestaqueSection">
            <p className="acaoDestaqueTitle">Ações em Destaque</p>
            <div className="acoesDestaque">
              {acaoDestaque.map((acao, index) => (
                <AcaoDestaqueCard key={index} acao={acao} />
              ))}
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
      );
  }
  return <>{renderedContent}</>;
}
