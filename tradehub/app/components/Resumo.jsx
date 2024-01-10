"use client";
import "./resumo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Resumo() {
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [usuarioData, setUsuarioData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase.from("Usuario").select("*");
        setUsuarioData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!usuarioData || usuarioData.length === 0) {
    return <h1>Loading...</h1>;
  }

  const conta = usuarioData[0].conta_id;
  let saldo = `R$ ${usuarioData[0].saldo}`;
  const totalInvestido = `R$ ${usuarioData[0].total_investido}`;
  const rendimentoBruto = `R$ ${usuarioData[0].rendimento_bruto}`;
  const rendimentoParcial = `R$ ${usuarioData[0].rendimento_parcial}`;
  const rendimentoPorcentagem =
    usuarioData[0].rendimento_porcentagem > 0
      ? `+${usuarioData[0].rendimento_porcentagem}%`
      : `${usuarioData[0].rendimento_porcentagem}%`;

  saldo = saldo.replace(".", ",");

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
