"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const API_URL = "https://minimarket-jk-backend.onrender.com/api/productos";

export default function EditarProducto() {
    const { id } = useParams();
    const router = useRouter();

    const CATEGORIAS = [
        "Bebidas alcohólica",
        "Bebidas no alcohólica",
        "Snacks",
        "Confitería",
        "Abarrotes",
        "Lácteos",
        "Cárnicos",
        "Cárnicos congelados",
        "Verduras",
        "Productos de aseo",
        "Papelería",
        "Productos de aseo de hogar",
    ];

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        categoria: "",
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
                categoria: data.categoria ?? "",
                imagenActual: data.imagenUrl || "",
            });
        };

        if (id) getProduct();
    }, [id]);

    const handleImage = (file: File | null) => {
        if (!file) return;
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
        formData.append("categoria", form.categoria);

        if (nuevaImagen) {
            formData.append("imagen", nuevaImagen);
        }

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: formData,
        });

        if (res.ok) {
            alert("✅ Producto actualizado correctamente");
            router.push("/admin/productos");
        } else {
            alert("❌ Error al actualizar el producto");
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
                            onChange={(e) =>
                                setForm({ ...form, nombre: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">
                            Precio ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={form.precio}
                            onChange={(e) =>
                                setForm({ ...form, precio: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">
                            Stock
                        </label>
                        <input
                            type="number"
                            value={form.stock}
                            onChange={(e) =>
                                setForm({ ...form, stock: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">
                            Categoría
                        </label>
                        <select
                            value={form.categoria}
                            onChange={(e) =>
                                setForm({ ...form, categoria: e.target.value })
                            }
                            className="w-full p-3 border rounded-lg"
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-lg font-semibold mb-1">
                            Descripción
                        </label>
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
                            Imagen del producto (opcional)
                        </label>

                        <div
                            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                            onDrop={(e) => {
                                e.preventDefault();
                                handleImage(e.dataTransfer.files[0]);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() =>
                                document.getElementById("fileInput")?.click()
                            }
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
                                <p className="text-gray-600">
                                    Arrastra una imagen aquí o haz clic
                                </p>
                            )}

                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) =>
                                    handleImage(e.target.files?.[0] || null)
                                }
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
