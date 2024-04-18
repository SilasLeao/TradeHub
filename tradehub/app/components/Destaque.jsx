"use client";
import "./destaque.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import DestaqueComponentInfo from "./DestaqueComponentInfo";

export default function Destaque() {
  const [acaoDestaque, setAcaoDestaque] = useState([]);
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

  return (
    <>
      <div className="destaqueCard">
        <div className="destaqueTitle">
          <span>Destaque</span>
          <FontAwesomeIcon className="destaqueTitleIcon" icon={faFilter} />
        </div>
        <div>
          {acaoDestaque.map((acao, index) => (
            <DestaqueComponentInfo key={index} acao={acao} />
          ))}
        </div>
      </div>
    </>
  );
}
