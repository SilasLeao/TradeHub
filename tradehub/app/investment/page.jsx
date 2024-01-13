"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import InvestmentSideBar from "../components/investmentSideBar";
import { useContext, useState } from "react";
import { InfoContainerContext } from "../mainPage/page";
export default function InvestmentPage() {
  const infoContainerContext = useContext(InfoContainerContext);
  let [infoContainerStatus, setInfoContainerStatus] = useState(false);
  const toggleInfoContainerStatus = () => {
    setInfoContainerStatus(!infoContainerStatus);
  };
  return (
    <>
      <div className="investmentPageComponents">
        <InfoContainerContext.Provider
          value={{ infoContainerStatus, toggleInfoContainerStatus }}
        >
          <Navbar />
          <InvestmentMain />
          <InvestmentSideBar />
        </InfoContainerContext.Provider>
      </div>
    </>
  );
}
