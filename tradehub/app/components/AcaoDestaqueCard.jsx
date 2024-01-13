"use client";
import "./acaoDestaqueCard.css";

export default function AcaoDestaqueCard({ acao }) {
  const nome = acao.nome;
  const cotacao = acao.cotacao;
  const variacao = acao.variacao;
  return (
    <>
      <div className="acaoCardDestaque">
        <p className="acaoCardTitleDestaque">{nome}</p>
        <hr className="acaoCardDestaqueFirstHr" />
        <p className="acaoCardPriceDestaque">R$ {cotacao.toFixed(2)}</p>
        <hr className="acaoCardDestaqueSecondHr" />
        <p className="acaoCardChangeDestaque">{variacao.toFixed(2)}%</p>
      </div>
    </>
  );
}
