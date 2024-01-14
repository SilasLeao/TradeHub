"use client";
import "./resumo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Resumo() {
  let valorAplicado = 0;
  let rendimentoTotal = 0;
  let rendimentoParcial = 0;
  let rendimentoPorcentagem = 0;
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [usuarioData, setUsuarioData] = useState([]);
  const [investimentosUsuario, setInvestimentosUsuario] = useState([]);

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
  }, []);

  function calculateUserData() {
    const fetchPromises = investimentosUsuario.map(async (investimento) => {
      valorAplicado += investimento.valor_aplicado;
      const codigoAcao = investimento.simbolo;
      const resposta = await fetch(
        `https://brapi.dev/api/quote/${codigoAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
      );
      const resultado = await resposta.json();
      rendimentoTotal +=
        resultado.results[0].regularMarketPrice * investimento.quantidade;
      rendimentoTotal = parseFloat(rendimentoTotal.toFixed(2));
      rendimentoParcial = (rendimentoTotal - valorAplicado).toFixed(2);
      rendimentoPorcentagem = (
        (rendimentoParcial / valorAplicado) *
        100
      ).toFixed(2);
      console.log(
        `aplicado: ${valorAplicado}, total: ${rendimentoTotal}, parcial: ${rendimentoParcial}, porcentagem: ${rendimentoPorcentagem}`
      );
    });

    return Promise.all(fetchPromises);
  }

  calculateUserData();

  if (!usuarioData || usuarioData.length === 0) {
    return <h1>Loading...</h1>;
  }

  let conta = usuarioData[0].conta_id;
  let saldo = `R$ ${usuarioData[0].saldo}`;
  let totalInvestido = `R$ ${usuarioData[0].total_investido}`;
  let rendimentoBruto = `R$ ${usuarioData[0].rendimento_bruto}`;
  rendimentoParcial = `R$ ${usuarioData[0].rendimento_parcial}`;
  rendimentoPorcentagem =
    usuarioData[0].rendimento_porcentagem > 0
      ? `+${usuarioData[0].rendimento_porcentagem}%`
      : `${usuarioData[0].rendimento_porcentagem}%`;

  saldo = saldo.replace(".", ",");
  saldo = saldo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  totalInvestido = totalInvestido.replace(".", ",");
  totalInvestido = totalInvestido
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  rendimentoBruto = rendimentoBruto.replace(".", ",");
  rendimentoBruto = rendimentoBruto
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  rendimentoParcial = rendimentoParcial.replace(".", ",");
  rendimentoParcial = rendimentoParcial
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
          <span className="resumoWhiteText">{totalInvestido}</span>
        </div>
        <div className="rendimentoBruto">
          <span className="resumoWhiteText">Rendimento Total</span>
          <span
            className={`${
              usuarioData[0].rendimento_bruto > usuarioData[0].total_investido
                ? "resumoNumeroVerde"
                : "resumoNumeroVermelho"
            }`}
          >
            {rendimentoBruto}
          </span>
        </div>
        <div className="rendimentoParcial">
          <span className="resumoWhiteText">Rendimento Parcial</span>
          <span
            className={`${
              usuarioData[0].rendimento_parcial > 0
                ? "resumoNumeroVerde"
                : "resumoNumeroVermelho"
            }`}
          >
            {rendimentoParcial}
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
