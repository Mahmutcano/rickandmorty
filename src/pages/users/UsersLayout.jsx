import { Routes, Route } from 'react-router-dom';

import { List, AddEdit } from './';

export { UsersLayout };

function UsersLayout() {
    return (
        <div className="p-4 mt-5">
            <div className="container">
                <Routes>
                    <Route index element={<List />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}