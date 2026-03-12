import { useState, useCallback, useMemo, useEffect } from "react";
import { layoutNodes, transformToFlowData } from "./utils";
import { materias as initialSubjects } from "./materias";

const STATUS_CYCLE = ["NoCursando", "Cursando", "Regulada", "Aprobada"];

import { useFlowConfig } from "./useFlowConfig.js";

export function useFlowData() {
  const { config, edgeStyles } = useFlowConfig();
  const [subjects, setSubjects] = useState(() =>
    initialSubjects.map(s => ({ ...s, status: "NoCursando" }))
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (message) => {
      try {
        const data = typeof message === 'string' ? JSON.parse(message) : message;
        if (data && data.type === 'FLOW_DATA_LOADED' && Array.isArray(data.payload)) {
          const savedStatuses = data.payload;
          const mergedSubjects = initialSubjects.map(s => {
            const saved = savedStatuses.find(ss => ss.id === s.id);
            return { ...s, status: saved ? saved.status : "NoCursando" };
          });
          setSubjects(mergedSubjects);
          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Error parsing photino message", err);
      }
    };

    if (window.external && window.external.receiveMessage) {
      window.external.receiveMessage(handleMessage);
      window.external.sendMessage(JSON.stringify({ type: 'LOAD_FLOW_DATA' }));

      // Safety net: si no carga en 1s, asumimos que no hay payload previo válido y activamos el guardado
      setTimeout(() => setIsLoaded(true), 1000);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && window.external && window.external.sendMessage) {
      window.external.sendMessage(JSON.stringify({
        type: 'SAVE_FLOW_DATA',
        payload: subjects
      }));
    }
  }, [subjects, isLoaded]);

  const toggleSubject = useCallback((id) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      const currentIndex = STATUS_CYCLE.indexOf(s.status);
      const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];
      return { ...s, status: nextStatus };
    }));
  }, []);

  const toggleSubjectBackwards = useCallback((id) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      const currentIndex = STATUS_CYCLE.indexOf(s.status);
      const nextIndex = (currentIndex - 1 + STATUS_CYCLE.length) % STATUS_CYCLE.length;
      const nextStatus = STATUS_CYCLE[nextIndex];
      return { ...s, status: nextStatus };
    }));
  }, []);

  const { nodes, edges } = useMemo(() => {
    // 1. Calculate logical states based on dependencies
    const subjectsWithState = subjects.map(s => {
      // Priority 1: User set status
      if (s.status === "Aprobada") return { ...s, state: "aprobada", missingPrerequisites: [] };
      if (s.status === "Regulada") return { ...s, state: "regulada", missingPrerequisites: [] };
      if (s.status === "Cursando") return { ...s, state: "cursando", missingPrerequisites: [] };

      // Priority 2: Calculate dependency-based state
      const missingPrerequisites = s.prerequisites.filter(p => {
        const type = p.startsWith('r') ? 'regulada' : 'aprobada';
        const prereqId = p.substring(1);
        const preSubj = subjects.find(sq => sq.id === prereqId);
        if (!preSubj) return false;
        if (type === 'regulada') {
          return !(preSubj.status === "Regulada" || preSubj.status === "Aprobada");
        }
        return !(preSubj.status === "Aprobada");
      }).map(p => {
        const type = p.startsWith('r') ? 'Regular' : 'Aprobar';
        const prereqId = p.substring(1);
        const preSubj = subjects.find(sq => sq.id === prereqId);
        return {
          label: preSubj.label,
          type: type
        };
      });

      const allMet = missingPrerequisites.length === 0;

      const someProgress = s.prerequisites.every(p => {
        const prereqId = p.substring(1);
        const preSubj = subjects.find(sq => sq.id === prereqId);
        if (!preSubj) return true;
        return preSubj.status === "Cursando" || preSubj.status === "Regulada" || preSubj.status === "Aprobada";
      });

      return {
        ...s,
        state: allMet ? "disponible" : (someProgress ? "potencial" : "bloqueada"),
        missingPrerequisites
      };
    });

    // 2. Transform to Flow format
    const { initialNodes, initialEdges } = transformToFlowData(subjectsWithState);

    // 3. Add context menu handler to node data
    const nodesWithHandlers = initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onContextMenu: (e) => {
          e.preventDefault();
          toggleSubjectBackwards(node.id);
        }
      }
    }));

    // 4. Layout nodes
    const layoutedNodes = layoutNodes(nodesWithHandlers, initialEdges, config);

    // 5. Style edges: Only color edges from "Cursando" subjects
    const styledEdges = initialEdges.map(edge => {
      const source = subjectsWithState.find(s => s.id === edge.source);
      const isCursando = source?.status === "Cursando";

      const stroke = isCursando ? (edge.data?.color || "#9ca3af") : "#cbd5e1";

      let strokeWidth = 1;
      let opacity = 0.4;

      if (source?.status === "Aprobada" || source?.status === "Regulada") {
        strokeWidth = 2;
        opacity = 0.8;
      } else if (isCursando) {
        strokeWidth = 3;
        opacity = 1;
      }

      return {
        ...edge,
        style: {
          stroke,
          strokeWidth,
          opacity
        }
      };
    });

    return { nodes: layoutedNodes, edges: styledEdges };
  }, [subjects, toggleSubjectBackwards, config]);

  return {
    nodes,
    edges,
    toggleSubject
  };
}
