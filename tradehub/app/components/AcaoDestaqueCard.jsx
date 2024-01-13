"use client";
import "./acaoDestaqueCard.css";

export default function AcaoDestaqueCard({ acao }) {
  const nome = acao.stock;
  const cotacao = acao.close;
  const variacao = acao.change;
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
