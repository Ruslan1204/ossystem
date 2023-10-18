// import PropTypes from 'prop-types';
import css from '../ContactList/ContactList.module.css';
import { ContactItem } from '../ContactItem/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { contactsDeleteAction } from 'Redux/contacts.slice';


import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export const ContactList = ({ onDelete }) => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts);
  const age = useSelector(state => state.age);


  const handleDeleteContact = id => {
    dispatch(contactsDeleteAction(id));
  };

  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
      contact.age.toLowerCase().includes(age.toLowerCase())
    );
  });

  return (
    <ul className={css.list}>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Age</TableCell>
          <TableCell align="right">Status</TableCell>
        </TableRow>
      </TableHead>

      {filterContacts.map(({ id, name, age }) => {
        const deleteContact = () => {
          handleDeleteContact(id);
        };
        return <ContactItem key={id} id={id} name={name} age={age} onDelete={deleteContact} />;
      })}


    </ul>
  );
};

// ContactList.propTypes = {
//   // contacts: PropTypes.array.isRequired,
//   // onDelete: PropTypes.func.isRequired,
// };
