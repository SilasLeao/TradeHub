"use client";
import "./mainPageStyles.css";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import AcaoSideBar from "../components/AcaoSideBar";
import { createContext, useState } from "react";

export const InfoContainerContext = createContext();

export default function MainPage() {
  let [infoContainerStatus, setInfoContainerStatus] = useState(false);

  const toggleInfoContainerStatus = () => {
    setInfoContainerStatus(!infoContainerStatus);
  };

  return (
    <>
      <div className="mainPageComponents">
        <InfoContainerContext.Provider
          value={{ infoContainerStatus, toggleInfoContainerStatus }}
        >
          <Navbar />
          <AcoesMain />
          <AcaoSideBar />
        </InfoContainerContext.Provider>
      </div>
    </>
  );
}
