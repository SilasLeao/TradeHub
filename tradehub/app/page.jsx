"use client";
import { useRouter } from "next/navigation";
import "./styles.css";
import { signIn } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="landingBody">
        <div className="landingContent">
          <h1 className="landingH1">
            Trade<span className="landingSpan">Hub</span>
          </h1>
          <p className="landingP">
            Bem-vindo ao TradeHub, sua porta de entrada para o emocionante mundo
            dos investimentos. Junte-se à comunidade TradeHub e transforme seus
            objetivos em realidade. Vamos construir o seu sucesso financeiro
            juntos!
          </p>
          <button onClick={() => signIn("google")} className="landingButton">
            Explore as Oportunidades!
          </button>
        </div>
      </div>
    </>
  );
}
