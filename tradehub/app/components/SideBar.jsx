"use client";
import "./sidebar.css";
import TitleCard from "./TitleCard";
import Resumo from "./Resumo";
import Noticias from "./Noticias";

export default function SideBar() {
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
