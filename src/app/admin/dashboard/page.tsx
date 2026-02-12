"use client";

import Link from "next/link";
import LogoutButton from "../../components/LogoutButton";

export default function DashboardPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-between py-8 sm:py-12 bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage: "url('/imagenes/fondoadmin.jpg')",
      }}
    >
      <div className="text-center mt-10 sm:mt-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black drop-shadow-[0_5px_7px_rgba(0,0,0,0.45)] leading-tight px-2">
          Panel de Administrador
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 text-black drop-shadow-[0_4px_5px_rgba(0,0,0,0.45)] px-4">
          Bienvenido al Panel Administrativo del Mini Market F.J
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-10 sm:mt-14 px-4">
        <div className="flex flex-col gap-4 sm:hidden">
          <Link
            href="/admin/usuarios"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-6 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-blue-800 active:border-b-2 active:translate-y-0.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">👥</span>
              <span>Administración Usuarios</span>
            </div>
            <span className="text-2xl">→</span>
          </Link>

          <Link
            href="/admin/productos"
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-6 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-green-800 active:border-b-2 active:translate-y-0.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📦</span>
              <span>Administración Productos</span>
            </div>
            <span className="text-2xl">→</span>
          </Link>

          <Link
            href="/admin/pedidos"
            className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white py-6 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-yellow-700 active:border-b-2 active:translate-y-0.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">📋</span>
              <span>Administración Pedidos</span>
            </div>
            <span className="text-2xl">→</span>
          </Link>
        </div>

        <div className="hidden sm:grid md:hidden grid-cols-2 gap-6">
          <Link
            href="/admin/usuarios"
            className="bg-blue-600 hover:bg-blue-700 text-white py-8 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-blue-800 hover:scale-105 flex flex-col items-center gap-3 text-center"
          >
            <span className="text-4xl">👥</span>
            <span>Administración Usuarios</span>
          </Link>

          <Link
            href="/admin/productos"
            className="bg-green-600 hover:bg-green-700 text-white py-8 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-green-800 hover:scale-105 flex flex-col items-center gap-3 text-center"
          >
            <span className="text-4xl">📦</span>
            <span>Administración Productos</span>
          </Link>

          <Link
            href="/admin/pedidos"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-8 px-6 rounded-2xl text-xl font-bold transition-all shadow-xl border-b-4 border-yellow-700 hover:scale-105 flex flex-col items-center gap-3 text-center col-span-2 max-w-md mx-auto w-full"
          >
            <span className="text-4xl">📋</span>
            <span>Administración Pedidos</span>
          </Link>
        </div>

        <div className="hidden md:flex justify-center gap-6 lg:gap-10 flex-wrap">
          <Link
            href="/admin/usuarios"
            className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 lg:px-10 rounded-xl text-xl lg:text-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105 border-b-4 border-blue-800"
          >
            👥 Administración Usuarios
          </Link>

          <Link
            href="/admin/productos"
            className="bg-green-600 hover:bg-green-700 text-white py-5 px-8 lg:px-10 rounded-xl text-xl lg:text-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105 border-b-4 border-green-800"
          >
            📦 Administración Productos
          </Link>

          <Link
            href="/admin/pedidos"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-5 px-8 lg:px-10 rounded-xl text-xl lg:text-2xl font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105 border-b-4 border-yellow-700"
          >
            📋 Administración Pedidos
          </Link>
        </div>
      </div>

      <div className="flex justify-center mb-8 sm:mb-12 mt-8">
        <LogoutButton />
      </div>
    </div>
  );
}