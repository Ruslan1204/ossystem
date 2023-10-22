import { Routes, Route } from 'react-router';

import { Layout } from '../components/Layout';

import { lazy } from 'react';

const Users = lazy(() => import('Pages/Users'));
const UserEdit = lazy(() => import('Pages/UserEdit'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="/:id" element={<UserEdit />} />
      </Route>
    </Routes>
  );
};
