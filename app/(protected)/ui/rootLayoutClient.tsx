"use client"

import { createContext, useState } from "react";
import FallbackUIDesktop from "./fallback-desktop";

export const CrateContext = createContext<{
  crateLength: number,
  setCrateLength: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);


export function RootChild({children}:{children:React.ReactNode}) {

  const [crateLength, setCrateLength] = useState(0);
  
  return <FallbackUIDesktop>
          <CrateContext.Provider value={{crateLength, setCrateLength}} >
          {children}
          </CrateContext.Provider>
        </FallbackUIDesktop>

}