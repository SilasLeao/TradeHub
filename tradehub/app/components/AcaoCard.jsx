import "./acaoCard.css";
import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { createClient } from "@supabase/supabase-js";
import CardInfo from "./cardInfo";
import { InfoContainerContext } from "../mainPage/page";
export default function AcaoCard({ acao }) {
  const [watchlist, setWatchlist] = useState([]);

  const nome = acao.symbol;
  const marketCap = acao.marketCap;
  const fullName = acao.fullName;
  const valor = acao.regularMarketPrice;
  const variacao = acao.regularMarketChangePercent;
  const corTextoClass = classNames({
    acaoVermelho: variacao < 0,
    acaoVerde: variacao >= 0,
  });

  const supabaseUrl = "https://njjjjpkgxodlrhrysbev.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qampqcGtneG9kbHJocnlzYmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4MTg1MzQsImV4cCI6MjAxNzM5NDUzNH0.BJ8RAHt3jHIAJgq9vD1P8_gaWI-R-zn9AbGN71zyItc";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const infoContainerContext = useContext(InfoContainerContext);

  function handleInfoButton() {
    sessionStorage.setItem("codigoAcaoPesquisada", nome);
    sessionStorage.setItem("nomeAcaoPesquisada", fullName);
    sessionStorage.setItem("marketCap", marketCap);
    infoContainerContext.toggleInfoContainerStatus("acoes");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Watchlist")
          .select("*")
          .filter("usuario_id", "eq", "5GJV756PUC");
        setWatchlist(
          data.map((investimento) => {
            return investimento.simbolo;
          })
        );
      } catch (error) {
        console.error("Erro ao consultar watchlist", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="acaoCard">
        <p className="acaoCardTitle">{nome}</p>
        <p className="acaoCardPrice">R$ {valor.toFixed(2).replace(".", ",")}</p>
        <hr className="acaoCardHr" />
        <p className={`acaoCardChange ${corTextoClass}`}>
          {variacao > 0
            ? `+${variacao.toFixed(2)}%`
            : `${variacao.toFixed(2)}%`}
        </p>
        <div className="acaoCardBtns">
          <FontAwesomeIcon
            className="acaoCardIcon"
            icon={faInfoCircle}
            onClick={handleInfoButton}
          />
          <button>Comprar</button>
          <FontAwesomeIcon
            className="acaoCardIcon"
            icon={
              watchlist && watchlist.length > 0
                ? watchlist.includes(nome)
                  ? faStar
                  : faEmptyStar
                : ""
            }
          />
        </div>
      </div>
    </>
  );
}
