import React, { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import DocMain from './components/DocMain';
import Login from './components/login';
import SignIn from './components/SignIn';
import UserProfile from './components/Users'; // Importación corregida
import Form from './components/Form';

const App = () => {
    const [currentPage, setCurrentPage] = useState('home'); // Estado para la página actual

    const renderContent = () => {
        console.log('Página actual:', currentPage); // Verifica el valor de currentPage
        switch (currentPage) {
            case 'home':
                return <MainContent/>
            case 'doc':
                return <DocMain />;
            case 'form':
                return <Form />;
            case 'signin':
                return <SignIn />;
            case 'login':
                return <Login />;
            case 'user':
                return <UserProfile />;
            default:
                return <h1>Página no encontrada</h1>;
        }
    };

    return (
        <div>
            <Header onNavigate={setCurrentPage} />
            <MainContent>{renderContent()}</MainContent>
        </div>
    );
};

export default App;
