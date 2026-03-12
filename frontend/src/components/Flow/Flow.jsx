import React from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
} from "@xyflow/react";
import MateriaNode from "./MateriaNode";
import FlowLegend from "./FlowLegend";
import { useFlowData } from "./useFlowData";
import { useFlowConfig } from "./useFlowConfig.js";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
    materia: MateriaNode,
};

export function FlowContent() {
    const { nodes, edges, toggleSubject } = useFlowData();
    const { config, updateConfig } = useFlowConfig();

    // Attach click handler to nodes data
    const nodesWithHandlers = nodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            onClick: () => toggleSubject(String(node.id)),
        },
    }));

    return (
        <div className="w-full h-full bg-gray-50 dark:bg-gray-950 overflow-hidden border-r border-gray-200 dark:border-gray-800 relative">
            <ReactFlow
                nodes={nodesWithHandlers}
                edges={config.showEdges ? edges : []}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
                fitView
                translateExtent={[
                    [-1500, -500],
                    [1500, 2000],
                ]}
                nodeExtent={[
                    [-1500, -500],
                    [1500, 2000],
                ]}
                defaultEdgeOptions={{
                    type: "smoothstep",
                    style: {
                        strokeDasharray: "5,5", // Línea punteada
                        stroke: "#94a3b8", // Color slate-400
                        strokeWidth: 2,
                    },
                }}
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.1}
                maxZoom={1.5}
            >
                <Background
                    color="#94a3b8"
                    variant={BackgroundVariant.Cross}
                    gap={20}
                    size={1}
                />
            </ReactFlow>

            {/* Floating Legend Toggle Button */}
            <button
                onClick={() => updateConfig({ showLegend: !config.showLegend })}
                className="absolute top-4 left-4 z-20 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-10 h-10"
                title={
                    config.showLegend ? "Ocultar Leyenda" : "Mostrar Leyenda"
                }
            >
                {config.showLegend ? "❌" : "ℹ️"}
            </button>

            {/* Floating Legend */}
            {config.showLegend && (
                <div className="absolute top-16 left-6 z-10">
                    <FlowLegend />
                </div>
            )}
        </div>
    );
}

export default FlowContent;
