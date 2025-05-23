import React, { useState } from 'react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formData.password !== formData.confirmPassword) {
            setAlertMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            setIsSubmitting(false);
            return;
        }

        const data = {
            accion: 'signin',
            usuario: formData.username,
            correo: formData.email,
            contrasena: formData.password,
        };

        const scriptURL =
            'https://script.google.com/macros/s/AKfycbwvIGoqILZbwGRAg8gDopu02BXnT2xFj1ujWU4imDIGF3n5G7SxySgMk7aDkS5iJmmLMw/exec';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                setAlertMessage({ type: 'success', text: result.message });

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                setAlertMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setAlertMessage({ type: 'error', text: 'Hubo un error al registrarse. Por favor, inténtalo nuevamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        setAlertMessage(null);
    };

    const isFormValid =
        formData.username.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        formData.confirmPassword.trim() !== '';

    return (
        <div className="login-container">
            <h1>Registro</h1>
            <div className="form-container">
                <form id="formulario-signin" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Nombre de usuario"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar contraseña:</label>
                        <input
                            id="confirm-password"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={!isFormValid || isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Registrarse'}
                        </button>
                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </form>

                {isSubmitting && (
                    <div id="spinner" className="flex">
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                    </div>
                )}

                {alertMessage && (
                    <p
                        className={`${
                            alertMessage.type === 'success' ? 'bg-green-500' : 'bg-red-600'
                        } text-white p-2 text-center rounded-lg mt-10 font-bold text-sm uppercase`}
                    >
                        {alertMessage.text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default SignIn;