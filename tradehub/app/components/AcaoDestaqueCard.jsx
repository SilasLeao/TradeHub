"use client";
import "./acaoDestaqueCard.css";

export default function AcaoDestaqueCard({ acao }) {
  const nome = acao.nome;
  const cotacao = acao.cotacao;
  const variacao = acao.variacao;
  return (
    <>
      <div
        className={
          variacao < 0
            ? "destaqueCardVermelho acaoCardDestaque"
            : "destaqueCardVerde acaoCardDestaque"
        }
      >
        <p
          className={
            variacao < 0
              ? "titleVermelho acaoCardTitleDestaque"
              : "titleVerde acaoCardTitleDestaque"
          }
        >
          {nome}
        </p>
        <hr
          className={
            variacao < 0
              ? "destaqueHrVermelho acaoCardDestaqueFirstHr"
              : "destaqueHrVerde acaoCardDestaqueFirstHr"
          }
        />
        <p
          className={
            variacao < 0
              ? "destaqueCotacaoVermelho acaoCardPriceDestaque"
              : "destaqueCotacaoVerde acaoCardPriceDestaque"
          }
        >
          R$ {cotacao.toFixed(2)}
        </p>
        <hr
          className={
            variacao < 0
              ? "destaqueHrVermelho acaoCardDestaqueSecondHr"
              : "destaqueHrVerde acaoCardDestaqueSecondHr"
          }
        />
        <p
          className={
            variacao < 0
              ? "variacaoDestaqueVermelho acaoCardChangeDestaque"
              : "variacaoDestaqueVerde acaoCardChangeDestaque"
          }
        >
          {variacao.toFixed(2)}%
        </p>
      </div>
    </>
  );
}
