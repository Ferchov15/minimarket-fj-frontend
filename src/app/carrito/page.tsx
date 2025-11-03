"use client";

import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import Link from "next/link";

export default function CarritoPage() {
    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />
            <CategoryBar />

            <main className="flex flex-col items-center p-6">
                <h1 className="text-xl font-semibold mb-4">Su carrito de compra:</h1>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    {/* Ícono de carrito */}
                    <div className="text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
                            alt="Carrito"
                            className="w-40 h-40 mx-auto"
                        />
                    </div>

                    {/* Tabla del carrito */}
                    <table className="border border-gray-400 text-center">
                        <thead>
                            <tr className="bg-purple-300">
                                <th className="border px-4 py-2">Productos</th>
                                <th className="border px-4 py-2">Cantidad</th>
                                <th className="border px-4 py-2">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-purple-200">
                                <td className="border px-4 py-2">Papitas</td>
                                <td className="border px-4 py-2">2</td>
                                <td className="border px-4 py-2">$1.30</td>
                            </tr>
                            <tr className="bg-purple-100">
                                <td className="border px-4 py-2">Yogurt</td>
                                <td className="border px-4 py-2">1</td>
                                <td className="border px-4 py-2">$0.75</td>
                            </tr>
                            <tr className="bg-purple-200">
                                <td className="border px-4 py-2">Pan</td>
                                <td className="border px-4 py-2">20</td>
                                <td className="border px-4 py-2">$1.30</td>
                            </tr>
                            <tr className="bg-purple-100">
                                <td className="border px-4 py-2">Helado</td>
                                <td className="border px-4 py-2">2</td>
                                <td className="border px-4 py-2">$2.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Campo de nombre y botones */}
                <div className="mt-6 flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        className="border border-gray-400 rounded-md p-2 w-64"
                    />
                    <div className="flex gap-4 mt-3 md:mt-0">
                        <Link href="/" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                            Seguir comprando
                        </Link>
                        <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-6 py-2 rounded-md">
                            Confirmar
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
