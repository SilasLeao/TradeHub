"use client";
import "./noLogin.css";
import { useRouter } from "next/navigation";

export default function NoLogin() {
  const router = useRouter();

  return (
    <>
      <div className="noLoginContainer">
        <div className="noLoginText">
          <h1>Parece que você não está logado em sua conta!</h1>
          <p>
            Para usar nossa plataforma, é necessário que esteja logado em alguma
            conta.
          </p>
          <p>
            Para fazer login
            <button
              className="noLoginButton"
              onClick={() => router.push("../login")}
            >
              Clique Aqui!
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
