"use client";
import "./watchlistInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { InfoContainerContext } from "../mainPage/page";
export default function WatchlistInfo() {
  const infoContainerContext = useContext(InfoContainerContext);
  function handleExit() {
    infoContainerContext.toggleInfoContainerStatus("");
  }

  const [watchlist, setWatchlist] = useState([]);

  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Watchlist")
          .select("*")
          .filter("usuario_id", "eq", "55021470-36ad-42ea-835b-fefaef8f21d5");
        setWatchlist(data);

        const promises = data.map(async (investimento) => {
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

        const watchlistData = await Promise.all(promises);
        setWatchlist(watchlistData);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []);

  async function handleWatchlistDelete(index) {
    try {
      const deletarAcao = watchlist[index];

      const { error } = await supabase
        .from("Watchlist")
        .delete()
        .eq("simbolo", deletarAcao.nome)
        .eq("usuario_id", "55021470-36ad-42ea-835b-fefaef8f21d5");
      if (!error) {
        let updatedWatchlist = [...watchlist];
        updatedWatchlist.splice(index, 1);
        setWatchlist(updatedWatchlist);
      }
    } catch (error) {
      console.error("Erro ao tentar deletar ação", error);
    }
  }

  return (
    <>
      <div className="watchlistInfoContainer">
        <h1 className="watchlistTitle">Watchlist</h1>
        <div className="watchlistInvestmentsContainer">
          <table className="watchlistTableInfo">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Cotação</th>
                <th>Variação</th>
                <th>X</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((investimento, index) => (
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
                      investimento.variacao && investimento.variacao.length > 0
                        ? investimento.variacao[0] === "-"
                          ? "redTableText"
                          : "greenTableText"
                        : ""
                    }
                  >
                    {investimento.variacao && investimento.variacao.length > 0
                      ? investimento.variacao[0] === "-"
                        ? `${investimento.variacao}%`
                        : `+${investimento.variacao}%`
                      : "Loading..."}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleWatchlistDelete(index);
                      }}
                    >
                      <FontAwesomeIcon
                        className="watchlistIcon"
                        icon={faTrashCan}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="closeWatchlistButton" onClick={handleExit}>
          Voltar
        </button>
      </div>
    </>
  );
}
