"use client";
import "./navbar.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faChartLine,
  faSackDollar,
  faChartSimple,
  faGear,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBuilding,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { useNavbar } from "./navbarContext";

export default function Navbar() {
  const {
    acoesActive,
    investmentActive,
    handleInvestmentClick,
    handleAcoesClick,
  } = useNavbar();

  const [nomeUsuario, setNomeUsuario] = useState("");
  useEffect(() => {
    const nomeUsuarioSessionStorage = sessionStorage.getItem("nomeUsuario");
    setNomeUsuario(nomeUsuarioSessionStorage); //
  }, []);

  return (
    <>
      <aside>
        <section className="content">
          <div className="perfil">
            <FontAwesomeIcon className="fa fa-user" icon={faUser} />
            <span>Olá, {nomeUsuario}</span>
          </div>
          <hr className="navbarHr" />
          <ul>
            <li className={investmentActive ? "selected" : ""}>
              <FontAwesomeIcon className="navbarIcon" icon={faCoins} />
              <span onClick={handleInvestmentClick}>Meus Investimentos</span>
            </li>
            <li className={acoesActive ? "selected" : ""}>
              <FontAwesomeIcon className="navbarIcon" icon={faChartLine} />
              <span onClick={handleAcoesClick}>Ações da Bolsa</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faBuilding} />
              <span>Fundos Imobiliários</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faBitcoin} />
              <span>Criptomoedas</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faSackDollar} />
              <span>Fundos de Investimento</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faChartSimple} />
              <span>Estatísticas</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faGear} />
              <span>Configurações</span>
            </li>
            <li>
              <FontAwesomeIcon className="navbarIcon" icon={faCircleQuestion} />
              <span>FAQ</span>
            </li>
          </ul>
          <p id="quit">Encerrar Sessão</p>
        </section>
        <div className="support">
          <FontAwesomeIcon className="fa fa-headset" icon={faHeadset} />
        </div>
      </aside>
    </>
  );
}
