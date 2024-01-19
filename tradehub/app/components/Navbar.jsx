"use client";
import "./navbar.css";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faChartLine,
  faSackDollar,
  faChartSimple,
  faGear,
  faHeadset,
  faUser as filledUser,
} from "@fortawesome/free-solid-svg-icons";

import { faUser, faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { InfoContainerContext } from "../mainPage/page";

export default function Navbar() {
  const infoContainerContext = useContext(InfoContainerContext);
  const router = useRouter();
  const pathname = usePathname();
  const [acoesActive, setAcoesActive] = useState(false);
  const [investmentActive, setInvestmentActive] = useState(false);

  useEffect(() => {
    if (pathname.includes("mainPage")) {
      setAcoesActive(true);
    } else if (pathname.includes("investment")) {
      setInvestmentActive(true);
    }
  }, []);

  function handleInvestmentButton() {
    router.push("../investment");
  }

  function handleAcoesButton() {
    router.push("../mainPage");
  }

  function handleExitButton() {
    sessionStorage.clear();
    router.push("../login");
  }

  const [nomeUsuario, setNomeUsuario] = useState("");
  useEffect(() => {
    const nomeUsuarioSessionStorage = sessionStorage.getItem("nomeUsuario");
    setNomeUsuario(nomeUsuarioSessionStorage);
  }, []);
  return (
    <div
      className={`${
        ["acoes", "investment", "watchlist", "history", "comprar"].includes(
          infoContainerContext.infoContainerStatus
        )
          ? "blurEffect"
          : ""
      }`}
    >
      <aside className="navbarAside">
        <section className="content">
          <div className="perfil">
            <FontAwesomeIcon className="fa perfilIcon" icon={faUser} />
            <span className="navbarWhiteText">Olá, {nomeUsuario}</span>
          </div>
          <hr className="navbarHr" />
          <ul className="navbarUl">
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={filledUser} />
              <span className="navbarWhiteText">Minha Conta</span>
            </li>
            <li
              className={`navbarLi ${investmentActive ? "selected" : ""}`}
              onClick={handleInvestmentButton}
            >
              <FontAwesomeIcon className="navbarIcon" icon={faCoins} />
              <span className="navbarWhiteText">Meus Investimentos</span>
            </li>
            <li
              className={`navbarLi ${acoesActive ? "selected" : ""}`}
              onClick={handleAcoesButton}
            >
              <FontAwesomeIcon className="navbarIcon" icon={faChartLine} />
              <span className="navbarWhiteText">Ações da Bolsa</span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faSackDollar} />
              <span className="navbarWhiteText">Fundos de Investimento</span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faChartSimple} />
              <span className="navbarWhiteText">Estatísticas</span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faGear} />
              <span className="navbarWhiteText">Configurações</span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faCircleQuestion} />
              <span className="navbarWhiteText">FAQ</span>
            </li>
          </ul>
          <p id="quit" onClick={handleExitButton}>
            Encerrar Sessão
          </p>
        </section>
        <div className="support">
          <FontAwesomeIcon className="fa fa-headset" icon={faHeadset} />
        </div>
      </aside>
    </div>
  );
}
