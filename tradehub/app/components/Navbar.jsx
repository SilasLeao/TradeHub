"use client";
import "./navbar.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
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
            {/* <i className="fa fa-regular fa-user"></i> */}
            <FontAwesomeIcon icon="fa-regular fa-user" />
            <span>Olá, {nomeUsuario}</span>
          </div>
          <hr />
          <ul>
            <li>
              <i className="fa-solid fa-coins"></i>
              <span>Meus Investimentos</span>
            </li>
            <li className="selected">
              <i className="fa-solid fa-chart-line"></i>
              <span>Ações da Bolsa</span>
            </li>
            <li>
              <i className="fa-regular fa-building"></i>
              <span>Fundos Imobiliários</span>
            </li>
            <li>
              <i className="fa-brands fa-bitcoin"></i>
              <span>Criptomoedas</span>
            </li>
            <li>
              <i className="fa-solid fa-sack-dollar"></i>
              <span>Fundos de Investimento</span>
            </li>
            <li>
              <i className="fa-solid fa-chart-simple"></i>
              <span>Estatísticas</span>
            </li>
            <li>
              <i className="fa-solid fa-gear"></i>
              <span>Configurações</span>
            </li>
            <li>
              <i className="fa-regular fa-circle-question"></i>
              <span>FAQ</span>
            </li>
          </ul>
          <p id="quit">Encerrar Sessão</p>
        </section>
        <div className="support">
          <i className="fa fa-solid fa-headset"></i>
        </div>
      </aside>
    </>
  );
}
