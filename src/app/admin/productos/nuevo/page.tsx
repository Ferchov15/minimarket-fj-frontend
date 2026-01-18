"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearProductoPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
    });

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //  Cuando arrastren o seleccionen imagen
    const handleImage = (file) => {
        setImagen(file);
        setPreview(URL.createObjectURL(file));
    };

    //Lista de las categorias de los productos
    const CATEGORIAS = [
        "Bebidas alcohólica",
        "Bebidas no alcohólica",
        "Snacks",
        "Confitería",
        "Abarrotes",
        "Lacteos",
        "Cárnicos",
        "Cárnicos congelados",
        "Verduras",
        "Productos de aseo",
        "Papelería",
        "Productos de aseo de hogar"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        Object.keys(form).forEach((key) => {
            data.append(key, form[key]);
        });

        if (imagen) data.append("imagen", imagen);

        const res = await fetch("https://minimarket-jk-backend.onrender.com/api/productos", {
            method: "POST",
            body: data,
        });

        if (res.ok) {
            alert("Producto registrado correctamente");
            router.push("/admin/productos");
        } else {
            alert("Error al crear producto");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10 flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Ingrese el Nuevo Producto
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        name="nombre"
                        placeholder="Nombre"
                        className="border p-3 rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        className="border p-3 rounded-lg"
                        onChange={handleChange}
                    />

                    <input
                        name="precio"
                        type="number"
                        step="0.01"
                        placeholder="Precio"
                        className="border p-3 rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        className="border p-3 rounded-lg"
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="categoria"
                        className="border p-3 rounded-lg"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {CATEGORIAS.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>


                    <div
                        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                        onClick={() => document.getElementById("fileInput").click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) handleImage(file);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                className="w-40 h-40 object-cover mx-auto rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-600">Arrastra una imagen aquí o haz clic</p>
                        )}

                        <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            accept="image/*"
                            onChange={(e) => handleImage(e.target.files[0])}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow"
                    >
                        Crear Producto
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/admin/productos")}
                        className="bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold shadow"
                    >
                        Cancelar
                    </button>

                </form>
            </div>
        </div>
    );
}
