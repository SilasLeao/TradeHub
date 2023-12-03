"use client";

// 8QE9zJXLMnT7w6wppfyXEs

import "./acoesMain.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

export default function AcoesMain() {
  const [codigoAcao, setCodigoAcao] = useState("");
  function handleChange(event) {
    setCodigoAcao(event.target.value);
    console.log(codigoAcao);
  }
  function handleSearch() {
    alert(codigoAcao);
  }

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resposta = await fetch("https://www.exemplo.com/api/recurso");
  //       const resultado = await resposta.json();
  //       setData(resultado);
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
              <button onClick={handleSearch}>
                <FontAwesomeIcon
                  className="acoesIcon"
                  icon={faMagnifyingGlass}
                />
              </button>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Pesquisar"
              />
            </div>
            <span>Filtrar por:</span>
            <button className="filterButton">
              Valor
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button className="filterButton">
              Dividendos
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
            <button className="filterButton">
              Crescimento
              <FontAwesomeIcon className="acoesIcon" icon={faCaretDown} />
            </button>
          </div>
          <div className="cardContainer"></div>
        </div>
      </div>
    </>
  );
}
