"use client";
import { useRouter } from "next/navigation";
import "./loginStyles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (event) => {
    setUsuario({ ...usuario, [event.target.name]: event.target.value });
  };

  function validarNome() {
    if (usuario.nome.length > 16 || usuario.nome.length < 3) {
      return false;
    } else {
      return true;
    }
  }

  function validarSenha() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    return passwordRegex.test(usuario.senha);
  }

  function validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(usuario.email);
  }

  const handleSubmit = () => {
    if (validarSenha() && validarEmail() && validarNome()) {
      sessionStorage.setItem("nomeUsuario", usuario.nome);
      sessionStorage.setItem("emailUsuario", usuario.email);
      router.push("../mainPage");
    } else if (validarEmail() === false) {
      alert("Por favor, insira um email válido.");
    } else if (validarSenha() === false) {
      alert(
        "Por favor, insira uma senha com ao menos uma letra maiúscula e um número."
      );
    } else if (validarNome() === false) {
      alert(
        "Por favor, insira um nome que contenha pelo menos 3 letras e no máximo 16 letras."
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
              <span>Lembrar minha conta</span>
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
            <FontAwesomeIcon
              onClick={() =>
                signIn("google", {
                  callbackUrl: "https://trade-hub-iota.vercel.app/mainPage",
                })
              }
              className="loginIcon"
              icon={faGoogle}
            />
          </div>

          <p id="conta">
            Ainda não tem uma conta? <span id="criarConta">Criar conta</span>
          </p>
        </form>
      </div>
    </>
  );
}
