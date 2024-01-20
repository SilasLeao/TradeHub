import "./vender.css";
import { InfoContainerContext } from "../mainPage/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient } from "@supabase/supabase-js";
import { useState, useContext, useEffect } from "react";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
export default function Vender() {
  let nomeAcao = sessionStorage.getItem("codigoAcaoPesquisada");
  const infoContainerContext = useContext(InfoContainerContext);
  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [cotacao, setCotacao] = useState();
  const [saldo, setSaldo] = useState();
  const [quantidadeAcaoUsuario, setQuantidadeAcaoUsuario] = useState();
  const [quantidadeAcao, setQuantidadeAcao] = useState(1);
  const [taxaDeCorretagem, setTaxaDeCorretagem] = useState(false);
  const [taxaB3, setTaxaB3] = useState(false);
  const [valorAplicado, setValorAplicado] = useState();
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
          supabaseUsuarioResponse,
          supabaseInvestimentoResponse,
        ] = await Promise.all([
          fetch(
            `https://brapi.dev/api/quote/${nomeAcao}?token=8QE9zJXLMnT7w6wppfyXEs`
          ).then((res) => res.json()),
          supabase
            .from("Usuario")
            .select("*")
            .filter("conta_id", "eq", "5GJV756PUC"),
          supabase
            .from("Investimentos")
            .select("*")
            .eq("simbolo", `${nomeAcao}`)
            .filter("usuario_id", "eq", "5GJV756PUC"),
        ]);

        setCotacao(stockResponse.results[0].regularMarketPrice);
        setSaldo(supabaseUsuarioResponse.data[0].saldo);
        setQuantidadeAcaoUsuario(
          supabaseInvestimentoResponse.data[0].quantidade
        );
        setValorAplicado(supabaseInvestimentoResponse.data[0].valor_aplicado);
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
    if (quantidadeAcao + value >= quantidadeAcaoUsuario) {
      setQuantidadeAcao(quantidadeAcaoUsuario);
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

  function handleSell(value) {
    const updateData = async () => {
      try {
        let novoSaldo = Number((saldo + value).toFixed(2));
        let custoMedio = valorAplicado / quantidadeAcaoUsuario;

        const atualizarSaldo = supabase
          .from("Usuario")
          .update({ saldo: novoSaldo })
          .eq("conta_id", "5GJV756PUC");
        const inserirHistorico = supabase.from("Historico").insert([
          {
            simbolo: `${nomeAcao}`,
            usuario_id: "5GJV756PUC",
            tipo: "Venda",
            quantidade: `${quantidadeAcao}`,
            preco_unitario: `${cotacao}`,
            total: `${value.toFixed(2)}`,
            data: `${formattedDate}`,
          },
        ]);

        let atualizarInvestimento;

        if (quantidadeAcao === quantidadeAcaoUsuario) {
          atualizarInvestimento = supabase
            .from("Investimentos")
            .delete()
            .eq("simbolo", `${nomeAcao}`)
            .eq("usuario_id", "5GJV756PUC");
        } else {
          atualizarInvestimento = supabase.from("Investimentos").update({
            quantidade: `${quantidadeAcaoUsuario - quantidadeAcao}`,
            valorAplicado: `${(
              (quantidadeAcaoUsuario - quantidadeAcao) *
              custoMedio
            ).toFixed(2)}`,
          });
        }

        const [
          atualizarSaldoUsuario,
          atualizarTransacaoHistorico,
          atualizarAcaoInvestimento,
        ] = await Promise.all([
          atualizarSaldo,
          inserirHistorico,
          atualizarInvestimento,
        ]);
        infoContainerContext.toggleInfoContainerStatus("");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

    updateData();
  }

  return (
    <>
      <div className="venderContainer">
        <h1>{nomeAcao}</h1>
        <hr />
        <section className="venderPreco">
          <p>Preço por unidade</p>
          <p id="venderPrecoNumero">
            {cotacao ? formatCurrency(cotacao) : "Loading..."}
          </p>
        </section>
        <hr id="venderSegundoHr" />
        <section className="venderQuantidade">
          <p>Quantidade de ações</p>
          <div className="quantidadeCounter">
            <button
              onClick={handleSubtractButton}
              className={
                quantidadeAcao === 1
                  ? "venderBotaoMenosDesabilitado"
                  : "venderBotaoMenos"
              }
            >
              -
            </button>
            <p>{quantidadeAcao}</p>
            <button
              onClick={handleAddButton}
              className={
                quantidadeAcao === quantidadeAcaoUsuario
                  ? "venderBotaoMaisDesabilitado"
                  : "venderBotaoMais"
              }
            >
              +
            </button>
          </div>
          <hr id="venderTerceiroHr" />
          <div className="quantidadeButtonsContainer">
            <button onClick={() => handleQuantityButton(10)}>10</button>
            <button onClick={() => handleQuantityButton(25)}>25</button>
            <button onClick={() => handleQuantityButton(50)}>50</button>
            <button onClick={() => handleQuantityButton(100)}>100</button>
            <button onClick={() => handleQuantityButton(quantidadeAcaoUsuario)}>
              Máx
            </button>
          </div>
        </section>
        <section className="venderSaldo">
          <p>Quantidade disponível</p>
          <p id="venderSaldoNumero">
            {quantidadeAcaoUsuario
              ? quantidadeAcaoUsuario === 1
                ? `${quantidadeAcaoUsuario} Ação`
                : `${quantidadeAcaoUsuario} Ações`
              : "Loading..."}
          </p>
        </section>
        <section className="venderResumoCotainer">
          <div className="venderAcoesPreco">
            <p>
              {quantidadeAcao === 1
                ? `${quantidadeAcao} ação`
                : `${quantidadeAcao} ações`}
            </p>
            <p>{formatCurrency(cotacao * quantidadeAcao)}</p>
          </div>
          <div className="venderTaxaCorretagem">
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
          <div className="venderTaxaB3">
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
          <section className="venderHrSection">
            <hr />
          </section>
          <div className="venderTotal">
            <p>Total</p>
            <p>
              {formatCurrency(
                quantidadeAcao * cotacao -
                  (0.0325 / 100) * (cotacao * quantidadeAcao)
              )}
            </p>
          </div>
        </section>
        <section className="venderButtonSection">
          <button className="exitButton" onClick={handleExitButton}>
            Voltar
          </button>
          <button
            onClick={() =>
              handleSell(
                quantidadeAcao * cotacao -
                  (0.0325 / 100) * (cotacao * quantidadeAcao)
              )
            }
            className="sellButton"
          >
            Vender
          </button>
        </section>
      </div>
    </>
  );
}
