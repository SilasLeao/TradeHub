"use client";
import "./acaoSidebar.css";
import TitleCard from "./TitleCard";
import Resumo from "./Resumo";
import Noticias from "./Noticias";

export default function AcaoSideBar() {
  return (
    <>
      <div className="sidebar">
        <TitleCard />
        <Resumo />
        <Noticias />
      </div>
    </>
  );
}
