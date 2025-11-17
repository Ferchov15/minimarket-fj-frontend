"use client";

import Navbar from "../../components/Navbar";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/pedidos");
                if (!res.ok) throw new Error("No se pudo obtener los pedidos");
                const data = await res.json();
                setPedidos(data);
            } catch (error) {
                console.error("ERROR:", error);
            }
        };

        fetchPedidos();
    }, []);


    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />


            <main className="p-6 flex flex-col items-center">
                <h1 className="text-lg font-semibold mb-4">Pedidos más recientes:</h1>

                {/* Tabla de pedidos */}
                <table className="border border-black bg-amber-500 text-center w-full md:w-3/4">
                    <thead>
                        <tr className="bg-amber-600 text-white">
                            <th className="border px-4 py-2">Cliente</th>
                            <th className="border px-4 py-2">Total a pagar</th>
                            <th className="border px-4 py-2">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* 🔥 MOSTRAR PEDIDOS DEL BACKEND */}
                        {pedidos.length > 0 ? (
                            pedidos.map((pedido: any, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{pedido.nombreCliente}</td>
                                    <td className="border px-4 py-2">${pedido.total ?? 0}</td>
                                    <td className="border px-4 py-2 flex justify-center gap-3">
                                        <FaSearch className="text-black cursor-pointer hover:text-gray-600" />
                                        <FaCheck className="text-green-600 cursor-pointer hover:text-green-800" />
                                        <FaTimes className="text-red-600 cursor-pointer hover:text-red-800" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="border px-4 py-4">
                                    No hay pedidos registrados.
                                </td>
                            </tr>
                        )}

                        {/* 🔸 Filas vacías para mantener el diseño */}
                        {Array.from({ length: Math.max(0, 8 - pedidos.length) }).map((_, i) => (
                            <tr key={i}>
                                <td className="border px-4 py-5">&nbsp;</td>
                                <td className="border px-4 py-5">&nbsp;</td>
                                <td className="border px-4 py-5">&nbsp;</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Botones de abajo */}
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md">
                        Visualizar pedidos realizados
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md">
                        Visualizar pedidos cancelados
                    </button>
                    <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Volver al inicio
                    </Link>
                </div>
            </main>
        </div>
    );
}
