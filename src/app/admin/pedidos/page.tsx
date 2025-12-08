"use client";

import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);

    // Obtener pedidos con estado "En proceso"
    const fetchPedidos = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/pedidos");
            if (!res.ok) throw new Error("No se pudo obtener los pedidos");
            const data = await res.json();

            // Filtrar solo pedidos en proceso
            const filtrados = data.filter((p: any) => p.estado === "En proceso");
            setPedidos(filtrados);
        } catch (error) {
            console.error("ERROR:", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    // Cambiar estado del pedido
    const actualizarEstado = async (id: string, nuevoEstado: string) => {
        try {
            const res = await fetch(`http://localhost:4000/api/pedidos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ estado: nuevoEstado }),
            });

            if (!res.ok) throw new Error("No se pudo actualizar el pedido");

            // Recargar pedidos actualizados
            fetchPedidos();
        } catch (error) {
            console.error("ERROR:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 text-black p-6">
            <main className="flex flex-col items-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    📦 Pedidos en proceso
                </h1>

                {/* Si no hay pedidos */}
                {pedidos.length === 0 ? (
                    <p className="text-xl text-gray-600 bg-white p-6 rounded-lg shadow">
                        No hay pedidos en proceso.
                    </p>
                ) : (
                    <table className="border border-black bg-amber-500 text-center w-full md:w-3/4 rounded-lg overflow-hidden shadow">
                        <thead>
                            <tr className="bg-amber-600 text-white">
                                <th className="border px-4 py-3 text-lg">Cliente</th>
                                <th className="border px-4 py-3 text-lg">Total</th>
                                <th className="border px-4 py-3 text-lg">Opciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map((pedido: any) => (
                                <tr key={pedido.id} className="bg-white text-black">
                                    <td className="border px-4 py-3">{pedido.nombreCliente}</td>
                                    <td className="border px-4 py-3">${pedido.total}</td>

                                    <td className="border px-4 py-3 flex justify-center gap-6">

                                        <Link href={`/admin/pedidos/${pedido.id}`}>
                                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700 shadow">
                                                <FaSearch size={20} /> Ver
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => actualizarEstado(pedido.id, "Completado")}
                                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-700 shadow"
                                        >
                                            <FaCheck size={22} /> Completado
                                        </button>

                                        <button
                                            onClick={() => actualizarEstado(pedido.id, "Cancelado")}
                                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-red-700 shadow"
                                        >
                                            <FaTimes size={22} /> Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

                {/* Botones finales */}
                <div className="flex flex-col md:flex-row gap-4 mt-8">

                    <Link
                        href="/admin/pedidos/completados"
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow text-center"
                    >
                        Visualizar pedidos Completados
                    </Link>

                    <Link
                        href="/admin/pedidos/cancelados"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md shadow text-center"
                    >
                        Visualizar pedidos cancelados
                    </Link>

                    <Link
                        href="/admin"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow text-center"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </main>
        </div>
    );
}
