"use client";

import teste from "./teste.js";
import { useRouter } from "next/navigation";
import "./styles.css";

export default function Home() {
  const router = useRouter();
  // teste()
  return (
    <>
      <div className="body">
        <div className="content">
          <h1>
            Trade<span>Hub</span>
          </h1>
          <p>
            Bem-vindo ao TradeHub, sua porta de entrada para o emocionante mundo
            dos investimentos. Junte-se à comunidade TradeHub e transforme seus
            objetivos em realidade. Vamos construir o seu sucesso financeiro
            juntos!
          </p>
          <button onClick={() => router.push("./login")}>
            Explore as Oportunidades!
          </button>
        </div>
      </div>
    </>
  );
}
