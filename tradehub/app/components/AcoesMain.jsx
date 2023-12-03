"use client";
import "./acoesMain.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
export default function AcoesMain() {
  return (
    <>
      <div className="acoesMainContainer">
        <h1>Ações da Bolsa</h1>
        <div className="destaque">
          <p>Ações em Destaque</p>
          <div className="acoesDestaque"></div>
        </div>
        <div className="searchContainer">
          <div className="searchHeader">
            <div className="searchBar">
              <FontAwesomeIcon className="acoesIcon" icon={faMagnifyingGlass} />
              <input type="text" placeholder="Pesquisar" />
            </div>
            <span>Filtrar por:</span>
            <button>
              Valor
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button>
              Dividendos
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button>
              Crescimento
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
          </div>
          <hr />
          <div className="cardContainer"></div>
        </div>
      </div>
    </>
  );
}
