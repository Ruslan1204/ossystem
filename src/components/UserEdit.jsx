// ContactEdit.js
import React, { useState } from 'react';
import { editContact } from '../Redux/user.slice';
import { useDispatch, useSelector } from 'react-redux';

import { userValue } from '../components/functionValue';
import { useNavigate } from 'react-router-dom';

export const UserEdit = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [editedContact, setEditedContact] = useState(users);

  const navigate = useNavigate();

  // const id = users
  //   .map(user => {
  //     return user.id;
  //   })
  //   .join(' ');



  const handleEdit = (id) => {
    const bytId = users
      .map(user => {
        return user.id;
      })
      .join(' ')
      .includes(id);

    if (bytId) {
      dispatch(editContact({ id: id, updatedContact: editedContact }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setEditedContact({ ...editedContact, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    handleEdit();
    navigate('/');

    setEditedContact([]);

    // navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={editedContact.name} onChange={handleChange} />
        <input type="text" name="age" value={editedContact.age} onChange={handleChange} />
        <button to="/" type="submit">
          Зберегти зміни
        </button>
      </form>
    </div>
  );
};
