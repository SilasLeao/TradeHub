"use client";
import "./acaoSidebar.css";
import TitleCard from "./TitleCard";
import Resumo from "./Resumo";
import Noticias from "./Noticias";
import { useContext } from "react";
import { InfoContainerContext } from "../mainPage/page";

export default function AcaoSideBar() {
  const infoContainerContext = useContext(InfoContainerContext);
  return (
    <>
      <div
        className={`${
          infoContainerContext.infoContainerStatus === "acoes"
            ? "blurEffect acaoSidebar"
            : "acaoSidebar"
        }`}
      >
        <TitleCard />
        <Resumo />
        <Noticias />
      </div>
    </>
  );
}
