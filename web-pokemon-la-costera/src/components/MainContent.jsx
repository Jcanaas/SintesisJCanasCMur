import React, { useState } from 'react';

const MainContent = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        description: '',
        image: '',
        video: ''
    });

    const showModal = (title, description, image) => {
        setModalContent({ title, description, image, video: '' });
        setIsModalOpen(true);
    };

    const showVideoModal = () => {
        setModalContent({
            title: '',
            description: '',
            image: '',
            video: '/img/Antoniolobato.mp4'
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main>
            {children || (
                <>
                    {/* Hero Section */}
                    <section className="hero">
                        <div className="hero-content">
                            <h1>¡Una nueva región, una antigua amenaza y artículos veraniegos muy caros!</h1>
                            <p>Explora La Costera y enfréntate al despertar de Sierpentez.</p>
                            <button
                                className="download-button"
                                onClick={showVideoModal}
                            >
                                Ver Tráiler Demo
                            </button>
                        </div>
                    </section>

                    {/* Galería de Mapas */}
                    <section className="galeria">
                        <h2>Explora La Costera</h2>
                        <div className="gallery grid">
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Bahía de Marezuela',
                                        'Ciudad portuaria con gimnasio Agua y pescados frescos.',
                                        'img/mapa_bahia.png'
                                    )
                                }
                            >
                                <img src="img/mapa_bahia.png" alt="Bahía de Marezuela" />
                                <p>Bahía de Marezuela</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Islas del Fuego',
                                        'Archipiélago volcánico con Pokémon únicos de Fuego.',
                                        'img/mapa_islas.png'
                                    )
                                }
                            >
                                <img src="img/mapa_islas.png" alt="Islas del Fuego" />
                                <p>Islas del Fuego</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Dunas del Levante',
                                        'Desierto costero con Pokémon tipo Roca y Viento.',
                                        'img/mapa_dunas.png'
                                    )
                                }
                            >
                                <img src="img/mapa_dunas.png" alt="Dunas del Levante" />
                                <p>Dunas del Levante</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Cueva del Levante',
                                        'Hogar de Sierpentez y epicentro del caos.',
                                        'img/mapa_cueva.png'
                                    )
                                }
                            >
                                <img src="img/mapa_cueva.png" alt="Cueva del Levante" />
                                <p>Cueva del Levante</p>
                            </div>
                        </div>
                    </section>

                    {/* Galería de Pokémon */}
                    <section className="galeria">
                        <h2>Pokémon Exclusivos</h2>
                        <div className="gallery grid">
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Sierpentez',
                                        'Legendario envuelto en algas (Dragón/Fuego).',
                                        'img/sierpentez.png'
                                    )
                                }
                            >
                                <img src="img/sierpentez.png" alt="Sierpentez" />
                                <p>Sierpentez</p>
                            </div>
                        </div>
                        <div className="gallery grid">
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Sierpentez',
                                        'Legendario envuelto en algas (Dragón/Fuego).',
                                        'img/sierpentez.png'
                                    )
                                }
                            >
                                <img src="img/Froakie.png" alt="Sierpentez" />
                                <p>Froakie</p>
                            </div>
                        </div>
                    </section>

                    {/* Galería de Personajes */}
                    <section className="galeria">
                        <h2>Personajes</h2>
                        <div className="gallery grid">
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'El/La Protagonista',
                                        'Vive con su abuela en un pueblo costero. Su inicial dependerá de tu elección.',
                                        'img/protagonista.png'
                                    )
                                }
                            >
                                <img src="img/protagonista.png" alt="Protagonista" />
                                <p>Protagonista</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Andrés "El Fisco"',
                                        'Villano con yate y abanicos de oro. Líder del Team Almendrao.',
                                        'img/Andres.png'
                                    )
                                }
                            >
                                <img src="img/Andres.png" alt="Andrés" />
                                <p>Andrés Guerra</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Profesor Emilio',
                                        'Investigador de Pokémon.',
                                        'img/profesor_emilio.png'
                                    )
                                }
                            >
                                <img src="img/profesor_emilio.png" alt="Profesor Emilio" />
                                <p>Profesor Emilio</p>
                            </div>
                        </div>
                        <div className="gallery grid">
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Antonio Lobato',
                                        'Vive con su abuela en un pueblo costero. Su inicial dependerá de tu elección.',
                                        'img/antoniolobato.png'
                                    )
                                }
                            >
                                <img src="img/antoniolobato.png" alt="Antonio Lobato" />
                                <p>Antonio Lobato</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'J.Cañas',
                                        'Creador del juego i lider de gimnasio tipo Elétrico.',
                                        'img/JCañas.png'
                                    )
                                }
                            >
                                <img src="img/JCañas.png" alt="J.Cañas" />
                                <p>J.Cañas</p>
                            </div>
                            <div
                                className="gallery-item"
                                onClick={() =>
                                    showModal(
                                        'Torrente',
                                        'Ex-detective que entrena Pokémon tipo Lucha y Normal. Su ataque especial es "Puño Justiciero".',
                                        'img/torrente.png'
                                    )
                                }
                            >
                                <img src="img/torrente.png" alt="Torrente" />
                                <p>Torrente</p>
                            </div>
                        </div>
                    </section>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="modal-overlay" onClick={closeModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                {modalContent.video && (
                                    <video
                                        className="modal-bg-video"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    >
                                        <source src={modalContent.video} type="video/mp4" />
                                    </video>
                                )}
                                <h2>{modalContent.title}</h2>
                                <p>{modalContent.description}</p>
                                {!modalContent.video && modalContent.image && (
                                    <img src={modalContent.image} alt={modalContent.title} />
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default MainContent;