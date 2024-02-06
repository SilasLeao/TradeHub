"use client";
import "./mainPageStyles.css";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import AcaoSideBar from "../components/AcaoSideBar";
import { createContext, useState } from "react";
import NoLogin from "../components/NoLogin";
import { useSession } from "next-auth/react";
export const InfoContainerContext = createContext();

export default function MainPage() {
  let [infoContainerStatus, setInfoContainerStatus] = useState("");

  const toggleInfoContainerStatus = (statusValue) => {
    setInfoContainerStatus(statusValue);
  };

  const { data: session } = useSession();

  return (
    <>
      {sessionStorage.length >= 1 || session ? (
        <div className="mainPageComponents">
          <InfoContainerContext.Provider
            value={{ infoContainerStatus, toggleInfoContainerStatus }}
          >
            <Navbar />
            <AcoesMain />
            <AcaoSideBar />
          </InfoContainerContext.Provider>
        </div>
      ) : (
        <NoLogin />
      )}
    </>
  );
}
