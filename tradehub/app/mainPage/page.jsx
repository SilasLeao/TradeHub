"use client";
import { useRouter } from "next/navigation";
import "./mainPageStyles.css";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  useEffect(() => {
    const nomeUsuarioSessionStorage = sessionStorage.getItem("nomeUsuario");
    setNomeUsuario(nomeUsuarioSessionStorage); //
  }, []);
  return <></>;
}
