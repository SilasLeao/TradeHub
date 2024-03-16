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
  const [quantidadeAcaoInvestimento, setQuantidadeAcaoInvestimento] =
    useState();
  const [valorAplicadoInvestimento, setValorAplicadoInvestimento] = useState();
  const [taxaDeCorretagem, setTaxaDeCorretagem] = useState(false);
  const [taxaB3, setTaxaB3] = useState(false);
  let dataAtual = new Date();
  let ano = dataAtual.getFullYear();
  let mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
  let dia = dataAtual.getDate().toString().padStart(2, "0");
  let formattedDate = ano + "-" + mes + "-" + dia;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          stockResponse,
          supabaseUserResponse,
          supabaseInvestmentResponse,
        ] = await Promise.all([
          fetch(
            `https://brapi.dev/api/quote/${nomeAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
          ).then((res) => res.json()),
          supabase
            .from("Usuario")
            .select("*")
            .filter("conta_id", "eq", "55021470-36ad-42ea-835b-fefaef8f21d5"),
          supabase
            .from("Investimentos")
            .select("*")
            .eq("simbolo", `${nomeAcao}`)
            .filter("usuario_id", "eq", "55021470-36ad-42ea-835b-fefaef8f21d5"),
        ]);

        setCotacao(stockResponse.results[0].regularMarketPrice);
        setSaldo(supabaseUserResponse.data[0].saldo);
        setQuantidadeAcaoInvestimento(
          supabaseInvestmentResponse.data[0].quantidade
        );
        setValorAplicadoInvestimento(
          supabaseInvestmentResponse.data[0].valor_aplicado
        );
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
    quantidadeAcao <= 1 ? null : setQuantidadeAcao(quantidadeAcao - 1);
  }

  function handleAddButton() {
    quantidadeAcao >= 1000 ? null : setQuantidadeAcao(quantidadeAcao + 1);
  }

  function handleQuantityButton(value) {
    if (quantidadeAcao + value >= 1000) {
      setQuantidadeAcao(1000);
    } else {
      setQuantidadeAcao(quantidadeAcao + value);
    }
  }

  function handleCorretagemHover() {
    setTaxaDeCorretagem(true);
  }

  function handleCorretagemHoverOut() {
    setTaxaDeCorretagem(false);
  }

  function handleB3Hover() {
    setTaxaB3(true);
  }

  function handleB3HoverOut() {
    setTaxaB3(false);
  }

  function handleBuy(value) {
    const updateData = async () => {
      try {
        if (saldo < value) {
          return alert("Você não possui saldo suficiente!");
        } else {
          let novoSaldo = saldo - value;
          const atualizarSaldo = supabase
            .from("Usuario")
            .update({ saldo: `${novoSaldo}` })
            .eq("conta_id", "55021470-36ad-42ea-835b-fefaef8f21d5");

          let atualizarQuantidade;
          const checkInvestimento = await supabase
            .from("Investimentos")
            .select("*")
            .eq("simbolo", `${nomeAcao}`);
          if (checkInvestimento.data[0]) {
            atualizarQuantidade = supabase
              .from("Investimentos")
              .update({
                quantidade: `${quantidadeAcaoInvestimento + quantidadeAcao}`,
                valor_aplicado: `${
                  Number(valorAplicadoInvestimento) + Number(value)
                }`,
              })
              .eq("simbolo", `${nomeAcao}`);
          } else {
            atualizarQuantidade = supabase.from("Investimentos").insert([
              {
                simbolo: `${nomeAcao}`,
                usuario_id: "55021470-36ad-42ea-835b-fefaef8f21d5",
                quantidade: `${quantidadeAcao}`,
                valor_aplicado: `${Number(cotacao * quantidadeAcao).toFixed(
                  2
                )}`,
              },
            ]);
          }

          const inserirHistorico = supabase.from("Historico").insert([
            {
              simbolo: `${nomeAcao}`,
              usuario_id: "55021470-36ad-42ea-835b-fefaef8f21d5",
              tipo: "Compra",
              quantidade: `${quantidadeAcao}`,
              preco_unitario: `${cotacao}`,
              total: `${value}`,
              data: `${formattedDate}`,
            },
          ]);

          const [
            atualizarSaldoUsuario,
            atualizarQuantidadeInvestimento,
            atualizarTransacaoHistorico,
          ] = await Promise.all([
            atualizarSaldo,
            atualizarQuantidade,
            inserirHistorico,
          ]);
          infoContainerContext.toggleInfoContainerStatus("");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    };

    updateData();
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
            <p>
              {quantidadeAcao === 1
                ? `${quantidadeAcao} ação`
                : `${quantidadeAcao} ações`}
            </p>
            <p>{formatCurrency(cotacao * quantidadeAcao)}</p>
          </div>
          <div className="comprarTaxaCorretagem">
            <p>
              Taxa de corretagem
              {taxaDeCorretagem ? (
                <p className="corretagemPopUp">
                  Taxa cobrada pela intermediação da sua compra na Bolsa de
                  Valores
                </p>
              ) : null}
              <FontAwesomeIcon
                onMouseOver={handleCorretagemHover}
                onMouseOut={handleCorretagemHoverOut}
                className="questionMarkIcon"
                icon={faCircleQuestion}
              />
            </p>
            <p>Zero</p>
          </div>
          <div className="comprarTaxaB3">
            <p>
              Taxa da B3
              {taxaB3 ? (
                <p className="B3PopUp">
                  Taxas obrigatórias cobradas pela B3 sobre o valor total da
                  operação.
                </p>
              ) : null}
              <FontAwesomeIcon
                onMouseOver={handleB3Hover}
                onMouseOut={handleB3HoverOut}
                className="questionMarkIcon"
                icon={faCircleQuestion}
              />
            </p>
            <p>{formatCurrency((0.0325 / 100) * (cotacao * quantidadeAcao))}</p>
          </div>
          <section className="comprarHrSection">
            <hr />
          </section>
          <div className="comprarTotal">
            <p>Total</p>
            <p>
              {formatCurrency(
                quantidadeAcao * cotacao +
                  (0.0325 / 100) * (cotacao * quantidadeAcao)
              )}
            </p>
          </div>
        </section>
        <section className="comprarButtonSection">
          <button className="exitButton" onClick={handleExitButton}>
            Voltar
          </button>
          <button
            onClick={() =>
              handleBuy(
                Number(
                  quantidadeAcao * cotacao +
                    (0.0325 / 100) * (cotacao * quantidadeAcao)
                ).toFixed(2)
              )
            }
            className="buyButton"
          >
            Comprar
          </button>
        </section>
      </div>
    </>
  );
}
