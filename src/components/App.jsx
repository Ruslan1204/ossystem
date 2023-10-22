import { Users } from '../Pages/Users';
import { UserEdit } from '../Pages/UserEdit';
import { Layout } from '../components/Layout';
// import css from '../components/App.module.css';

import 'Redux/user.slice';

import { Routes, Route } from 'react-router';

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
