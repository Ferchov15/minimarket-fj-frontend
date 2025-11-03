"use client";

import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <CategoryBar />

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
                        <tr>
                            <td className="border px-4 py-2">Fernando Vaca</td>
                            <td className="border px-4 py-2">$25.55</td>
                            <td className="border px-4 py-2 flex justify-center gap-3">
                                <FaSearch className="text-black cursor-pointer hover:text-gray-600" />
                                <FaCheck className="text-green-600 cursor-pointer hover:text-green-800" />
                                <FaTimes className="text-red-600 cursor-pointer hover:text-red-800" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Kerly Buitrón</td>
                            <td className="border px-4 py-2">$02.25</td>
                            <td className="border px-4 py-2 flex justify-center gap-3">
                                <FaSearch className="text-black cursor-pointer hover:text-gray-600" />
                                <FaCheck className="text-green-600 cursor-pointer hover:text-green-800" />
                                <FaTimes className="text-red-600 cursor-pointer hover:text-red-800" />
                            </td>
                        </tr>

                        {/* Filas vacías para mantener el diseño */}
                        {Array.from({ length: 6 }).map((_, i) => (
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
