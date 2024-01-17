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
          .filter("usuario_id", "eq", "5GJV756PUC");
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

  console.log(watchlist);

  return (
    <>
      <div className="watchlistInfoContainer">
        <h1>Watchlist</h1>
        <div className="watchlistInvestmentsContainer">
          {watchlist.map((investimento) => (
            <div className="watchlistInvestments">
              <p>{investimento.nome}</p>
              <p>{investimento.cotacao}</p>
              <p>{investimento.variacao}</p>
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          ))}
        </div>
        <button onClick={handleExit}>Voltar</button>
      </div>
    </>
  );
}