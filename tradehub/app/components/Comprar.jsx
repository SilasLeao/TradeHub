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
  const [saldo, setSaldo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stockResponse, supabaseResponse] = await Promise.all([
          fetch(
            `https://brapi.dev/api/quote/${nomeAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
          ).then((res) => res.json()),
          supabase
            .from("Usuario")
            .select("*")
            .filter("conta_id", "eq", "5GJV756PUC"),
        ]);

        const { data } = supabaseResponse;

        setCotacao(stockResponse.results[0].regularMarketPrice);
        setSaldo(data[0].saldo);
      } catch (error) {
        console.error(error);
      }
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

  function handleTeste() {
    console.log(saldo);
  }
  return (
    <>
      <div className="comprarContainer">
        <h1>{nomeAcao}</h1>
        <hr />
        <section className="comprarPreco">
          <p>Preço por unidade</p>
          <p>{cotacao ? formatCurrency(cotacao) : "Loading..."}</p>
          <hr />
        </section>
        <section className="comprarQuantidade">
          <p>Quantidade de ações</p>
          <div className="quantidadeCounter">
            <button>-</button>
            <p>15</p>
            <button>+</button>
          </div>
          <hr />
          <div className="quantidadeButtonsContainer">
            <button>10</button>
            <button>25</button>
            <button>50</button>
            <button>100</button>
            <button>200</button>
          </div>
        </section>
        <section className="comprarSaldo">
          <p>Saldo disponível</p>
          <p>{saldo ? formatCurrency(saldo) : "Loading..."}</p>
        </section>
        <section className="comprarResumoCotainer">
          <div className="comprarAcoesPreco">
            <p>15 ações</p>
            <p>R$ 000,00</p>
          </div>
          <div className="comprarTaxaCorretagem">
            <p>
              Taxa de corretagem
              <FontAwesomeIcon
                className="questionMarkIcon"
                icon={faCircleQuestion}
              />
            </p>
            <p>Zero</p>
          </div>
          <div className="comprarTaxaB3">
            <p>
              Taxa da B3
              <FontAwesomeIcon
                className="questionMarkIcon"
                icon={faCircleQuestion}
              />
            </p>
            <p>R$ 0,00</p>
          </div>
          <hr />
          <div className="comprarTotal">
            <p>Total</p>
            <p>R$ 000,00</p>
          </div>
        </section>
        <section>
          <button className="exitButton" onClick={handleExitButton}>
            Voltar
          </button>
          <button className="buyButton" onClick={handleTeste}>
            Comprar
          </button>
        </section>
      </div>
    </>
  );
}
