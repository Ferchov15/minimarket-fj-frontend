"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../../components/AuthGuard";
import LogoutButton from "../../components/LogoutButton";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, []);

  return (
    <AuthGuard>
      <div
        className="min-h-screen flex flex-col justify-between py-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/imagenes/fondoadmin.jpg')",
        }}
      >
        {/* --- Bienvenida --- */}
        <div className="text-center mt-16">
          <h1 className="text-5xl font-extrabold text-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">
            Panel de Administrador
          </h1>

          <p className="text-2xl mt-4 text-black drop-shadow-[0_3px_4px_rgba(0,0,0,0.4)]">
            Bienvenido al Panel Administrativo del Mini Market F.J
          </p>
        </div>


        {/* --- Botones en fila --- */}
        <div className="flex justify-center gap-6 mt-10">
          <Link
            href="/admin/usuarios"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Administración Usuarios
          </Link>

          <Link
            href="/admin/productos"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Administración Productos
          </Link>

          <Link
            href="/admin/pedidos"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition shadow-lg"
          >
            Administración Pedidos
          </Link>
        </div>

        {/* --- Logout abajo --- */}
        <div className="flex justify-center mb-10">
          <LogoutButton />
        </div>
      </div>
    </AuthGuard>
  );
}
