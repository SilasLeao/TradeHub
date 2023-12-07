"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import InvestmentSideBar from "../components/investmentSideBar";

export default function InvestmentPage() {
  return (
    <>
      <div className="investmentPageComponents">
        <Navbar />
        <InvestmentMain />
        <InvestmentSideBar />
      </div>
    </>
  );
}
