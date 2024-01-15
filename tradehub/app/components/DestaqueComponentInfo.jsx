"use client";

import "./destaqueComponentInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function DestaqueComponentInfo({ acao }) {
  const nome = acao.nome;
  const variacao = acao.variacao;

  return (
    <>
      <div className={variacao < 0 ? "destaqueVermelho" : "destaqueVerde"}>
        <FontAwesomeIcon icon={variacao < 0 ? faArrowDown : faArrowUp} />
        <span>
          {variacao > 0
            ? `${nome} +${variacao.toFixed(2)}%`
            : `${nome} ${variacao.toFixed(2)}%`}
        </span>
      </div>
    </>
  );
}
