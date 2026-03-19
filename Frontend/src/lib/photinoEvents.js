// photino-events.js
const listeners = new Map();

// Configuramos el receptor único de Photino
window.external.receiveMessage((jsonString) => {
    try {
        const { eventName, payload } = JSON.parse(jsonString);
        if (listeners.has(eventName)) {
            listeners.get(eventName).forEach(callback => callback(payload));
        }
    } catch (e) {
        console.error("Error procesando mensaje de Photino:", e);
    }
});

/**
 * Suscribe una función a un evento específico del backend.
 * @param {string} eventName - El nombre del evento enviado desde C#.
 * @param {Function} callback - La función que recibirá el payload.
 * @returns {Function} Función para desuscribirse.
 */
export const onBackendEvent = (eventName, callback) => {
    if (!listeners.has(eventName)) {
        listeners.set(eventName, new Set());
    }
    listeners.get(eventName).add(callback);

    // Retornamos el unmount automático
    return () => {
        listeners.get(eventName).delete(callback);
    };
};

/**
 * Envía un mensaje estructurado al backend de C#.
 * @param {string} eventName - El nombre de la acción o comando.
 * @param {any} data - Los datos asociados al comando.
 */
export const sendToBackend = (eventName, data = {}) => {
    const message = JSON.stringify({
        eventName: eventName,
        payload: data
    });
    
    try {
        window.external.sendMessage(message);
    } catch (e) {
        console.error("No se pudo enviar el mensaje al backend. ¿Está Photino listo?", e);
    }
};