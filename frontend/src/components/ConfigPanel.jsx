import React from "react";
import { useFlowConfig } from "./Flow/useFlowConfig.js";

export default function ConfigPanel() {
  const { config, updateConfig, flowStates, updateFlowStates, edgeStyles, updateEdgeStyles } = useFlowConfig();

  const handleFlowChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateConfig({
      [name]: type === 'checkbox' ? checked : parseInt(value),
    });
  };

  const handleStateChange = (stateKey, field, value) => {
    updateFlowStates({
      [stateKey]: {
        ...flowStates[stateKey],
        [field]: value
      }
    });
  };

  return (
    <div className="w-72 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-900">
        <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Configuración
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
        {/* AJUSTES DEL GRAFO */}
        <section className="space-y-3">
          <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-blue-500/80">
            Grafo
          </h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                <label>X-Space</label>
                <span className="text-gray-600 dark:text-gray-400 font-mono">{config.xSpacing}px</span>
              </div>
              <input
                type="range"
                name="xSpacing"
                min="250"
                max="600"
                step="10"
                value={config.xSpacing}
                onChange={handleFlowChange}
                className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-tight">
                <label>Y-Space</label>
                <span className="text-gray-600 dark:text-gray-400 font-mono">{config.ySpacing}px</span>
              </div>
              <input
                type="range"
                name="ySpacing"
                min="150"
                max="500"
                step="10"
                value={config.ySpacing}
                onChange={handleFlowChange}
                className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">Conexiones</span>
              <div className="relative">
                <input
                  type="checkbox"
                  name="showEdges"
                  checked={config.showEdges}
                  onChange={handleFlowChange}
                  className="sr-only peer"
                />
                <div className="w-7 h-3.5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1.5px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-blue-500"></div>
              </div>
            </label>
          </div>
        </section>

        {/* ESTADOS */}
        <section className="space-y-4">
          <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-purple-500/80">
            Estados
          </h3>
          <div className="space-y-5">
            {Object.entries(flowStates).map(([key, state]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={state.icon}
                    onChange={(e) => handleStateChange(key, "icon", e.target.value)}
                    className="w-4 bg-transparent border-none text-sm text-center focus:ring-0 p-0 outline-none"
                  />
                  <input
                    type="text"
                    value={state.label}
                    onChange={(e) => handleStateChange(key, "label", e.target.value)}
                    className={`flex-1 bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-wider outline-none focus:ring-0 ${state.text}`}
                  />
                </div>
                <textarea
                  value={state.description}
                  onChange={(e) => handleStateChange(key, "description", e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-[10px] text-gray-500 dark:text-gray-400 resize-none h-auto leading-tight focus:ring-0 outline-none"
                  rows={1}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CONEXIONES */}
        <section className="space-y-4 pb-4">
          <h3 className="text-[9px] font-black uppercase tracking-[0.1em] text-emerald-500/80">
            Conexiones
          </h3>
          <div className="space-y-5">
            {edgeStyles.map((edge, idx) => (
              <div key={idx} className="space-y-1">
                <input
                  type="text"
                  value={edge.label}
                  onChange={(e) => {
                    const newEdges = [...edgeStyles];
                    newEdges[idx] = { ...newEdges[idx], label: e.target.value };
                    updateEdgeStyles(newEdges);
                  }}
                  className="w-full bg-transparent border-none p-0 text-[10px] font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 outline-none focus:ring-0"
                />
                <textarea
                  value={edge.description}
                  onChange={(e) => {
                    const newEdges = [...edgeStyles];
                    newEdges[idx] = { ...newEdges[idx], description: e.target.value };
                    updateEdgeStyles(newEdges);
                  }}
                  className="w-full bg-transparent border-none p-0 text-[10px] text-gray-500 dark:text-gray-400 resize-none h-auto leading-tight focus:ring-0 outline-none"
                  rows={1}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
