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
import { useEffect } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement
);

export default function LineChart() {
  useEffect(() => {
    const codigoAcao = sessionStorage.getItem("codigoAcaoPesquisada");
    const fetchInvestmentData = async () => {
      try {
        const resposta = await fetch(
          `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
        );
        const resultado = await resposta.json();
        // console.log(resultado);
        let regularMarketPrice = resultado.results[0].regularMarketPrice;
        let regularMarketDayLow = resultado.results[0].regularMarketDayLow;
        let regularMarketDayHigh = resultado.results[0].regularMarketDayHigh;
        let fiftyTwoWeekLow = resultado.results[0].fiftyTwoWeekLow;
        let fiftyTwoWeekHigh = resultado.results[0].fiftyTwoWeekHigh;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchInvestmentData();
  }, []);

  return (
    <div>
      <Line
        data={{
          labels: ["2023-01", "Valor Atual", "2023-03"],
          datasets: [
            {
              data: [10, 100, 150, 200],
              backgroundColor: "purple",
            },
          ],
        }}
      />
    </div>
  );
}
