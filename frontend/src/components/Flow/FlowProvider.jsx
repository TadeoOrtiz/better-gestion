import React, { useState, useEffect } from "react";
import { FlowContext } from "./FlowContext.js";
import { FLOW_STATES as INITIAL_FLOW_STATES, EDGE_STYLES as INITIAL_EDGE_STYLES } from "./flowSettings";

export const FlowProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("flow-config");
    return saved ? JSON.parse(saved) : {
      xSpacing: 380,
      ySpacing: 260,
      showEdges: true,
      showLegend: true,
      nodeWidth: 220,
    };
  });

  const [flowStates, setFlowStates] = useState(() => {
    const saved = localStorage.getItem("flow-states");
    return saved ? JSON.parse(saved) : INITIAL_FLOW_STATES;
  });

  const [edgeStyles, setEdgeStyles] = useState(() => {
    const saved = localStorage.getItem("flow-edge-styles");
    return saved ? JSON.parse(saved) : INITIAL_EDGE_STYLES;
  });

  useEffect(() => {
    localStorage.setItem("flow-config", JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem("flow-states", JSON.stringify(flowStates));
  }, [flowStates]);

  useEffect(() => {
    localStorage.setItem("flow-edge-styles", JSON.stringify(edgeStyles));
  }, [edgeStyles]);

  const updateConfig = (newConfig) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const updateFlowStates = (newStates) => {
    setFlowStates((prev) => ({ ...prev, ...newStates }));
  };

  const updateEdgeStyles = (newStyles) => {
    setEdgeStyles(newStyles);
  };

  return (
    <FlowContext.Provider value={{ 
      config, 
      updateConfig, 
      flowStates, 
      updateFlowStates, 
      edgeStyles, 
      updateEdgeStyles 
    }}>
      {children}
    </FlowContext.Provider>
  );
};
