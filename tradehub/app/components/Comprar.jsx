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
  const [quantidadeAcao, setQuantidadeAcao] = useState(1);

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

  function handleSubtractButton() {
    quantidadeAcao === 1 ? null : setQuantidadeAcao(quantidadeAcao - 1);
  }

  function handleAddButton() {
    quantidadeAcao === 1000 ? null : setQuantidadeAcao(quantidadeAcao + 1);
  }

  function handleQuantityButton(value) {
    setQuantidadeAcao(value);
  }

  return (
    <>
      <div className="comprarContainer">
        <h1>{nomeAcao}</h1>
        <hr />
        <section className="comprarPreco">
          <p>Preço por unidade</p>
          <p id="comprarPrecoNumero">
            {cotacao ? formatCurrency(cotacao) : "Loading..."}
          </p>
        </section>
        <hr id="comprarSegundoHr" />
        <section className="comprarQuantidade">
          <p>Quantidade de ações</p>
          <div className="quantidadeCounter">
            <button
              onClick={handleSubtractButton}
              className={
                quantidadeAcao === 1
                  ? "comprarBotaoMenosDesabilitado"
                  : "comprarBotaoMenos"
              }
            >
              -
            </button>
            <p>{quantidadeAcao}</p>
            <button
              onClick={handleAddButton}
              className={
                quantidadeAcao === 1000
                  ? "comprarBotaoMaisDesabilitado"
                  : "comprarBotaoMais"
              }
            >
              +
            </button>
          </div>
          <hr id="comprarTerceiroHr" />
          <div className="quantidadeButtonsContainer">
            <button onClick={() => handleQuantityButton(10)}>10</button>
            <button onClick={() => handleQuantityButton(25)}>25</button>
            <button onClick={() => handleQuantityButton(50)}>50</button>
            <button onClick={() => handleQuantityButton(100)}>100</button>
            <button onClick={() => handleQuantityButton(200)}>200</button>
          </div>
        </section>
        <section className="comprarSaldo">
          <p>Saldo disponível</p>
          <p id="comprarSaldoNumero">
            {saldo ? formatCurrency(saldo) : "Loading..."}
          </p>
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
          <button className="buyButton">Comprar</button>
        </section>
      </div>
    </>
  );
}
