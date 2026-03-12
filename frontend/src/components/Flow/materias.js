export const materias = [
    // Primer Año
    { id: "101", label: "Análisis Matemático I", year: 1, prerequisites: [] },
    {
        id: "102",
        label: "Álgebra y Geometría Analítica",
        year: 1,
        prerequisites: [],
    },
    { id: "103", label: "Física I", year: 1, prerequisites: [] },
    { id: "104", label: "Inglés I", year: 1, prerequisites: [] },
    {
        id: "105",
        label: "Lógica y Estructuras Discretas",
        year: 1,
        prerequisites: [],
    },
    {
        id: "106",
        label: "Algoritmos y Estructuras de Datos",
        year: 1,
        prerequisites: [],
    },
    {
        id: "107",
        label: "Arquitectura de Computadoras",
        year: 1,
        prerequisites: [],
    },
    {
        id: "108",
        label: "Sistemas y Procesos de Negocio",
        year: 1,
        prerequisites: [],
    },

    // Segundo Año
    {
        id: "201",
        label: "Análisis Matemático II",
        year: 2,
        prerequisites: ["r101", "r102"],
    },
    { id: "202", label: "Física II", year: 2, prerequisites: ["r101", "r103"] },
    { id: "203", label: "Ingeniería y Sociedad", year: 2, prerequisites: [] },
    { id: "204", label: "Inglés II", year: 2, prerequisites: ["r104"] },
    {
        id: "205",
        label: "Sintaxis y Semántica de los Lenguajes",
        year: 2,
        prerequisites: ["r105", "r106"],
    },
    {
        id: "206",
        label: "Paradigmas de Programación",
        year: 2,
        prerequisites: ["r105", "r106"],
    },
    {
        id: "207",
        label: "Sistemas Operativos",
        year: 2,
        prerequisites: ["r107"],
    },
    {
        id: "208",
        label: "Análisis de Sistemas de Información",
        year: 2,
        prerequisites: ["r106", "r108"],
    },

    // Tercer Año
    {
        id: "301",
        label: "Probabilidad y Estadística",
        year: 3,
        prerequisites: ["r101", "r102"],
    },
    { id: "302", label: "Economía", year: 3, prerequisites: ["a101", "a102"] },
    {
        id: "303",
        label: "Bases de Datos",
        year: 3,
        prerequisites: ["r205", "r208", "a105", "a106"],
    },
    {
        id: "304",
        label: "Desarrollo de Software",
        year: 3,
        prerequisites: ["r206", "r208", "a105", "a106"],
    },
    {
        id: "305",
        label: "Comunicación de Datos",
        year: 3,
        prerequisites: ["r105", "r106"],
    },
    {
        id: "306",
        label: "Análisis Numérico",
        year: 3,
        prerequisites: ["r201", "a101", "a102"],
    },
    {
        id: "307",
        label: "Diseño de Sistemas de Información",
        year: 3,
        prerequisites: ["r206", "r208", "a106", "a108"],
    },
    {
        id: "308",
        label: "Seminario Integrador",
        year: 3,
        prerequisites: ["r208", "a106", "a108", "a205", "a206"],
    },
    // {
    //     id: "333",
    //     label: "Backend de Aplicaciones (Elec.)",
    //     year: 3,
    //     prerequisites: ["r208", "a106", "a108", "a205", "a206"],
    // },

    //Cuarto Año
    {
        id: "401",
        label: "Legislación",
        year: 4,
        prerequisites: ["r203"],
    },
    {
        id: "402",
        label: "Ingeniería y Calidad de Software",
        year: 4,
        prerequisites: ["r303", "r304", "r307", "a205", "a206"],
    },
    {
        id: "403",
        label: "Redes de Datos",
        year: 4,
        prerequisites: ["r207", "r305"],
    },
    {
        id: "404",
        label: "Investigación Operativa",
        year: 4,
        prerequisites: ["r301", "r306"],
    },
    {
        id: "405",
        label: "Simulación",
        year: 4,
        prerequisites: ["r301", "a201"],
    },
    {
        id: "406",
        label: "Tecnologías para la Automatización",
        year: 4,
        prerequisites: ["r202", "r306", "a201"],
    },
    {
        id: "407",
        label: "Administración de Sistemas de Informació",
        year: 4,
        prerequisites: ["r302", "r307", "a208"],
    },

    // Quinto Año

    {
        id: "501",
        label: "Inteligencia Artificial",
        year: 5,
        prerequisites: ["r405", "a301", "a306"],
    },
    {
        id: "502",
        label: "Ciencia de Datos",
        year: 5,
        prerequisites: ["r405", "a301", "a303"],
    },
    {
        id: "503",
        label: "Sistemas de Gestión",
        year: 5,
        prerequisites: ["r302", "r404", "a307"],
    },
    {
        id: "504",
        label: "Gestión Gerencial",
        year: 5,
        prerequisites: ["r401", "r407", "a302"],
    },
    {
        id: "505",
        label: "Seguridad en los Sistemas de Información",
        year: 5,
        prerequisites: ["r403", "r407", "a304", "a305"],
    },
    {
        id: "506",
        label: "Proyecto Final",
        year: 5,
        prerequisites: ["r402", "r403", "r407", "a204", "a304", "a307"],
    },
];
