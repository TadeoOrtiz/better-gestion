import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { useFlowConfig } from "./useFlowConfig.js";

const MateriaNode = ({ data }) => {
    const { flowStates } = useFlowConfig();
    const style = flowStates[data.state] || flowStates.bloqueada;

    return (
        <div
            onClick={data.onClick}
            onContextMenu={data.onContextMenu}
            className={`
                group relative px-4 py-3 rounded-xl border-2 transition-all duration-200
                shadow-sm hover:shadow-md cursor-pointer select-none
                w-55 flex flex-col items-center gap-1
                ${style.bg} ${style.border} ${style.text}
            `}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 px-2 text-[10px] font-bold uppercase tracking-wider border rounded-full">
                Año {data.year}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xl">{style.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">
                    {style.label}
                </span>
            </div>

            <span className="text-xs font-bold text-center leading-tight px-1">
                {data.label}
            </span>

            {data.missingPrerequisites?.length > 0 && (
                <div className="mt-2 w-full pt-2 border-t border-current opacity-60 flex flex-col gap-0.5">
                    <span className="text-[8px] font-black uppercase text-center block mb-0.5">
                        Correlativas Pendientes
                    </span>
                    {data.missingPrerequisites.map((p, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center gap-2 text-[9px] leading-tight"
                        >
                            <span className="font-medium truncate flex-1">
                                {p.label}
                            </span>
                            <span className="font-bold opacity-80 shrink-0">
                                ({p.type})
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Target Handles (Top) - Priority: Center (1), Left (2), Right (3) */}
            <Handle
                type="target"
                position={Position.Top}
                id="t-1"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "50%" }}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="t-2"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "25%" }}
            />
            <Handle
                type="target"
                position={Position.Top}
                id="t-3"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "75%" }}
            />

            {/* Source Handles (Bottom) - Priority: Center (1), Left (2), Right (3) */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="s-1"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "50%" }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="s-2"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "25%" }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="s-3"
                className="bg-transparent! border-none! opacity-0"
                style={{ left: "75%" }}
            />
        </div>
    );
};

export default memo(MateriaNode);
