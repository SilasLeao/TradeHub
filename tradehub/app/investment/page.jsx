"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import InvestmentSideBar from "../components/investmentSideBar";
import { NavbarProvider } from "../components/navbarContext";

export default function InvestmentPage() {
  return (
    <>
      <div className="investmentPageComponents">
        <NavbarProvider>
          <Navbar />
          <InvestmentMain />
          <InvestmentSideBar />
        </NavbarProvider>
      </div>
    </>
  );
}
