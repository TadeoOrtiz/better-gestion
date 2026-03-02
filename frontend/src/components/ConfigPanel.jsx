import React, { useState } from "react";

export default function ConfigPanel({ onDataReceived }) {
    const [formData, setFormData] = useState({
        nombre: "Alex Drift",
        email: "alex.test@example.com",
        password: "password123",
        sector: "Tecnología",
    });

    // 2. Manejador para actualizar el estado cuando el usuario escribe
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    window.external.receiveMessage((message) => {
        onDataReceived(message);
    });

    // 3. El handleSubmit que estabas buscando
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        const jsonString = JSON.stringify(formData, null, 2);
        window.external.sendMessage(jsonString);
    };

    return (
        <div className="max-w-sm mx-auto">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />

                    <input
                        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                        type="email"
                        name="email"
                        placeholder="email@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />

                    <input
                        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    />

                    <div class="flex items-center mb-4">
                        <input
                            checked
                            id="checkbox-1"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                        />
                        <label
                            for="checkbox-1"
                            class="ms-2 text-sm font-medium text-heading select-none"
                        >
                            I agree to the{" "}
                            <a href="#" class="text-fg-brand hover:underline">
                                terms and conditions
                            </a>
                            .
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-400 focus:ring-2 focus:ring-blue-300 shadow-xs font-medium rounded-xl text-sm px-4 py-2.5 focus:outline-none"
                    >
                        Enviar Datos
                    </button>
                </div>
            </form>
        </div>
    );
}
