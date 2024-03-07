import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from './helpers';
import { Navbar, Alert, PrivateRoute } from './components';
import { Home } from './pages/home';
import { AccountLayout } from './pages/account';
import { UsersLayout } from './pages/users';
import { CharacterLayout } from './pages/characters';

export { App };

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();

    return (
        <div className="app-container h-100">
            <Navbar />
            <Alert />
            <div className="container pt-4 pb-4">
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="users/*" element={<UsersLayout />} />
                        <Route path="characters/*" element={<CharacterLayout />} />
                    </Route>
                    <Route path="account/*" element={<AccountLayout />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}