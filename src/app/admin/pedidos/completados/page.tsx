"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default function PedidosCompletados() {
    const [pedidos, setPedidos] = useState([]);

    const fetchPedidos = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/pedidos");
            if (!res.ok) throw new Error("Error al obtener pedidos");

            const data = await res.json();
            const filtrados = data.filter((p: any) => p.estado === "Completado");
            setPedidos(filtrados);
        } catch (error) {
            console.error("ERROR:", error);
        }
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-200 text-black p-6">
            <main className="flex flex-col items-center">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    ✅ Pedidos completados
                </h1>

                {pedidos.length === 0 ? (
                    <p className="text-xl text-gray-600 bg-white p-6 rounded-lg shadow">
                        No hay pedidos finalizados.
                    </p>
                ) : (
                    <table className="border border-black bg-green-500 text-center w-full md:w-3/4 rounded-lg overflow-hidden shadow">
                        <thead>
                            <tr className="bg-green-600 text-white">
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

                                    <td className="border px-4 py-3 flex justify-center">
                                        <Link href={`/admin/pedidos/${pedido.id}`}>
                                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-700 shadow">
                                                <FaSearch size={20} /> Ver
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Botón volver */}
                <Link
                    href="/admin/pedidos"
                    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow text-center"
                >
                    Volver
                </Link>
            </main>
        </div>
    );
}
