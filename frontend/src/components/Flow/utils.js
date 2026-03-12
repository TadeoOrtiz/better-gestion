import dagre from "dagre";

const nodeWidth = 200;
const nodeHeight = 80;

const COLORS = [
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#6366f1", // Indigo
  "#14b8a6", // Teal
];

const getColor = (id) => COLORS[parseInt(id) % COLORS.length];

export function transformToFlowData(subjects) {
  const initialNodes = subjects.map((s) => ({
    id: s.id,
    type: "materia",
    data: {
      label: s.label,
      state: s.state,
      year: s.year,
      color: getColor(s.id),
      missingPrerequisites: s.missingPrerequisites || []
    },
    position: { x: 0, y: 0 }, // Position will be set by layoutNodes
  }));

  const initialEdges = [];
  const sourceHandleCount = {}; // Track how many edges leave from each node
  const targetHandleCount = {}; // Track how many edges enter each node

  subjects.forEach((s) => {
    s.prerequisites.forEach((p) => {
      const prereqId = p.substring(1);

      // Initialize counts if they don't exist
      sourceHandleCount[prereqId] = (sourceHandleCount[prereqId] || 0) + 1;
      targetHandleCount[s.id] = (targetHandleCount[s.id] || 0) + 1;

      // Assign handles (1, 2, or 3)
      const sourceHandleIdx = ((sourceHandleCount[prereqId] - 1) % 3) + 1;
      const targetHandleIdx = ((targetHandleCount[s.id] - 1) % 3) + 1;

      initialEdges.push({
        id: `e${prereqId}-${s.id}`,
        source: prereqId,
        target: s.id,
        sourceHandle: `s-${sourceHandleIdx}`,
        targetHandle: `t-${targetHandleIdx}`,
        animated: s.state === "disponible",
        data: { color: getColor(prereqId) }
      });
    });
  });

  return { initialNodes, initialEdges };
}

export function layoutNodes(nodes, edges, config = { xSpacing: 380, ySpacing: 260 }) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 100 });
  g.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = config.nodeWidth || 220;

  nodes.forEach((node) => {
    // The actual node width in MateriaNode.jsx is 220px
    // We increase height if it has prerequisites
    const height = (node.data.missingPrerequisites?.length || 0) > 0 ? 120 : 80;
    g.setNode(node.id, { width: nodeWidth, height });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  // Constants for final placement from config
  const ySpacing = config.ySpacing || 260;   // Vertical space between year rows
  const xSpacing = config.xSpacing || 380;   // Guaranteed horizontal space between node centers

  // 1. Group nodes by academic year
  const nodesByYear = {};
  nodes.forEach(node => {
    const year = node.data.year || 1;
    if (!nodesByYear[year]) nodesByYear[year] = [];
    nodesByYear[year].push(node);
  });

  // 2. Map nodes to their final positions
  const finalNodes = [];
  Object.keys(nodesByYear).sort().forEach(yearStr => {
    const year = parseInt(yearStr);
    const yearNodes = nodesByYear[year];

    // 3. Sort nodes of this year by Dagre's X to keep the smart order (minimizing crossings)
    yearNodes.sort((a, b) => g.node(a.id).x - g.node(b.id).x);

    // 4. Calculate total width of this row for centering
    const totalWidth = yearNodes.length * xSpacing;
    const startX = -totalWidth / 2 + xSpacing / 2;

    // 5. Place each node side-by-side with guaranteed spacing
    yearNodes.forEach((node, index) => {
      finalNodes.push({
        ...node,
        position: {
          x: startX + (index * xSpacing) - (nodeWidth / 2),
          y: (year - 1) * ySpacing,
        },
      });
    });
  });

  return finalNodes;
}
