import { create } from "zustand"

export const useCourseStore = create((set) => ({  // Acción para enviar mensajes a .NET/Photino
  sendEvent: (eventName, data) => {
    if (window.external?.sendMessage) {
      // Construimos el objeto con la estructura que pediste
      const message = {
        event: eventName,
        payload: data // Esto puede ser un objeto, string, etc.
      };

      window.external.sendMessage(JSON.stringify(message));
    }
  },
}));