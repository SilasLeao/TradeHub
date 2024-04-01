"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useContext, useState } from "react";
import ChartTimelineContext from "../context/ChartTimelineContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement
);

export default function LineChart() {
  const chartTimelineContext = useContext(ChartTimelineContext);

  const [regularMarketPrice, setRegularMarketPrice] = useState(null);
  const [regularMarketDayLow, setRegularMarketDayLow] = useState(null);
  const [regularMarketDayHigh, setRegularMarketDayHigh] = useState(null);
  const [fiftyTwoWeekLow, setFiftyTwoWeekLow] = useState(null);
  const [fiftyTwoWeekHigh, setFiftyTwoWeekHigh] = useState(null);

  useEffect(() => {
    const codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
    const fetchInvestmentData = async () => {
      try {
        const resposta = await fetch(
          `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
        );
        const resultado = await resposta.json();
        setRegularMarketPrice(resultado.results[0].regularMarketPrice);
        setRegularMarketDayLow(resultado.results[0].regularMarketDayLow);
        setRegularMarketDayHigh(resultado.results[0].regularMarketDayHigh);
        setFiftyTwoWeekLow(resultado.results[0].fiftyTwoWeekLow);
        setFiftyTwoWeekHigh(resultado.results[0].fiftyTwoWeekHigh);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchInvestmentData();
  }, []);

  return (
    <div>
      {chartTimelineContext.chartTimeline ? (
        <Line
          data={{
            labels: [
              "Valor Mínimo no Dia(R$)",
              "Valor Atual(R$)",
              "Valor Máximo no Dia(R$)",
            ],
            datasets: [
              {
                data: [
                  regularMarketDayLow,
                  regularMarketPrice,
                  regularMarketDayHigh,
                ],
                backgroundColor: "black",
                borderColor: "#5dec85",
              },
            ],
          }}
        />
      ) : (
        <Line
          data={{
            labels: [
              "Valor Mínimo no Ano(R$)",
              "Valor Atual(R$)",
              "Valor Máximo no Ano(R$)",
            ],
            datasets: [
              {
                data: [fiftyTwoWeekLow, regularMarketPrice, fiftyTwoWeekHigh],
                backgroundColor: "black",
                borderColor: "#5dec85",
              },
            ],
          }}
        />
      )}
    </div>
  );
}
