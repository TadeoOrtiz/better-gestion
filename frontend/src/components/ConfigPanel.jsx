import React, { useState } from "react";

export default function ConfigPanel({ onDataReceived }) {
    const [formData, setFormData] = useState({
        name: "",
        age: 0,
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
            <h2>Registrar materia</h2>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group gap-5 flex">
                    <input
                        className=" w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                        type="number"
                        name="age"
                        placeholder="email@email.com"
                        value={formData.age}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-400 focus:ring-2 focus:ring-blue-300 shadow-xs font-medium rounded-xl text-sm px-5 focus:outline-none"
                    >
                        Enviar Datos
                    </button>
                </div>
            </form>
        </div>
    );
}
