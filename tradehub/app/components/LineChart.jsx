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
    const codigoAcao = sessionStorage.getItem("acaoPesquisada");
    const fetchInvestmentData = async () => {
      try {
        const resposta = await fetch(
          `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
        );
        const resultado = await resposta.json();
        // console.log(resultado);
        const symbol = resultado.results[0].symbol;
        const fullName = resultado.results[0].longName;
        let marketCap = resultado.results[0].marketCap
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        marketCap = `R$ ${marketCap},00`;
        console.log(marketCap);
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
          labels: [
            "2023-01",
            "2023-02",
            "2023-03",
            "2023-04",
            "2023-05",
            "2023-06",
            "2023-07",
          ],
          datasets: [
            {
              data: [100, 120, 115, 134, 168, 132, 200],
              backgroundColor: "purple",
            },
          ],
        }}
      />
    </div>
  );
}
