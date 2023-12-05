"use client";
import "./investmentMainStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AcaoCard from "./AcaoCard";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function InvestmentMain() {
  return (
    <>
      <div className="investmentMainContainer">
        <h1>Meus Investimentos</h1>
        <div className="tablesContainer">
          <div className="watchlist">
            <p className="tablesTitle">Watchlist</p>
            <table>
              <thead>
                <tr>
                  <th>Simbolo</th>
                  <th>Cotação</th>
                  <th>Rendimento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>HGRU11</th>
                  <td>R$ 130.92</td>
                  <td>0.71%</td>
                </tr>
                <tr>
                  <th>IRDM11</th>
                  <td>R$ 75.72</td>
                  <td>2.75%</td>
                </tr>
                <tr>
                  <th>AAPL34</th>
                  <td>R$ 46.67</td>
                  <td>0.39%</td>
                </tr>
                <tr>
                  <th>SPTW11</th>
                  <td>R$ 41.66</td>
                  <td>0.51%</td>
                </tr>
                <tr>
                  <th>PETR4</th>
                  <td>R$ 34.91</td>
                  <td>-2.13%</td>
                </tr>
                <tr>
                  <td className="expandir">
                    <span>Expandir</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="transacoes">
            <p className="tablesTitle">Últimas Transações</p>
            <table>
              <thead>
                <tr>
                  <th>Simbolo</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Preço Uni.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>HGRU11</th>
                  <td>Compra</td>
                  <td>11</td>
                  <td>R$ 130.92</td>
                  <td>- R$ 1.440,12</td>
                </tr>
                <tr>
                  <th>IRDM11</th>
                  <td>Venda</td>
                  <td>13</td>
                  <td>R$ 75.72</td>
                  <td>+ R$ 984.36</td>
                </tr>
                <tr>
                  <th>AAPL34</th>
                  <td>Compra</td>
                  <td>23</td>
                  <td>R$ 46.67</td>
                  <td>- R$ 1.073,41</td>
                </tr>
                <tr>
                  <th>SPTW11</th>
                  <td>Compra</td>
                  <td>17</td>
                  <td>R$ 41.66</td>
                  <td>- R$ 708.22</td>
                </tr>
                <tr>
                  <th>TRXF11</th>
                  <td>Venda</td>
                  <td>31</td>
                  <td>R$ 107.97</td>
                  <td>+ R$ 3.347,07</td>
                </tr>
                <tr>
                  <td className="expandir">
                    <span>Expandir</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
