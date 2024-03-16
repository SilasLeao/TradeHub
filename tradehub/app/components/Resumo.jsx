"use client";
import "./resumo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Resumo() {
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [usuarioData, setUsuarioData] = useState([]);
  const [investimentosUsuario, setInvestimentosUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rendimentoData, setRendimentoData] = useState({
    valorAplicado: 0,
    rendimentoTotal: 0,
    rendimentoParcial: 0,
    rendimentoPorcentagem: 0,
  });
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataPromise = supabase.from("Usuario").select("*");
        const investmentsDataPromise = supabase
          .from("Investimentos")
          .select("*");

        const [userData, investmentsData] = await Promise.all([
          userDataPromise,
          investmentsDataPromise,
        ]);

        setUsuarioData(userData.data);
        setInvestimentosUsuario(investmentsData.data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const calculateUserData = async () => {
      let valorAplicado = 0;
      let rendimentoTotal = 0;

      try {
        const fetchPromises = investimentosUsuario.map(async (investimento) => {
          valorAplicado += investimento.valor_aplicado;
          const codigoAcao = investimento.simbolo;
          const resposta = await fetch(
            `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
          );
          const resultado = await resposta.json();
          return (
            resultado.results[0].regularMarketPrice * investimento.quantidade
          );
        });

        const results = await Promise.all(fetchPromises);
        rendimentoTotal = results.reduce((sum, value) => sum + value, 0);
        rendimentoTotal = parseFloat(rendimentoTotal.toFixed(2));

        const rendimentoParcial = (rendimentoTotal - valorAplicado).toFixed(2);
        const rendimentoPorcentagem = (
          (rendimentoParcial / valorAplicado) *
          100
        ).toFixed(2);

        setRendimentoData({
          valorAplicado,
          rendimentoTotal,
          rendimentoParcial,
          rendimentoPorcentagem,
        });

        setLoading(false);
      } catch (error) {
        console.error("Erro no cálculo:", error);
        setLoading(false);
      }
    };

    if (investimentosUsuario.length > 0) {
      calculateUserData();
    }
  }, [investimentosUsuario]);

  if (loading || !usuarioData || usuarioData.length === 0) {
    return <h1>Loading...</h1>;
  }

  let conta;
  if (session && session.user) {
    conta = session.user.email;
  } else {
    conta = sessionStorage.getItem("emailUsuario");
  }
  let saldo = usuarioData[0].saldo;
  saldo = saldo.toFixed(2);
  saldo = `R$ ${saldo}`;
  let valorAplicado = rendimentoData.valorAplicado;
  let valorAplicadoFormatted = `R$ ${valorAplicado.toFixed(2)}`;
  let rendimentoTotal = rendimentoData.rendimentoTotal;
  let rendimentoTotalFormatted = `R$ ${rendimentoTotal}`;
  let rendimentoParcial = rendimentoData.rendimentoParcial;
  let rendimentoParcialFormatted = `${rendimentoParcial}`;
  let rendimentoPorcentagem = "0%";
  if (rendimentoData.rendimentoPorcentagem !== undefined) {
    rendimentoPorcentagem =
      rendimentoData.rendimentoPorcentagem > 0
        ? `+${rendimentoData.rendimentoPorcentagem}%`
        : `${rendimentoData.rendimentoPorcentagem}%`;
  }
  saldo = saldo.replace(".", ",");
  saldo = saldo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  valorAplicadoFormatted = valorAplicadoFormatted.replace(".", ",");
  valorAplicadoFormatted = valorAplicadoFormatted
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  rendimentoTotalFormatted = rendimentoTotalFormatted.replace(".", ",");
  rendimentoTotalFormatted = rendimentoTotalFormatted
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  rendimentoParcialFormatted = rendimentoParcialFormatted
    .replace(".", ",")
    .replace("-", "");
  rendimentoParcialFormatted = rendimentoParcialFormatted
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  rendimentoPorcentagem = rendimentoPorcentagem.replace(".", ",");

  return (
    <>
      <div className="resumoCard">
        <div className="resumoTitle">
          <span className="resumoWhiteText">Resumo</span>
          <FontAwesomeIcon className="resumoIcon" icon={faArrowRight} />
        </div>
        <div className="conta">
          <span className="resumoWhiteText">Conta</span>
          <span className="resumoWhiteText">{conta}</span>
        </div>
        <div className="saldo">
          <span className="resumoWhiteText">Saldo Atual</span>
          <span className="resumoWhiteText">{saldo}</span>
        </div>
        <div className="totalInvestido">
          <span className="resumoWhiteText">Total Investido</span>
          <span className="resumoWhiteText">{valorAplicadoFormatted}</span>
        </div>
        <div className="rendimentoBruto">
          <span className="resumoWhiteText">Rendimento Total</span>
          <span
            className={`${
              rendimentoTotal > valorAplicado
                ? "resumoNumeroVerde"
                : "resumoNumeroVermelho"
            }`}
          >
            {rendimentoTotalFormatted}
          </span>
        </div>
        <div className="rendimentoParcial">
          <span className="resumoWhiteText">Rendimento Parcial</span>
          <span
            className={`${
              rendimentoTotal > valorAplicado
                ? "resumoNumeroVerde"
                : "resumoNumeroVermelho"
            }`}
          >
            {rendimentoTotal > valorAplicado
              ? `+R$ ${rendimentoParcialFormatted}`
              : `-R$ ${rendimentoParcialFormatted}`}
          </span>
        </div>
        <div className="rendimentoPorcento">
          <span className="resumoWhiteText">Rendimento(%)</span>
          <span
            className={`${
              rendimentoPorcentagem[0] === "+"
                ? "resumoNumeroVerde"
                : "resumoNumeroVermelho"
            }`}
          >
            {rendimentoPorcentagem}
          </span>
        </div>
      </div>
    </>
  );
}
