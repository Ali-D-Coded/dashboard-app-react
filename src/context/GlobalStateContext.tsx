import { createContext, useContext, ReactNode, useState } from "react";
import { useLocalStorage } from "../hooks/helper/useLocalStorage";

type GlobalStateProviderProps = {
  children: ReactNode;
};

type GlobalStateContext = {
  collectToEdit: (data: any) => void;
  editData: any;
};

const GlobalStateContext = createContext({} as GlobalStateContext);

export function useGlobalState() {
  return useContext(GlobalStateContext);
}

export function GlobalStateProvider({ children }: GlobalStateProviderProps) {
  const [editData, setEditData] = useLocalStorage<any>("data", null);

  function collectToEdit(data: any) {
    // console.log({ data });
    setEditData(data);
  }

  return (
    <GlobalStateContext.Provider value={{ collectToEdit, editData }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
