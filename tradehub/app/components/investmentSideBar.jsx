"use client";
import "./investmentSidebar.css";
import TitleCard from "./TitleCard";
import Destaque from "./Destaque";
import Noticias from "./Noticias";
import { useContext } from "react";
import InfoContainerContext from "../context/InfoContainerContext";

export default function InvestmentSideBar() {
  const infoContainerContext = useContext(InfoContainerContext);

  return (
    <>
      <div
        className={`${
          ["investment", "watchlist", "history", "vender"].includes(
            infoContainerContext.infoContainerStatus
          )
            ? "blurEffect investmentSidebar"
            : "investmentSidebar"
        }`}
      >
        <TitleCard />
        <Destaque />
        <Noticias />
      </div>
    </>
  );
}
