"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearUsuarioPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://minimarket-jk-backend.onrender.com/api/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al registrar usuario");

      alert("Usuario registrado correctamente");
      router.push("/admin/usuarios");
    } catch (error) {
      console.error(error);
      alert("Error al registrar el usuario");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">

      <div className="bg-white w-full max-w-xl shadow-2xl p-10 rounded-2xl border">

        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Crear Nuevo Usuario Administrativo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              required
              value={form.correo}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              required
              value={form.contraseña}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón Crear */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-lg"
          >
            Crear Usuario
          </button>

        </form>

        {/* Botón regresar */}
        <button
          onClick={() => router.push("/admin/usuarios")}
          className="w-full mt-5 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 shadow"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
