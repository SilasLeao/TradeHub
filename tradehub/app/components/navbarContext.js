"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const router = useRouter();
  const [acoesActive, setAcoesActive] = useState(true);
  const [investmentActive, setInvestmentActive] = useState(false);

  const handleInvestmentClick = () => {
    setInvestmentActive(true);
    setAcoesActive(false);
    router.push("../investment");
  };

  const handleAcoesClick = () => {
    setInvestmentActive(false);
    setAcoesActive(true);
    router.push("../mainPage");
  };

  return (
    <NavbarContext.Provider
      value={{
        acoesActive,
        investmentActive,
        handleInvestmentClick,
        handleAcoesClick,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
