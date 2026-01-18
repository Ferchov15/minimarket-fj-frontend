"use client";

import Link from "next/link";
import LogoutButton from "../../components/LogoutButton";

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between py-12 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/imagenes/fondoadmin.jpg')",
      }}
    >
      {/* --- Bienvenida --- */}
      <div className="text-center mt-20">
        <h1 className="text-6xl font-extrabold text-black drop-shadow-[0_5px_7px_rgba(0,0,0,0.45)]">
          Panel de Administrador
        </h1>

        <p className="text-3xl mt-6 text-black drop-shadow-[0_4px_5px_rgba(0,0,0,0.45)]">
          Bienvenido al Panel Administrativo del Mini Market F.J
        </p>
      </div>

      {/* --- Botones --- */}
      <div className="flex justify-center gap-10 mt-14 flex-wrap">
        <Link
          href="/admin/usuarios"
          className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-10 rounded-xl text-2xl font-semibold transition shadow-xl"
        >
          Administración Usuarios
        </Link>

        <Link
          href="/admin/productos"
          className="bg-green-600 hover:bg-green-700 text-white py-5 px-10 rounded-xl text-2xl font-semibold transition shadow-xl"
        >
          Administración Productos
        </Link>

        <Link
          href="/admin/pedidos"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-5 px-10 rounded-xl text-2xl font-semibold transition shadow-xl"
        >
          Administración Pedidos
        </Link>
      </div>

      {/* --- Logout --- */}
      <div className="flex justify-center mb-12">
        <LogoutButton />
      </div>
    </div>
  );
}
