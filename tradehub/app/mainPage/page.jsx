"use client";
import "./mainPageStyles.css";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import AcaoSideBar from "../components/AcaoSideBar";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function MainPage() {
  return (
    <>
      <div className="mainPageComponents">
        <Navbar />
        <AcoesMain />
        <AcaoSideBar />
      </div>
    </>
  );
}
