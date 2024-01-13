"use client";
import "./acaoDestaqueCard.css";

export default function AcaoDestaqueCard(nome, cotacao, variacao) {
  return (
    <>
      <div className="acaoCardDestaque">
        <p className="acaoCardTitleDestaque">{nome}</p>
        <hr className="acaoCardDestaqueFirstHr" />
        <p className="acaoCardPriceDestaque">R$ {cotacao}</p>
        <hr className="acaoCardDestaqueSecondHr" />
        <p className="acaoCardChangeDestaque">{variacao}%</p>
      </div>
    </>
  );
}
