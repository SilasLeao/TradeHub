"use client";
import { useRouter } from "next/navigation";
import "./mainPageStyles.css";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import SideBar from "../components/SideBar";

export default function MainPage() {
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
