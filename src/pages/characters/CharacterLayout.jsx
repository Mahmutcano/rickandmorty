import { Routes, Route } from 'react-router-dom';

import { CharacterDetail, CharactersList } from './';

export { CharacterLayout };

function CharacterLayout() {
    return (
        <div className="p-4 mt-5">
            <div className="container">
                <Routes>
                    <Route index element={<CharactersList />} />
                    <Route path="characters/:id" element={<CharacterDetail />} />
                </Routes>
            </div>
        </div>
    );
}