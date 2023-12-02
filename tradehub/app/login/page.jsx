"use client";
import { useRouter } from "next/navigation";
import "./loginStyles.css";
import { useState } from "react";
/* <button type="button" onClick={() => router.push("../")}>
        Teste nav2
      </button> */

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
      router.push("../mainPage");
    } else {
      alert(
        "Por favor, insira uma senha com ao menos uma letra maiúscula e um número."
      );
    }
  };

  return (
    <>
      <div className="body">
        <form className="contentBox">
          <h1>Bem vindo(a)!</h1>

          <input
            name="nome"
            className="inputs"
            type="text"
            placeholder="Nome"
            value={usuario.nome}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            className="inputs"
            type="email"
            placeholder="E-mail"
            value={usuario.email}
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            className="inputs"
            type="password"
            placeholder="Senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />

          <section className="loginOptions">
            <span>
              <input className="checkbox" type="checkbox" />
              <span>Lembrar-se de mim</span>
            </span>
            <span id="esqueceuSenha">Esqueceu sua senha?</span>
          </section>

          <button type="button" onClick={handleSubmit}>
            Log In
          </button>

          <div className="divider">
            <hr className="left" />
            ou
            <hr className="right" />
          </div>

          <div className="socialIcons">
            <a href="https://www.instagram.com" target="_blank">
              <i className="fa-brands fa-google"></i>
            </a>

            <a href="https://linkedin.com" target="_blank">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a href="https://facebook.com" target="_blank">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </div>

          <p id="conta">
            Ainda não tem uma conta? <span id="criarConta">Criar conta</span>
          </p>
        </form>
      </div>
      <script
        src="https://kit.fontawesome.com/f9e40fd065.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
