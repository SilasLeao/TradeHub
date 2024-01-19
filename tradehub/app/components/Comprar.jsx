import "./comprar.css";
import { InfoContainerContext } from "../mainPage/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient } from "@supabase/supabase-js";
import { useState, useContext, useEffect } from "react";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
export default function Comprar() {
  let nomeAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  const infoContainerContext = useContext(InfoContainerContext);
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [cotacao, setCotacao] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch(
          `https://brapi.dev/api/quote/${nomeAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
        );
        const resultado = await resposta.json();
        setCotacao(resultado.results[0].regularMarketPrice);
      } catch (error) {}
    };
    fetchData();
  }, []);

  function handleExitButton() {
    infoContainerContext.toggleInfoContainerStatus("");
  }

  const formatCurrency = (value) => {
    value = value
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `R$ ${value}`;
  };
  return (
    <>
      <div className="comprarContainer">
        <h1>{nomeAcao}</h1>
        <hr />
        <section>
          <p>Preço por unidade</p>
          <p>R$ 00,00</p>
          <hr />
        </section>
        <section>
          <p>Quantidade de ações</p>
          <div>
            <button>-</button>
            <p>15</p>
            <button>+</button>
          </div>
          <div>
            <button>10</button>
            <button>25</button>
            <button>50</button>
            <button>100</button>
            <button>200</button>
          </div>
        </section>
        <section>
          <p>Saldo disponível</p>
          <p>R$ 1000,00</p>
        </section>
        <section>
          <div>
            <p>15 ações</p>
            <p>R$ 000,00</p>
          </div>
          <div>
            <p>
              Taxa de corretagem
              <FontAwesomeIcon icon={faCircleQuestion} />
            </p>
            <p>Zero</p>
          </div>
          <div>
            <p>
              Taxa da B3
              <FontAwesomeIcon
                className="expandirIcon"
                icon={faCircleQuestion}
              />
            </p>
            <p>R$ 0,00</p>
          </div>
          <hr />
          <div>
            <p>Total</p>
            <p>R$ 000,00</p>
          </div>
        </section>
        <section>
          <button onClick={handleExitButton}>Voltar</button>
          <button>Comprar</button>
        </section>
      </div>
    </>
  );
}
