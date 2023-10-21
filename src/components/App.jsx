import { UserForm } from '../components/UserForm/UserForm';
import { UserList } from '../components/UserList/UserList';


import { Filter } from '../components/Filter/Filter';
import css from '../components/App.module.css';

import 'Redux/user.slice';

import { Routes, Route } from 'react-router';

export const App = () => {
  return (
    <div className={css.container}>
      <h1>SPA application</h1>

      <Routes>
        {/* <Route path="/" element={<Filter />} /> */}
        <Route path="/" element={<UserList />} />
        <Route path="/:id/edit" element={<UserForm />} />
      </Routes>
    </div>
  );
};
