import { create } from "zustand"
import { onBackendEvent, sendToBackend } from "../lib/photinoEvents";

export const useCourseStore = create((set) => ({  // Acción para enviar mensajes a .NET/Photino
    courses: null,
    setCourses: (courses) => set({ courses: courses}),
    addCourse: () => sendToBackend('ADD_COURSE', { }),
}));

onBackendEvent('COURSE_CREATED', (payload) => {
    useCourseStore.getState().setCourses(payload.tota)
})

export const useStore = create((set, get) => ({
    count: 1,
    // Enviar algo al backend
    incrementInDb: () => sendToBackend('INCREMENT_COUNT', { amount: get().count }),
}));

// Escuchar un evento específico del backend
onBackendEvent('COUNT_UPDATED', (payload) => {
    useStore.setState({ count: payload.newCount });
});