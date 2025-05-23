import React, { useEffect, useState } from 'react';
import Login from './Login'; // Importa el componente Login
import MainContent from './MainContent'; // Importa el componente MainContent

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState('img/user_default.png');
    const [customImageUrl, setCustomImageUrl] = useState('');
    const [isImageSelectorVisible, setIsImageSelectorVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para manejar si el usuario está logueado

    useEffect(() => {
        const usuarioLocal = localStorage.getItem('usuario');
        if (usuarioLocal) {
            setUsername(usuarioLocal);
        } else {
            setIsLoggedIn(false); // Si no hay usuario, cambia el estado para mostrar Login
        }

        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const handleProfileImageClick = () => {
        setIsImageSelectorVisible(!isImageSelectorVisible);
    };

    const handleImageSelect = (newSrc) => {
        setProfileImage(newSrc);
        localStorage.setItem('profileImage', newSrc);
        setIsImageSelectorVisible(false);
        window.location.reload();
    };

    const handleCustomImageSave = () => {
        if (customImageUrl.trim()) {
            setProfileImage(customImageUrl);
            localStorage.setItem('profileImage', customImageUrl);
            alert('Imagen personalizada guardada correctamente.');
            setCustomImageUrl('');
            setIsImageSelectorVisible(false);
        } else {
            alert('Por favor, introduce una URL válida.');
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        alert('Todos los datos han sido eliminados.');
        setIsLoggedIn(false); // Cambia el estado para mostrar MainContent
    };

    if (!isLoggedIn) {
        return <Login />; // Renderiza el componente Login si no está logueado
    }

    return (
        <main>
            <div className="login-container">
                <h1>
                    Bienvenid@, <span>{username}</span>!
                </h1>
                <div className="profile-header">
                    <button
                        className="profile-image-button"
                        onClick={handleProfileImageClick}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <img
                            src={profileImage}
                            alt="Imagen de perfil"
                            className="profile-image"
                        />
                    </button>
                    {isImageSelectorVisible && (
                        <div className="image-selector" id="imageSelector">
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_pink.png"
                                alt="User Pink"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_pink.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_green.png"
                                alt="User Green"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_green.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_blue.png"
                                alt="User Blue"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_blue.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_grey.png"
                                alt="User Grey"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_grey.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_orange.png"
                                alt="User Orange"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_orange.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_purple.png"
                                alt="User Purple"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_purple.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_red.png"
                                alt="User Red"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_red.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_white.png"
                                alt="User White"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_white.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_yellow.png"
                                alt="User Yellow"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_yellow.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_beck.png"
                                alt="User Beck"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_beck.png')}
                            />
                            <img
                                src="https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_ellietlou.png"
                                alt="User Ellie"
                                onClick={() => handleImageSelect('https://raw.githubusercontent.com/Jcanaas/JoJo-Flix/refs/heads/main/img/user_ellietlou.png')}
                            />
                            <div></div>
                            <div className="url-container" style={{ marginTop: '10px' }}>
                                <label htmlFor="customImageUrl">URL:</label>
                                <input
                                    type="text"
                                    id="customImageUrl"
                                    placeholder="Introduce la URL de la imagen"
                                    value={customImageUrl}
                                    onChange={(e) => setCustomImageUrl(e.target.value)}
                                />
                                <button id="saveCustomImage" onClick={handleCustomImageSave}>Guardar</button>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={handleLogout}>Borrar Datos</button>
            </div>
            <div>
                <h3>De momento esta pagina no tiene funcion alguna mas alla de demostrar que se hacer usuarios.</h3>
                <h3>Si tienes alguna propuesta de funcionalidad, puedes enviarme un comentario atraves del Formulario de satisfaccion.</h3>
            </div>
        </main>
    );
};

export default UserProfile;