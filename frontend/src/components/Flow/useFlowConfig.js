import { useContext } from "react";
import { FlowContext } from "./FlowContext.js";

export const useFlowConfig = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlowConfig must be used within a FlowProvider");
  }
  return context;
};
