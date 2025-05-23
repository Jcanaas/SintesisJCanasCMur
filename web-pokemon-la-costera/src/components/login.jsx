import React, { useState } from 'react';

const Login = () => {
    const [loginData, setLoginData] = useState({ usuario: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            accion: 'login',
            usuario: loginData.usuario,
            contrasena: loginData.password,
            foto: '',
            ip: '',
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
            console.log('Respuesta completa del servidor:', result); // Agregado para mostrar la respuesta del servidor

            if (result.success) {
                localStorage.setItem('usuario', loginData.usuario);
                localStorage.setItem('password', loginData.password);
                localStorage.setItem('profileImage', result.fotodeperfil);
                setAlertMessage({ type: 'success', text: result.message });

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setAlertMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setAlertMessage({ type: 'error', text: 'Hubo un error al iniciar sesión. Por favor, inténtalo nuevamente.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setLoginData({ usuario: '', password: '' });
        setAlertMessage(null);
    };

    const isFormValid = loginData.usuario.trim() !== '' && loginData.password.trim() !== '';

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <div className="form-container">
                <form id="formulario" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario:</label>
                        <input
                            id="usuario"
                            type="text"
                            name="usuario"
                            placeholder="Nombre de usuario"
                            value={loginData.usuario}
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
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-buttons">
                        <button type="submit" disabled={!isFormValid || isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
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

export default Login;