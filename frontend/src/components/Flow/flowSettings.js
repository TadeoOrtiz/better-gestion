export const FLOW_STATES = {
  bloqueada: {
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-700",
    text: "text-gray-400 dark:text-gray-500",
    icon: "🔒",
    label: "Bloqueada",
    description: "No se cumplen las correlativas necesarias.",
  },
  potencial: {
    bg: "bg-orange-50 dark:bg-orange-900",
    border: "border-orange-400",
    text: "text-orange-700 dark:text-orange-300",
    icon: "👀",
    label: "Potencial",
    description: "Correlativas en curso; pronto disponible.",
  },
  disponible: {
    bg: "bg-cyan-50 dark:bg-cyan-900",
    border: "border-cyan-500",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "📖",
    label: "Disponible",
    description: "Lista para inscribirse y cursar.",
  },
  cursando: {
    bg: "bg-purple-50 dark:bg-purple-900",
    border: "border-purple-500",
    text: "text-purple-700 dark:text-purple-300",
    icon: "✍️",
    label: "Cursando",
    description: "Materia en progreso actualmente.",
  },
  regulada: {
    bg: "bg-yellow-50 dark:bg-yellow-900",
    border: "border-yellow-500",
    text: "text-yellow-700 dark:text-yellow-300",
    icon: "📝",
    label: "Regulada",
    description: "Cursada aprobada, examen final pendiente.",
  },
  aprobada: {
    bg: "bg-green-50 dark:bg-green-900",
    border: "border-green-500",
    text: "text-green-700 dark:text-green-300",
    icon: "✅",
    label: "Aprobada",
    description: "Materia finalizada y acreditada.",
  },
};

export const EDGE_STYLES = [
  {
    label: "En curso",
    color: "Color Materia",
    style: "Sólido (3px)",
    description: "Conexión activa desde una materia que estás cursando.",
  },
  {
    label: "Regularizada/Aprobada",
    color: "Color Materia",
    style: "Sólido (2px)",
    description: "Camino ya recorrido.",
  },
  {
    label: "Pendiente",
    color: "Gris (#cbd5e1)",
    style: "Sólido (1px)",
    description: "Conexión hacia una materia bloqueada o no disponible.",
  },
];
