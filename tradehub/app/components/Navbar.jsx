"use client";
import "./navbar.css";
import { useRouter, usePathname } from "next/navigation";
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
// import { useNavbar } from "./navbarContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  // const {
  //   acoesActive,
  //   investmentActive,
  //   handleInvestmentClick,
  //   handleAcoesClick,
  // } = useNavbar();
  const [acoesActive, setAcoesActive] = useState(false);
  const [investmentActive, setInvestmentActive] = useState(false);

  useEffect(() => {
    if (pathname && pathname.includes("mainPage")) {
      setAcoesActive(true);
      setInvestmentActive(false);
      console.log(`teste1 ${(acoesActive, investmentActive)}`);
    } else {
      setInvestmentActive(true);
      setAcoesActive(false);
      console.log(`teste2 ${acoesActive}, ${investmentActive}`);
    }
  }, []);

  function handleInvestmentClick() {
    router.push("../investment");
  }

  function handleAcoesClick() {
    router.push("../mainPage");
  }

  const [nomeUsuario, setNomeUsuario] = useState("");
  useEffect(() => {
    const nomeUsuarioSessionStorage = sessionStorage.getItem("nomeUsuario");
    setNomeUsuario(nomeUsuarioSessionStorage); //
  }, []);

  return (
    <>
      <aside className="navbarAside">
        <section className="content">
          <div className="perfil">
            <FontAwesomeIcon className="fa fa-user" icon={faUser} />
            <span className="navbarWhiteText">Olá, {nomeUsuario}</span>
          </div>
          <hr className="navbarHr" />
          <ul className="navbarUl">
            <li className={`navbarLi ${investmentActive ? "selected" : ""}`}>
              <FontAwesomeIcon className="navbarIcon" icon={faCoins} />
              <span className="navbarWhiteText" onClick={handleInvestmentClick}>
                Meus Investimentos
              </span>
            </li>
            <li className={`navbarLi ${acoesActive ? "selected" : ""}`}>
              <FontAwesomeIcon className="navbarIcon" icon={faChartLine} />
              <span className="navbarWhiteText" onClick={handleAcoesClick}>
                Ações da Bolsa
              </span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faBuilding} />
              <span className="navbarWhiteText">Fundos Imobiliários</span>
            </li>
            <li className="navbarLi">
              <FontAwesomeIcon className="navbarIcon" icon={faBitcoin} />
              <span className="navbarWhiteText">Criptomoedas</span>
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
          <p id="quit">Encerrar Sessão</p>
        </section>
        <div className="support">
          <FontAwesomeIcon className="fa fa-headset" icon={faHeadset} />
        </div>
      </aside>
    </>
  );
}
