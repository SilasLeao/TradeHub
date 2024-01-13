"use client";
import "./investmentMainStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import InvestmentCard from "./investmentCard";

export default function InvestmentMain() {
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [investmentData, setInvestmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Investimentos")
          .select("*");
        setInvestmentData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
                <tr>
                  <th className="whiteTableText">HGRU11</th>
                  <td className="whiteTableText">R$ 130.92</td>
                  <td className="greenTableText">0.71%</td>
                </tr>
                <tr>
                  <th className="whiteTableText">IRDM11</th>
                  <td className="whiteTableText">R$ 75.72</td>
                  <td className="greenTableText">2.75%</td>
                </tr>
                <tr>
                  <th className="whiteTableText">AAPL34</th>
                  <td className="whiteTableText">R$ 46.67</td>
                  <td className="greenTableText">0.39%</td>
                </tr>
                <tr>
                  <th className="whiteTableText">SPTW11</th>
                  <td className="whiteTableText">R$ 41.66</td>
                  <td className="greenTableText">0.51%</td>
                </tr>
                <tr>
                  <th className="whiteTableText">PETR4</th>
                  <td className="whiteTableText">R$ 34.91</td>
                  <td className="redTableText">-2.13%</td>
                </tr>
              </tbody>
            </table>
            <div className="expandirContainer">
              <div className="expandir">
                <span>Expandir</span>
                <FontAwesomeIcon className="expandirIcon" icon={faCaretDown} />
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
                <span>Expandir</span>
                <FontAwesomeIcon className="expandirIcon" icon={faCaretDown} />
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
              <input type="text" placeholder="Pesquisar" />
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
          {investmentData.map((investimento, index) => (
            <InvestmentCard key={index} investimento={investimento} />
          ))}
        </div>
      </div>
    </>
  );
}
