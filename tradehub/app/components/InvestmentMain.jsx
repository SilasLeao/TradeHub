"use client";
import "./investmentMainStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import InvestmentCard from "./investmentCard";
import InvestmentCardInfo from "./InvestmentCardInfo";
import WatchlistInfo from "./WatchlistInfo";
import HistoryInfo from "./HistoryInfo";

export default function InvestmentMain() {
  const infoContainerContext = useContext(InfoContainerContext);

  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [searchFilter, setSearchFilter] = useState("");
  const [investmentData, setInvestmentData] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Investimentos")
          .select("*")
          .filter("usuario_id", "eq", "5GJV756PUC");
        const { data: watchlistData, error: watchlistError } = await supabase
          .from("Watchlist")
          .select("*")
          .filter("usuario_id", "eq", "5GJV756PUC");
        const { data: historyData, error: historyError } = await supabase
          .from("Historico")
          .select("*")
          .filter("usuario_id", "eq", "5GJV756PUC");
        console.log(historyData);
        setInvestmentData(data);
        setWatchlist(watchlistData);
        setHistory(historyData);

        const promises = watchlistData.map(async (investimento) => {
          const resposta = await fetch(
            `https://brapi.dev/api/quote/${investimento.simbolo}?token=8QE9zJXLMnT7w6wppfyXEs`
          );
          const resultado = await resposta.json();
          return {
            nome: resultado.results[0].symbol,
            cotacao: resultado.results[0].regularMarketPrice
              .toFixed(2)
              .replace(".", ","),
            variacao: resultado.results[0].regularMarketChangePercent
              .toFixed(2)
              .replace(".", ","),
          };
        });

        const watchlistInvestmentsData = await Promise.all(promises);
        setWatchlist(watchlistInvestmentsData);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = investmentData.filter((investment) => {
      return investment.simbolo
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    });
    setFilteredInvestments(filtered);
  };

  function handleChange(event) {
    setSearchFilter(event.target.value);
  }

  useEffect(() => {
    handleSearch();
  }, [investmentData, searchFilter]);

  const renderInvestments =
    searchFilter === "" ? investmentData : filteredInvestments;

  function toggleWatchlistContext() {
    infoContainerContext.toggleInfoContainerStatus("watchlist");
  }

  function toggleHistoryContext() {
    infoContainerContext.toggleInfoContainerStatus("history");
  }

  let renderedContent;
  switch (infoContainerContext.infoContainerStatus) {
    case "investment":
      renderedContent = (
        <div className="investmentMainContainer">
          <div className="backgroundContainer">
            <InvestmentCardInfo />
          </div>
          <div
            className={`${
              infoContainerContext.infoContainerStatus === "investment"
                ? "blurEffect"
                : ""
            } investmentMainContainerContent`}
          >
            <h1 className="investmentMainH1">Meus Investimentos</h1>
            <div className="tablesContainer">
              <div className="watchlist">
                <p className="tablesTitle">Watchlist</p>
                <table className="watchlistTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Cotação</th>
                      <th className="roundRightTableCorner">Rendimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.slice(0, 5).map((investimento, index) => (
                      <tr key={index}>
                        <th className="whiteTableText">
                          {investimento.nome && investimento.nome.length > 0
                            ? `${investimento.nome}`
                            : "Loading..."}
                        </th>
                        <td className="whiteTableText">
                          {investimento.cotacao &&
                          investimento.cotacao.length > 0
                            ? `R$ ${investimento.cotacao}`
                            : "Loading..."}
                        </td>
                        <td
                          className={
                            investimento.variacao &&
                            investimento.variacao.length > 0
                              ? investimento.variacao[0] === "-"
                                ? "redTableText"
                                : "greenTableText"
                              : ""
                          }
                        >
                          {investimento.variacao &&
                          investimento.variacao.length > 0
                            ? investimento.variacao[0] === "-"
                              ? `${investimento.variacao}%`
                              : `+${investimento.variacao}%`
                            : "Loading..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
              <div className="transacoes">
                <p className="tablesTitle">Últimas Transações</p>
                <table className="transacaoTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                      <th>Preço Uni.</th>
                      <th className="roundRightTableCorner">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="whiteTableText">HGRU11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">11</td>
                      <td className="whiteTableText">R$ 130.92</td>
                      <td className="redTableText">- R$ 1.440,12</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">IRDM11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">13</td>
                      <td className="whiteTableText">R$ 75.72</td>
                      <td className="greenTableText">+ R$ 984.36</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">AAPL34</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">23</td>
                      <td className="whiteTableText">R$ 46.67</td>
                      <td className="redTableText">- R$ 1.073,41</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">SPTW11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">17</td>
                      <td className="whiteTableText">R$ 41.66</td>
                      <td className="redTableText">- R$ 708.22</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">TRXF11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">31</td>
                      <td className="whiteTableText">R$ 107.97</td>
                      <td className="greenTableText">+ R$ 3.347,07</td>
                    </tr>
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="investmentSearchContainer">
              <div className="investmentSearchHeader">
                <div className="investmentSearchBar">
                  <button>
                    <FontAwesomeIcon
                      className="investmentSearchIcon"
                      icon={faMagnifyingGlass}
                    />
                  </button>
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleChange}
                  />
                </div>
                <span id="investmentMainWhiteText">Filtrar por:</span>
                <button className="investmentFilterButton">
                  Valor
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Dividendos
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Crescimento
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
              </div>
            </div>
            <div className="investmentCardContainer">
              {renderInvestments.map((investimento, index) => (
                <InvestmentCard key={index} investimento={investimento} />
              ))}
            </div>
          </div>
        </div>
      );
      break;

    case "watchlist":
      renderedContent = (
        <div className="investmentMainContainer">
          <div className="backgroundContainer">
            <WatchlistInfo />
          </div>
          <div
            className={`${
              infoContainerContext.infoContainerStatus === "watchlist"
                ? "blurEffect"
                : ""
            } investmentMainContainerContent`}
          >
            <h1 className="investmentMainH1">Meus Investimentos</h1>
            <div className="tablesContainer">
              <div className="watchlist">
                <p className="tablesTitle">Watchlist</p>
                <table className="watchlistTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Cotação</th>
                      <th className="roundRightTableCorner">Rendimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.slice(0, 5).map((investimento, index) => (
                      <tr key={index}>
                        <th className="whiteTableText">
                          {investimento.nome && investimento.nome.length > 0
                            ? `${investimento.nome}`
                            : "Loading..."}
                        </th>
                        <td className="whiteTableText">
                          {investimento.cotacao &&
                          investimento.cotacao.length > 0
                            ? `R$ ${investimento.cotacao}`
                            : "Loading..."}
                        </td>
                        <td
                          className={
                            investimento.variacao &&
                            investimento.variacao.length > 0
                              ? investimento.variacao[0] === "-"
                                ? "redTableText"
                                : "greenTableText"
                              : ""
                          }
                        >
                          {investimento.variacao &&
                          investimento.variacao.length > 0
                            ? investimento.variacao[0] === "-"
                              ? `${investimento.variacao}%`
                              : `+${investimento.variacao}%`
                            : "Loading..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
              <div className="transacoes">
                <p className="tablesTitle">Últimas Transações</p>
                <table className="transacaoTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                      <th>Preço Uni.</th>
                      <th className="roundRightTableCorner">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="whiteTableText">HGRU11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">11</td>
                      <td className="whiteTableText">R$ 130.92</td>
                      <td className="redTableText">- R$ 1.440,12</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">IRDM11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">13</td>
                      <td className="whiteTableText">R$ 75.72</td>
                      <td className="greenTableText">+ R$ 984.36</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">AAPL34</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">23</td>
                      <td className="whiteTableText">R$ 46.67</td>
                      <td className="redTableText">- R$ 1.073,41</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">SPTW11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">17</td>
                      <td className="whiteTableText">R$ 41.66</td>
                      <td className="redTableText">- R$ 708.22</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">TRXF11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">31</td>
                      <td className="whiteTableText">R$ 107.97</td>
                      <td className="greenTableText">+ R$ 3.347,07</td>
                    </tr>
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="investmentSearchContainer">
              <div className="investmentSearchHeader">
                <div className="investmentSearchBar">
                  <button>
                    <FontAwesomeIcon
                      className="investmentSearchIcon"
                      icon={faMagnifyingGlass}
                    />
                  </button>
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleChange}
                  />
                </div>
                <span id="investmentMainWhiteText">Filtrar por:</span>
                <button className="investmentFilterButton">
                  Valor
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Dividendos
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Crescimento
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
              </div>
            </div>
            <div className="investmentCardContainer">
              {renderInvestments.map((investimento, index) => (
                <InvestmentCard key={index} investimento={investimento} />
              ))}
            </div>
          </div>
        </div>
      );
      break;

    case "history":
      renderedContent = (
        <div className="investmentMainContainer">
          <div className="backgroundContainer">
            <HistoryInfo />
          </div>
          <div
            className={`${
              infoContainerContext.infoContainerStatus === "history"
                ? "blurEffect"
                : ""
            } investmentMainContainerContent`}
          >
            <h1 className="investmentMainH1">Meus Investimentos</h1>
            <div className="tablesContainer">
              <div className="watchlist">
                <p className="tablesTitle">Watchlist</p>
                <table className="watchlistTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Cotação</th>
                      <th className="roundRightTableCorner">Rendimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.slice(0, 5).map((investimento, index) => (
                      <tr key={index}>
                        <th className="whiteTableText">
                          {investimento.nome && investimento.nome.length > 0
                            ? `${investimento.nome}`
                            : "Loading..."}
                        </th>
                        <td className="whiteTableText">
                          {investimento.cotacao &&
                          investimento.cotacao.length > 0
                            ? `R$ ${investimento.cotacao}`
                            : "Loading..."}
                        </td>
                        <td
                          className={
                            investimento.variacao &&
                            investimento.variacao.length > 0
                              ? investimento.variacao[0] === "-"
                                ? "redTableText"
                                : "greenTableText"
                              : ""
                          }
                        >
                          {investimento.variacao &&
                          investimento.variacao.length > 0
                            ? investimento.variacao[0] === "-"
                              ? `${investimento.variacao}%`
                              : `+${investimento.variacao}%`
                            : "Loading..."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
              <div className="transacoes">
                <p className="tablesTitle">Últimas Transações</p>
                <table className="transacaoTable">
                  <thead>
                    <tr>
                      <th className="roundLeftTableCorner">Simbolo</th>
                      <th>Tipo</th>
                      <th>Quantidade</th>
                      <th>Preço Uni.</th>
                      <th className="roundRightTableCorner">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="whiteTableText">HGRU11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">11</td>
                      <td className="whiteTableText">R$ 130.92</td>
                      <td className="redTableText">- R$ 1.440,12</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">IRDM11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">13</td>
                      <td className="whiteTableText">R$ 75.72</td>
                      <td className="greenTableText">+ R$ 984.36</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">AAPL34</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">23</td>
                      <td className="whiteTableText">R$ 46.67</td>
                      <td className="redTableText">- R$ 1.073,41</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">SPTW11</th>
                      <td className="greenTableText">Compra</td>
                      <td className="whiteTableText">17</td>
                      <td className="whiteTableText">R$ 41.66</td>
                      <td className="redTableText">- R$ 708.22</td>
                    </tr>
                    <tr>
                      <th className="whiteTableText">TRXF11</th>
                      <td className="redTableText">Venda</td>
                      <td className="whiteTableText">31</td>
                      <td className="whiteTableText">R$ 107.97</td>
                      <td className="greenTableText">+ R$ 3.347,07</td>
                    </tr>
                  </tbody>
                </table>
                <div className="expandirContainer">
                  <div className="expandir">
                    <button>Expandir</button>
                    <FontAwesomeIcon
                      className="expandirIcon"
                      icon={faCaretDown}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="investmentSearchContainer">
              <div className="investmentSearchHeader">
                <div className="investmentSearchBar">
                  <button>
                    <FontAwesomeIcon
                      className="investmentSearchIcon"
                      icon={faMagnifyingGlass}
                    />
                  </button>
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleChange}
                  />
                </div>
                <span id="investmentMainWhiteText">Filtrar por:</span>
                <button className="investmentFilterButton">
                  Valor
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Dividendos
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
                <button className="investmentFilterButton">
                  Crescimento
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faCaretDown}
                  />
                </button>
              </div>
            </div>
            <div className="investmentCardContainer">
              {renderInvestments.map((investimento, index) => (
                <InvestmentCard key={index} investimento={investimento} />
              ))}
            </div>
          </div>
        </div>
      );
      break;

    default:
      renderedContent = (
        <div className="investmentMainContainer">
          <h1 className="investmentMainH1">Meus Investimentos</h1>
          <div className="tablesContainer">
            <div className="watchlist">
              <p className="tablesTitle">Watchlist</p>
              <table className="watchlistTable">
                <thead>
                  <tr>
                    <th className="roundLeftTableCorner">Simbolo</th>
                    <th>Cotação</th>
                    <th className="roundRightTableCorner">Rendimento</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.slice(0, 5).map((investimento, index) => (
                    <tr key={index}>
                      <th className="whiteTableText">
                        {investimento.nome && investimento.nome.length > 0
                          ? `${investimento.nome}`
                          : "Loading..."}
                      </th>
                      <td className="whiteTableText">
                        {investimento.cotacao && investimento.cotacao.length > 0
                          ? `R$ ${investimento.cotacao}`
                          : "Loading..."}
                      </td>
                      <td
                        className={
                          investimento.variacao &&
                          investimento.variacao.length > 0
                            ? investimento.variacao[0] === "-"
                              ? "redTableText"
                              : "greenTableText"
                            : ""
                        }
                      >
                        {investimento.variacao &&
                        investimento.variacao.length > 0
                          ? investimento.variacao[0] === "-"
                            ? `${investimento.variacao}%`
                            : `+${investimento.variacao}%`
                          : "Loading..."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="expandirContainer">
                <div className="expandir">
                  <button onClick={toggleWatchlistContext}>Expandir</button>
                  <FontAwesomeIcon
                    className="expandirIcon"
                    icon={faCaretDown}
                  />
                </div>
              </div>
            </div>
            <div className="transacoes">
              <p className="tablesTitle">Últimas Transações</p>
              <table className="transacaoTable">
                <thead>
                  <tr>
                    <th className="roundLeftTableCorner">Simbolo</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Preço Uni.</th>
                    <th className="roundRightTableCorner">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 5).map((transacao, index) => (
                    <tr key={index}>
                      <th className="whiteTableText">
                        {transacao.simbolo
                          ? `${transacao.simbolo}`
                          : "Loading..."}
                      </th>
                      <td className="">
                        {transacao.tipo ? `${transacao.tipo}` : "Loading..."}
                      </td>
                      <td className="whiteTableText">
                        {transacao.quantidade
                          ? `${transacao.quantidade}`
                          : "Loading..."}
                      </td>
                      <td className="">
                        {transacao.preco_unitario
                          ? `R$ ${transacao.preco_unitario}`
                          : "Loading..."}
                      </td>
                      <td className="">
                        {transacao.total
                          ? `R$ ${transacao.total}`
                          : "Loading..."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="expandirContainer">
                <div className="expandir">
                  <button onClick={toggleHistoryContext}>Expandir</button>
                  <FontAwesomeIcon
                    className="expandirIcon"
                    icon={faCaretDown}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="investmentSearchContainer">
            <div className="investmentSearchHeader">
              <div className="investmentSearchBar">
                <button>
                  <FontAwesomeIcon
                    className="investmentSearchIcon"
                    icon={faMagnifyingGlass}
                  />
                </button>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  onChange={handleChange}
                />
              </div>
              <span id="investmentMainWhiteText">Filtrar por:</span>
              <button className="investmentFilterButton">
                Valor
                <FontAwesomeIcon
                  className="investmentSearchIcon"
                  icon={faCaretDown}
                />
              </button>
              <button className="investmentFilterButton">
                Dividendos
                <FontAwesomeIcon
                  className="investmentSearchIcon"
                  icon={faCaretDown}
                />
              </button>
              <button className="investmentFilterButton">
                Crescimento
                <FontAwesomeIcon
                  className="investmentSearchIcon"
                  icon={faCaretDown}
                />
              </button>
            </div>
          </div>
          <div className="investmentCardContainer">
            {renderInvestments.map((investimento, index) => (
              <InvestmentCard key={index} investimento={investimento} />
            ))}
          </div>
        </div>
      );
      break;
  }

  return <>{renderedContent}</>;
}
