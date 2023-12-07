"use client";
import { useRouter } from "next/navigation";
import "./loginStyles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faLinkedinIn,
  faSquareFacebook,
} from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (event) => {
    setUsuario({ ...usuario, [event.target.name]: event.target.value });
  };

  function validarSenha() {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(usuario.senha);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validarSenha()) {
      sessionStorage.setItem("nomeUsuario", usuario.nome);
      router.push("../mainPage");
    } else {
      alert(
        "Por favor, insira uma senha com ao menos uma letra maiúscula e um número."
      );
    }
  };

  return (
    <>
      <div className="loginBody">
        <form className="loginContentBox">
          <h1 className="loginH1">Bem vindo(a)!</h1>

          <input
            name="nome"
            className="loginInputs"
            type="text"
            placeholder="Nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            className="loginInputs"
            type="email"
            placeholder="E-mail"
            value={usuario.email}
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            className="loginInputs"
            type="password"
            placeholder="Senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />

          <section className="loginOptions">
            <span>
              <input className="loginCheckbox" type="checkbox" />
              <span>Lembrar-se de mim</span>
            </span>
            <span id="esqueceuSenha">Esqueceu sua senha?</span>
          </section>

          <button className="loginButton" type="button" onClick={handleSubmit}>
            Log In
          </button>

          <div className="loginDivider">
            <hr className="loginLeft" />
            ou
            <hr className="loginRight" />
          </div>

          <div className="loginSocialIcons">
            <FontAwesomeIcon className="loginIcon" icon={faGoogle} />
            <FontAwesomeIcon className="loginIcon" icon={faLinkedinIn} />
            <FontAwesomeIcon className="loginIcon" icon={faSquareFacebook} />
          </div>

          <p id="conta">
            Ainda não tem uma conta? <span id="criarConta">Criar conta</span>
          </p>
        </form>
      </div>
    </>
  );
}
