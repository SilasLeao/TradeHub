"use client";
import { useRouter } from "next/navigation";
import "./mainPageStyles.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import SideBar from "../components/SideBar";

export default function MainPage() {
  // const [nomeUsuario, setNomeUsuario] = useState("");
  // useEffect(() => {
  //   const nomeUsuarioSessionStorage = sessionStorage.getItem("nomeUsuario");
  //   setNomeUsuario(nomeUsuarioSessionStorage); //
  // }, []);
  return (
    <>
      <div className="mainPageComponents">
        <Navbar />
        <AcoesMain />
        <SideBar />
      </div>
    </>
  );
}
