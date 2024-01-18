import "./historyInfo.css";
import { useContext, useEffect, useState } from "react";
import { InfoContainerContext } from "../mainPage/page";
import { createClient } from "@supabase/supabase-js";

export default function HistoryInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const [history, setHistory] = useState([]);

  const formatCurrency = (value) => {
    value = value
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${value}`;
  };

  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Historico")
          .select("*")
          .filter("usuario_id", "eq", "5GJV756PUC");
        // const sortedHistory = data.reverse();
        // setHistory(sortedHistory);
        const sortedHistory = data.sort(
          (a, b) => new Date(a.data) - new Date(b.data)
        );
        setHistory(sortedHistory.reverse());
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="historyInfoContainer">
        <h1 className="historyTitle">Histórico de Transação</h1>
        <div className="historyInvestmentsContainer">
          <table className="historyTable">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {history.map((transacao, index) => (
                <tr key={index}>
                  <th className="whiteTableText">
                    {transacao.simbolo ? `${transacao.simbolo}` : "Loading..."}
                  </th>
                  <td
                    className={
                      transacao.tipo
                        ? transacao.tipo === "Compra"
                          ? "greenTableText"
                          : "redTableText"
                        : "Loading..."
                    }
                  >
                    {transacao.tipo ? `${transacao.tipo}` : "Loading..."}
                  </td>
                  <td className="whiteTableText">
                    {transacao.quantidade
                      ? `${transacao.quantidade}`
                      : "Loading..."}
                  </td>
                  <td className="whiteTableText">
                    {transacao.preco_unitario
                      ? formatCurrency(transacao.preco_unitario)
                      : "Loading..."}
                  </td>
                  <td
                    className={
                      transacao.tipo === "Compra"
                        ? "redTableText"
                        : "greenTableText"
                    }
                  >
                    {transacao.total
                      ? transacao.tipo === "Compra"
                        ? `-${formatCurrency(transacao.total)}`
                        : formatCurrency(transacao.total)
                      : "Loading..."}
                  </td>
                  <td className="whiteTableText">
                    {transacao.data
                      ? `${transacao.data.slice(8)}/${transacao.data.slice(
                          5,
                          7
                        )}/${transacao.data.slice(0, 4)}`
                      : "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleExit}>Voltar</button>
      </div>
    </>
  );
}
