import React, {
  useContext,
  createContext,
  useState,
  useLayoutEffect,
} from "react";
import { Integration } from "lit-ceramic-sdk";

export const LitContext = createContext();

export const LitProvider = ({ children }) => {
  const [litCeramicIntegration, setLitCeramicIntegration] = useState(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const lit = new Integration(
        "https://ceramic-clay.3boxlabs.com",
        "mumbai"
      );
      setLitCeramicIntegration(lit);
      lit.startLitClient(window);
    }
  }, []);

  return (
    <LitContext.Provider value={litCeramicIntegration}>
      {children}
    </LitContext.Provider>
  );
};
