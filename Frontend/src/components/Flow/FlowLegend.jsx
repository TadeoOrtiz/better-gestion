import React from "react";
import { useFlowConfig } from "./useFlowConfig.js";

const FlowLegend = () => {
  const { flowStates, edgeStyles } = useFlowConfig();

  return (
    <div className="flex flex-col gap-5 select-none pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
      {/* Estados */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400/70 border-b border-gray-200/30 dark:border-gray-800/30 pb-1 mb-1">
          Estados
        </span>
        <div className="grid grid-cols-1 gap-y-1.5">
          {Object.entries(flowStates).map(([key, state]) => (
            <div key={key} className="flex items-center gap-2.5">
              <span className="text-sm leading-none flex items-center justify-center w-4 h-4">{state.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-tight leading-none ${state.text}`}>
                {state.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Conexiones */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400/70 border-b border-gray-200/30 dark:border-gray-800/30 pb-1 mb-1">
          Conexiones
        </span>
        <div className="grid grid-cols-1 gap-y-1.5">
          {edgeStyles.map((edge, idx) => (
            <div key={idx} className="flex items-center gap-2.5 opacity-70">
              <div 
                className="w-3.5 h-[1.5px] rounded-full shrink-0" 
                style={{ 
                  backgroundColor: edge.color.includes("#") ? edge.color : "currentColor",
                  opacity: edge.label === "Pendiente" ? 0.3 : 0.8
                }}
              />
              <span className="text-[10px] font-bold uppercase tracking-tight leading-none text-gray-500 dark:text-gray-400">
                {edge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowLegend;
