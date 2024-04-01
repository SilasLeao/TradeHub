"use client";
import "./mainPageStyles.css";
import Navbar from "../components/Navbar";
import AcoesMain from "../components/AcoesMain";
import AcaoSideBar from "../components/AcaoSideBar";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import InfoContainerContext from "../context/InfoContainerContext";

export default function MainPage() {
  let [infoContainerStatus, setInfoContainerStatus] = useState("");
  const { data: session } = useSession();

  const toggleInfoContainerStatus = (statusValue) => {
    setInfoContainerStatus(statusValue);
  };

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
    <div className="mainPageComponents">
      <InfoContainerContext.Provider
        value={{ infoContainerStatus, toggleInfoContainerStatus }}
      >
        <Navbar />
        <AcoesMain />
        <AcaoSideBar />
      </InfoContainerContext.Provider>
    </div>
  );
}
