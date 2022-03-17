import React from "react";
import { useGlobal } from "./global-state";
let litCeramicIntegration;
import("lit-ceramic-sdk").then((mod) => {
  if (typeof window !== "undefined" || typeof document !== "undefined") {
    litCeramicIntegration = new mod.Integration(
      "https://ceramic-clay.3boxlabs.com",
      "mumbai"
    );
    litCeramicIntegration.startLitClient(window);
  }
});

const withLit = (WrappedComponent) => {
  const Wrapper = (props) => {
    return (
      <WrappedComponent
        {...props}
        litCeramicIntegration={litCeramicIntegration}
      />
    );
  };
  return Wrapper;
};

export default withLit;
