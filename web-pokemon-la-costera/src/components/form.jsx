import React, { useEffect, useState } from "react";

const Form = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0); // Estado para manejar el hover

    useEffect(() => {
        // Función para manejar la respuesta JSONP
        window.loadData = (data) => {
            console.log("Respuesta JSONP: ", data);

            const mensaje = document.getElementById("mensaje");

            if (data.mensaje) {
                // Respuesta con éxito
                mensaje.textContent = "¡Formulario enviado con éxito!";
                mensaje.classList.remove("text-red-600");
                mensaje.classList.add("text-green-600");
            } else {
                // Error
                mensaje.textContent = "Hubo un error.";
                mensaje.classList.add("text-red-600");
            }

            // Redirigir a la página de agradecimiento después de 2 segundos
            setTimeout(() => {
                window.location.href = "thank_you.html";
            }, 2000);
        };

        // Manejar el envío del formulario
        const formulario = document.getElementById("formulario");

        formulario.addEventListener("submit", (event) => {
            event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

            const nombre = document.getElementById("nomCognoms").value.trim();
            const comentarios = document.getElementById("observacions").value.trim();
            const rating = document.querySelector('input[name="rate"]:checked')?.value;

            console.log("Datos antes de enviar:", { nombre, comentarios, rating });

            // Verificar si los campos obligatorios están completos
            if (!nombre || !rating) {
                const mensaje = document.getElementById("mensaje");
                mensaje.textContent = "Por favor, completa todos los campos obligatorios.";
                mensaje.classList.add("text-red-600");
                return;
            }

            const scriptURL =
                "https://script.google.com/macros/s/AKfycbwvIGoqILZbwGRAg8gDopu02BXnT2xFj1ujWU4imDIGF3n5G7SxySgMk7aDkS5iJmmLMw/exec"; 
            
            const url = `${scriptURL}?callback=loadData&nombre=${encodeURIComponent(
                nombre
            )}&comentarios=${encodeURIComponent(
                comentarios
            )}&rating=${encodeURIComponent(rating)}`;

      
            const script = document.createElement("script");
            script.src = url;
            document.body.appendChild(script);
        });
    }, []);

    const handleRatingChange = (rate) => {
        setSelectedRating(rate);
    };

    const handleRatingHover = (rate) => {
        setHoveredRating(rate);
    };

    const handleRatingHoverOut = () => {
        setHoveredRating(0);
    };

    return (
        <main>
            <section className="waves">
                <div className="air air1"></div>
                <div className="air air2"></div>
                <div className="air air3"></div>
                <div className="air air4"></div>
            </section>

            <div className="login-container">
                <h1 className="text-4xl text-center text-blue-700">Formulario de Satisfacción</h1>
                <div className="form-container bg-white rounded-lg shadow-xl p-10 mt-5">
                    <form id="formulario" className="space-y-5">
                        <div className="form-group">
                            <label htmlFor="nomCognoms">Nombre y Apellidos:</label>
                            <input
                                id="nomCognoms"
                                type="text"
                                name="nombre"
                                placeholder="Nombre y Apellidos"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="observacions">Comentarios (máximo 200 caracteres):</label>
                            <textarea
                                id="observacions"
                                name="comentarios"
                                rows="4"
                                maxLength="200"
                                placeholder="Escribe tus comentarios aquí..."
                            ></textarea>
                        </div>

                        <div className="form-group rating">
                            <label htmlFor="rating">Calificación:</label>
                            <div className="rating-buttons">
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <React.Fragment key={rate}>
                                        <input
                                            type="radio"
                                            id={`rate${rate}`}
                                            name="rate"
                                            value={rate}
                                            checked={selectedRating === rate}
                                            onChange={() => handleRatingChange(rate)}
                                        />
                                        <label
                                            htmlFor={`rate${rate}`}
                                            className={
                                                rate <= (hoveredRating || selectedRating)
                                                    ? "selected"
                                                    : ""
                                            }
                                            onMouseEnter={() => handleRatingHover(rate)}
                                            onMouseLeave={handleRatingHoverOut}
                                            onClick={() => handleRatingChange(rate)}
                                        >
                                            ★
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div id="botones" className="form-buttons">
                            <button type="submit">Enviar</button>
                            <button type="reset" onClick={() => setSelectedRating(0)}>
                                Reset
                            </button>
                        </div>
                    </form>
                    <div id="mensaje" className="mt-5 text-center"></div>
                </div>
            </div>
        </main>
    );
};

export default Form;