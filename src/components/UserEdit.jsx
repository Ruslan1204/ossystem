// ContactEdit.js
import React, { useState } from 'react';
import { editContact } from '../Redux/user.slice';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export const UserEdit = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [editedContact, setEditedContact] = useState(users);
  const navigate = useNavigate();
  const { id } = useParams();


  const handleEdit = () => {
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

  const handleEditSubmit = e => {
    e.preventDefault();

    handleEdit();
    navigate('/');

    setEditedContact([]);
  };

  return (
    <div>
      <h2>Edit your user</h2>
      <form onSubmit={handleEditSubmit}>
        <TextField
          onChange={handleChange}
          autocomplete="off"
          fullWidth
          margin="dense"
          id="fullWidth"
          label="Name"
          value={editedContact.name}
          variant="outlined"
          name="name"
          sx={{ mr: 3 }}
        />

        <TextField
          onChange={handleChange}
          autocomplete="off"
          fullWidth
          margin="dense"
          id="fullWidth"
          label="Age"
          value={editedContact.age}
          variant="outlined"
          name="age"
          sx={{ mr: 3 }}
        />
        <Box sx={{ '& > button': { m: 1 } }}>
          <Button variant="contained" color="success" type="submit">
            Save changes
          </Button>
        </Box>
      </form>
    </div>
  );
};
