import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      state.contacts = state.contacts.map(contact =>
        contact.id === action.payload.id ? action.payload : contact
      );
    }
  },
});

export const { addContact, deleteContact, updateContact } = contactSlice.actions;
export const selectContacts = (state: RootState) => state.contacts;

export default contactSlice.reducer;
