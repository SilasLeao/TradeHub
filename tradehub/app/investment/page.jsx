"use client";
import "./investmentPageStyles.css";
import Navbar from "../components/Navbar";
import InvestmentMain from "../components/InvestmentMain";
import InvestmentSideBar from "../components/investmentSideBar";
import { useContext, useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import InfoContainerContext from "../context/InfoContainerContext";

export default function InvestmentPage() {
  const infoContainerContext = useContext(InfoContainerContext);
  let [infoContainerStatus, setInfoContainerStatus] = useState(false);
  const toggleInfoContainerStatus = (statusValue) => {
    setInfoContainerStatus(statusValue);
  };
  const { data: session } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      const loadedSession = await getSession();
      if (sessionStorage.length < 1 && !loadedSession) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1);
      }
    };

    if (!session) {
      checkSession();
    }
  }, [session]);

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
