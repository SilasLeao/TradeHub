"use client";
import "./resumo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export default function Resumo() {
  return (
    <>
      <div className="resumoCard">
        <div className="resumoTitle">
          <span className="resumoWhiteText">Resumo</span>
          <FontAwesomeIcon className="resumoIcon" icon={faArrowRight} />
        </div>
        <div className="conta">
          <span className="resumoWhiteText">Conta</span>
          <span className="resumoWhiteText">5GJV756PUC</span>
        </div>
        <div className="saldo">
          <span className="resumoWhiteText">Saldo Atual</span>
          <span className="resumoNumeroVerde">R$ 1.375,83</span>
        </div>
        <div className="totalInvestido">
          <span className="resumoWhiteText">Total Investido</span>
          <span className="resumoWhiteText">R$ 17.486,21</span>
        </div>
        <div className="valorAcumulado">
          <span className="resumoWhiteText">Valor Acumulado</span>
          <span className="resumoNumeroVerde">R$ 19.629,93</span>
        </div>
        <div className="valorAcumuladoPorcento">
          <span className="resumoWhiteText">Valor Acumulado(%)</span>
          <span className="resumoNumeroVerde">12,24%</span>
        </div>
        <div className="dividendos">
          <span className="resumoWhiteText">Dividendos a Receber</span>
          <span className="resumoWhiteText">R$ 53,27</span>
        </div>
      </div>
    </>
  );
}
