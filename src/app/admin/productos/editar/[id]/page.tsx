"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API_URL = "http://localhost:4000/api/productos";

export default function EditarProducto() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        descuento: "",
        imagenActual: "",
    });

    const [nuevaImagen, setNuevaImagen] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const getProduct = async () => {
            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();

            setForm({
                nombre: data.nombre,
                precio: data.precio,
                descripcion: data.descripcion ?? "",
                stock: data.stock,
                descuento: data.descuento ?? 0,
                imagenActual: data.imagenUrl || "",
            });
        };

        getProduct();
    }, [id]);

    const handleImage = (file: File) => {
        setNuevaImagen(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("precio", form.precio);
        formData.append("descripcion", form.descripcion);
        formData.append("stock", form.stock);
        formData.append("descuento", form.descuento); // ← NUEVO

        if (nuevaImagen) formData.append("imagen", nuevaImagen);

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            alert("Producto actualizado correctamente");
            router.push("/admin/productos");
        } else {
            alert("Error al actualizar el producto");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-200 p-6 flex justify-center">
            <div className="w-full max-w-2xl bg-white/95 rounded-xl shadow-md p-10">

                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    ✏️ Editar Producto
                </h1>

                <form onSubmit={handleSubmit} className="space-y-7">

                    {/* Nombre */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">Nombre</label>
                        <input
                            type="text"
                            value={form.nombre}
                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">Precio ($)</label>
                        <input
                            type="number"
                            value={form.precio}
                            onChange={(e) => setForm({ ...form, precio: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">Stock</label>
                        <input
                            type="number"
                            value={form.stock}
                            onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    {/* Descuento */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">Descuento (%)</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={form.descuento}
                            onChange={(e) =>
                                setForm({ ...form, descuento: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">Descripción</label>
                        <textarea
                            value={form.descripcion}
                            onChange={(e) =>
                                setForm({ ...form, descripcion: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg h-32"
                        />
                    </div>

                    {/* Imagen */}
                    <div>
                        <label className="block text-lg font-semibold mb-3">
                            Imagen del producto (si no desea cambiar, ignore este campo)
                        </label>

                        <div
                            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file) handleImage(file);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    className="w-40 h-40 object-cover mx-auto rounded-lg shadow"
                                />
                            ) : form.imagenActual ? (
                                <img
                                    src={form.imagenActual}
                                    className="w-40 h-40 object-cover mx-auto rounded-lg shadow"
                                />
                            ) : (
                                <p className="text-gray-600">Arrastra una imagen aquí o haz clic</p>
                            )}

                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImage(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow"
                        >
                            Guardar Cambios
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/admin/productos")}
                            className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
