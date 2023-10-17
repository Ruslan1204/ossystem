// import PropTypes from 'prop-types';

// import css from './ContactItem.module.css';

import * as React from 'react';

import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';


export const ContactItem = ({ name, age, onDelete }) => {
  return (
    <>
        <TableRow key={name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {}
          </TableCell>
          <TableCell align="right">{name}</TableCell>
          <TableCell align="right">{age}</TableCell>
          <TableCell align="right">{}</TableCell>
          <TableCell align="right">
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </TableCell>
        </TableRow>
      {/* <li className={css.item}>
        <p>{name}</p>
        <p>{age}</p>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </li> */}
    </>
  );
};

// ContactItem.ropTypes = {
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   onDelete: PropTypes.func,
// };
