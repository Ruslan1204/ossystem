import { createSlice } from '@reduxjs/toolkit';
import { initState } from './contacts.init-state';
import { nanoid } from 'nanoid';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initState,
  reducers: {
    addContactsAction: {
      reducer(state, { payload }) {
        state.contacts.push(payload);
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

    contactsFilterAction(state, { payload }) {
      state.filter = payload;
    },

    contactsAgeAction(state, { payload }) {
      state.age = payload;
    },

    contactsDeleteAction(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
  },
});

export const { contactsFilterAction, contactsAgeAction, contactsDeleteAction, addContactsAction } =
  contactSlice.actions;

export const contactsReducer = contactSlice.reducer;
