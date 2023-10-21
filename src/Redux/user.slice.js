import { createSlice } from '@reduxjs/toolkit';
import { initState } from './users.init-state';
import { nanoid } from 'nanoid';

export const userSlice = createSlice({
  name: 'users',
  initialState: initState,
  reducers: {
    addUserAction: {
      reducer(state, { payload }) {
        state.users.push(payload);
      },
      prepare(name, age, img, st) {
        return {
          payload: {
            id: nanoid(),
            name,
            age,
            img,
            st,
          },
        };
      },
    },

    editContact: (state, { payload }) => {
      const {id, updatedContact } = payload;
      const existingContact = state.users.find(user => user.id === id);
      if (existingContact) {
        Object.assign(existingContact, updatedContact);
      }
    },

    usersFilterAction(state, { payload }) {
      state.filter = payload;
    },

    usersAgeAction(state, { payload }) {
      state.age = payload;
    },

    userDeleteAction(state, { payload }) {
      state.users = state.users.filter(user => user.id !== payload);
    },
  },
});

export const {
  usersFilterAction,
  usersAgeAction,
  userDeleteAction,
  addUserAction,
  editContact,
  usersEditAction,
} = userSlice.actions;

export const usersReducer = userSlice.reducer;
