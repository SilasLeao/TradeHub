"use client";
import "./investmentSidebar.css";
import TitleCard from "./TitleCard";
import Destaque from "./Destaque";
import Noticias from "./Noticias";

export default function InvestmentSideBar() {
  return (
    <>
      <div className="investmentSidebar">
        <TitleCard />
        <Destaque />
        <Noticias />
      </div>
    </>
  );
}
