"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import SideBar from "../components/SideBar";

export default function InvestmentPage() {
  return (
    <>
      <div className="investmentPageComponents">
        <Navbar />
        <InvestmentMain />
        <SideBar />
      </div>
    </>
  );
}
